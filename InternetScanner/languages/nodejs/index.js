import os from 'node:os';
import dns from 'node:dns/promises';
import net from 'node:net';
import fs from 'node:fs';

export const PRIVATE = [
  ['10.0.0.0', 8], ['172.16.0.0', 12], ['192.168.0.0', 16],
  ['127.0.0.0', 8], ['169.254.0.0', 16]
];

function ipv4ToInt(ip) { return ip.split('.').reduce((n, x) => (n * 256) + Number(x), 0) >>> 0; }
function inCidr(ip, base, bits) { const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0; return (ipv4ToInt(ip) & mask) === (ipv4ToInt(base) & mask); }
export function classifyIp(ip) {
  if (PRIVATE.some(([base,bits]) => inCidr(ip,base,bits))) return 'local/intranet';
  return 'public';
}
export function authorizedTarget(ip, config) {
  return classifyIp(ip) !== 'public' || (config.public?.allowlistedTargets ?? []).includes(ip);
}
export async function inspectHost(ip, config) {
  if (config.authorizedOnly && !authorizedTarget(ip, config)) throw new Error(`Public target is not allowlisted: ${ip}`);
  const names = await dns.reverse(ip).catch(() => []);
  return { ip, scope: classifyIp(ip), authorized: true, reverseDns: names };
}
export function localInterfaces() {
  return Object.values(os.networkInterfaces()).flatMap(xs => xs ?? []).map(x => ({address:x.address, family:x.family, internal:x.internal, cidr:x.cidr}));
}
export function tcpProbe(ip, port, timeout=1500) {
  return new Promise(resolve => { const s=net.createConnection({host:ip,port}); const done=(ok)=>{s.destroy();resolve({ip,port,open:ok});}; s.setTimeout(timeout); s.once('connect',()=>done(true)); s.once('timeout',()=>done(false)); s.once('error',()=>done(false)); });
}
export function loadConfig(path='../../config/scanner.json') { return JSON.parse(fs.readFileSync(new URL(path, import.meta.url))); }
