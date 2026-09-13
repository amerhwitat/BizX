#!/usr/bin/env python3
import hashlib,http.server,json,mimetypes,os,pathlib,socket,urllib.parse,urllib.request
from urllib.parse import urlparse
ROOT=pathlib.Path(__file__).resolve().parents[1]; WEB=ROOT/'web'; CFG=ROOT/'config/providers.json'
PORT=int(os.getenv('ASSET_BROWSER_PORT','8790')); STORE=pathlib.Path(os.getenv('ASSET_BROWSER_DIR',str(ROOT/'game_assets'))); STORE.mkdir(parents=True,exist_ok=True)
MANIFEST=STORE/'manifest.json'; PROVIDERS=json.loads(CFG.read_text()); UA='BizX-AssetBrowser/1.0 (+in-game asset browser)'
SAFE_EXT={'.png','.jpg','.jpeg','.webp','.gif','.wav','.ogg','.mp3','.flac','.glb','.gltf','.obj','.mtl','.hdr','.exr','.ttf','.otf','.json','.txt','.zip'}
def get(url):
 r=urllib.request.Request(url,headers={'User-Agent':UA})
 with urllib.request.urlopen(r,timeout=15) as x:return x.read()
def host_ok(url,provider):return urlparse(url).scheme=='https' and urlparse(url).hostname in PROVIDERS[provider]['download_hosts']
def manifest():
 try:return json.loads(MANIFEST.read_text())
 except:return []
def save_manifest(m):MANIFEST.write_text(json.dumps(m,indent=2,ensure_ascii=False))
def first_url(x):
 if isinstance(x,dict):
  if isinstance(x.get('url'),str):return x['url']
  for v in x.values():
   u=first_url(v)
   if u:return u
 return None
def search(provider,q,kind='image'):
 if provider=='openverse':
  base=PROVIDERS['openverse']['search_audio' if kind=='audio' else 'search_image']; data=json.loads(get(base+'?'+urllib.parse.urlencode({'q':q,'page_size':24}))); return [{'id':x.get('id'),'title':x.get('title'),'provider':'Openverse','type':kind,'license':x.get('license'),'license_url':x.get('license_url'),'creator':x.get('creator'),'source':x.get('foreign_landing_url') or x.get('url'),'preview':x.get('thumbnail') or x.get('url'),'download':x.get('url')} for x in data.get('results',[])]
 if provider=='polyhaven':
  data=json.loads(get(PROVIDERS['polyhaven']['assets'])); ql=q.lower(); out=[]
  for k,x in data.items():
   if not ql or ql in (k+' '+str(x)).lower():
    files=json.loads(get(PROVIDERS['polyhaven']['files']+urllib.parse.quote(k,safe=''))); u=first_url(files)
    out.append({'id':k,'title':x.get('name',k),'provider':'Poly Haven','type':{0:'hdri',1:'texture',2:'model'}.get(x.get('type'),'asset'),'license':'CC0','license_url':'https://polyhaven.com/license','source':'https://polyhaven.com/a/'+k,'preview':x.get('thumbnail_url'),'download':u})
   if len(out)>=24:break
  return out
 if provider=='kenney':return [{'id':'kenney-catalog','title':'Kenney official CC0 asset catalog','provider':'Kenney','type':'catalog','license':'CC0','license_url':'https://kenney.nl/support','source':'https://kenney.nl/assets','preview':None,'download':None}]
 return []
class H(http.server.BaseHTTPRequestHandler):
 def sendj(self,o,code=200):
  b=json.dumps(o).encode();self.send_response(code);self.send_header('Content-Type','application/json');self.send_header('Access-Control-Allow-Origin','*');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)
 def do_OPTIONS(self):self.send_response(204);self.send_header('Access-Control-Allow-Origin','*');self.send_header('Access-Control-Allow-Methods','GET,POST,OPTIONS');self.send_header('Access-Control-Allow-Headers','Content-Type');self.end_headers()
 def do_GET(self):
  p=urllib.parse.urlparse(self.path)
  if p.path in ('/','/index.html'):return self.serve(WEB/'index.html','text/html')
  if p.path.startswith('/static/'):return self.serve(WEB/p.path[8:])
  if p.path=='/api/v1/assets/providers':return self.sendj(PROVIDERS)
  if p.path=='/api/v1/assets/manifest':return self.sendj(manifest())
  if p.path=='/api/v1/assets/search':
   q=urllib.parse.parse_qs(p.query);pr=q.get('provider',['openverse'])[0];term=q.get('q',[''])[0];kind=q.get('type',['image'])[0]
   try:return self.sendj({'results':search(pr,term,kind)})
   except Exception as e:return self.sendj({'error':type(e).__name__},502)
  return self.sendj({'error':'not_found'},404)
 def do_POST(self):
  if self.path!='/api/v1/assets/download':return self.sendj({'error':'not_found'},404)
  try:d=json.loads(self.rfile.read(int(self.headers.get('Content-Length','0'))));pr=d['provider'];u=d['download'];name=pathlib.Path(urlparse(u).path).name or d.get('id','asset')+'.bin'
  except Exception:return self.sendj({'error':'invalid_json'},400)
  if pr not in PROVIDERS or not u or not host_ok(u,pr):return self.sendj({'error':'download_host_not_allowed'},403)
  if pathlib.Path(name).suffix.lower() not in SAFE_EXT:return self.sendj({'error':'file_type_not_allowed'},415)
  try:data=get(u)
  except Exception as e:return self.sendj({'error':'download_failed','detail':type(e).__name__},502)
  if len(data)>250*1024*1024:return self.sendj({'error':'file_too_large'},413)
  sha=hashlib.sha256(data).hexdigest();safe=''.join(c for c in name if c.isalnum() or c in '._-')[:160] or 'asset.bin';dest=STORE/safe;dest.write_bytes(data)
  import datetime;rec={'file':str(dest.relative_to(STORE)),'sha256':sha,'bytes':len(data),'provider':pr,'source':d.get('source'),'license':d.get('license'),'license_url':d.get('license_url'),'downloaded_at':datetime.datetime.now(datetime.timezone.utc).isoformat()};m=manifest();m.append(rec);save_manifest(m);return self.sendj(rec)
 def serve(self,path,ctype=None):
  try:b=path.read_bytes();self.send_response(200);self.send_header('Content-Type',ctype or mimetypes.guess_type(str(path))[0] or 'application/octet-stream');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)
  except:self.sendj({'error':'not_found'},404)
 def log_message(self,*a):pass
print(f'BizX Asset Browser: http://127.0.0.1:{PORT}')
http.server.ThreadingHTTPServer(('127.0.0.1',PORT),H).serve_forever()
