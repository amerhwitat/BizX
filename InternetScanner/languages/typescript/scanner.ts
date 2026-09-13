export type Scope='local/intranet'|'public';
const privateRanges=[['10.0.0.0',8],['172.16.0.0',12],['192.168.0.0',16],['127.0.0.0',8],['169.254.0.0',16]] as const;
function n(ip:string){return ip.split('.').reduce((a,x)=>(a*256)+Number(x),0)>>>0}
function cidr(ip:string,b:string,bits:number){const mask=bits?((0xffffffff<<(32-bits))>>>0):0;return (n(ip)&mask)===(n(b)&mask)}
export function classify(ip:string):Scope{return privateRanges.some(([b,x])=>cidr(ip,b,x))?'local/intranet':'public'}
export function authorized(ip:string,allow:string[]){return classify(ip)!=='public'||allow.includes(ip)}
