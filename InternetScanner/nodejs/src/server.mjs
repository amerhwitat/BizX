import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ScanController } from './events.mjs';
import { validateProject, redactSecrets } from './model.mjs';
import { authorizeTarget } from './policy.mjs';
import { scanPorts } from './probes.mjs';
import { identifyService } from './security.mjs';
import { exportProject, exportCsv, reportMarkdown, importProject } from './io.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../web');
const controller = new ScanController();
const projects = new Map();
const DEFAULT_CONFIG = {authorizedOnly:true, public:{allowlistedTargets:[]}};
function json(res,status,value){res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'});res.end(JSON.stringify(value));}
async function body(req){let s='';for await(const c of req){s+=c;if(s.length>2_000_000)throw new Error('request too large')}return s?JSON.parse(s):{};}
async function executeScan(s,input){
  const cfg={...DEFAULT_CONFIG, public:{...DEFAULT_CONFIG.public,...(input.public??{})}};
  const ports=[...(input.ports??[22,53,80,443])].filter(Number.isInteger).filter(p=>p>=1&&p<=65535).slice(0,256);
  const protocols=[...(input.protocols??['tcp','udp'])].filter(p=>p==='tcp'||p==='udp');
  const targets=[...(input.targets??[])].filter(x=>typeof x==='string').slice(0,1024);
  const project={schema:1,hosts:[],observedAt:new Date().toISOString()};
  for(const ip of targets){
    if(s.state==='cancelled')break;
    while(s.state==='paused'&&s.state!=='cancelled')await new Promise(r=>setTimeout(r,100));
    if(s.state==='cancelled')break;
    const decision=authorizeTarget({ip},cfg);
    const event={type:decision.authorized?'target.authorized':'probe.blocked',ip,reason:decision.reason,at:new Date().toISOString()};
    s.snapshotData.events.push(event); controller.bus.publish(event);
    if(!decision.authorized)continue;
    const host={ip,scope:decision.scope,authorized:true,reachable:true,openPorts:[],observedAt:new Date().toISOString()};
    s.snapshotData.hosts.push(host);
    const findings=await scanPorts({ip},ports,protocols,{config:cfg,concurrency:Math.min(input.concurrency??16,32),ratePerSecond:Math.min(input.ratePerSecond??10,25),timeoutMs:Math.min(input.timeoutMs??1200,3000)});
    for(const f of findings){if(f.state==='open'){Object.assign(f,identifyService(f));host.openPorts.push(f);}}
    s.snapshotData.hosts=s.snapshotData.hosts.map(h=>h.ip===host.ip?host:h);
  }
  projects.set(s.id,{request:input,project});
  if(s.state!=='cancelled')s.complete();
}
const server=http.createServer(async(req,res)=>{try{
  if(req.url==='/api/state'&&req.method==='GET')return json(res,200,{scans:[...controller.sessions.values()].map(s=>redactSecrets(s.snapshot()))});
  if(req.url==='/api/scan/start'&&req.method==='POST'){const input=await body(req);const s=controller.start();projects.set(s.id,{request:input,session:s});executeScan(s,input).catch(e=>{const event={type:'scan.error',error:e.message,at:new Date().toISOString()};s.snapshotData.events.push(event);controller.bus.publish(event);s.cancel();});return json(res,201,{id:s.id,state:s.state});}
  const m=req.url.match(/^\/api\/scan\/([^/]+)\/(pause|resume|cancel)$/);if(m&&req.method==='POST'){const s=controller.sessions.get(m[1]);if(!s)return json(res,404,{error:'scan not found'});s[m[2]]();return json(res,200,s.snapshot());}
  if(req.url==='/api/import'&&req.method==='POST'){const input=await body(req);const project=importProject(typeof input.text==='string'?input.text:JSON.stringify(input.project));return json(res,200,{project:redactSecrets(project)});}
  const exportMatch=req.url.match(/^\/api\/export\/(json|csv|markdown)$/);if(exportMatch&&req.method==='POST'){const input=await body(req);const project=validateProject(input.project);const format=exportMatch[1];const content=format==='json'?exportProject(project):format==='csv'?exportCsv(project):reportMarkdown(project);const type=format==='json'?'application/json':format==='csv'?'text/csv':'text/markdown';res.writeHead(200,{'content-type':type+'; charset=utf-8','cache-control':'no-store'});return res.end(content);}
  if(req.url.startsWith('/api/'))return json(res,404,{error:'not found'});
  const requested=req.url==='/'?'index.html':req.url.replace(/^\//,'');const file=path.resolve(root,requested);if(!file.startsWith(root+path.sep))return json(res,400,{error:'invalid path'});if(!fs.existsSync(file))return json(res,404,{error:'not found'});const ext=path.extname(file);const types={'.html':'text/html','.js':'text/javascript','.css':'text/css'};res.writeHead(200,{'content-type':(types[ext]||'text/plain')+'; charset=utf-8'});fs.createReadStream(file).pipe(res);
}catch(e){json(res,400,{error:e.message})}});
if(process.argv[1]===fileURLToPath(import.meta.url))server.listen(process.env.PORT||8787,'127.0.0.1',()=>console.log('InternetScanner GUI http://127.0.0.1:'+(process.env.PORT||8787)));
export {server};
