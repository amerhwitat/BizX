import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ScanController } from './events.mjs';
import { validateProject, redactSecrets } from './model.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../web');
const controller = new ScanController();
const projects = new Map();

function json(res, status, value) { res.writeHead(status, {'content-type':'application/json; charset=utf-8','cache-control':'no-store'}); res.end(JSON.stringify(value)); }
async function body(req) { let s=''; for await (const c of req) { s += c; if (s.length > 2_000_000) throw new Error('request too large'); } return s ? JSON.parse(s) : {}; }

const server=http.createServer(async (req,res)=>{
  try {
    if (req.url === '/api/state' && req.method === 'GET') return json(res,200,{scans:[...controller.sessions.values()].map(s=>redactSecrets(s.snapshot()))});
    if (req.url === '/api/scan/start' && req.method === 'POST') { const input=await body(req); const s=controller.start(); projects.set(s.id,{request:input,session:s}); return json(res,201,{id:s.id,state:s.state}); }
    const m=req.url.match(/^\/api\/scan\/([^/]+)\/(pause|resume|cancel)$/);
    if (m && req.method==='POST') { const s=controller.sessions.get(m[1]); if(!s) return json(res,404,{error:'scan not found'}); s[m[2]](); return json(res,200,s.snapshot()); }
    if (req.url.startsWith('/api/')) return json(res,404,{error:'not found'});
    const requested=req.url==='/'?'index.html':req.url.replace(/^\//,'');
    const file=path.resolve(root,requested); if(!file.startsWith(root+path.sep)) return json(res,400,{error:'invalid path'});
    if(!fs.existsSync(file)) return json(res,404,{error:'not found'});
    const ext=path.extname(file); const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};
    res.writeHead(200,{'content-type':(types[ext]||'text/plain')+'; charset=utf-8'}); fs.createReadStream(file).pipe(res);
  } catch(e) { json(res,400,{error:e.message}); }
});

if (process.argv[1] === fileURLToPath(import.meta.url)) server.listen(process.env.PORT||8787,'127.0.0.1',()=>console.log('InternetScanner GUI http://127.0.0.1:'+ (process.env.PORT||8787)));
export { server };
