import net from 'node:net';
import dgram from 'node:dgram';
import { assertAuthorized } from './policy.mjs';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export function probeTcp(target, port, options = {}) {
  assertAuthorized(target, options.config ?? {});
  const timeout = Math.min(options.timeoutMs ?? 1500, 5000);
  return new Promise(resolve => {
    const socket = net.createConnection({ host: target.ip, port, family: net.isIP(target.ip) }, () => {
      socket.destroy(); resolve({ protocol:'tcp', port, state:'open', latencyMs: Date.now()-started });
    });
    const started = Date.now();
    socket.setTimeout(timeout, () => { socket.destroy(); resolve({ protocol:'tcp', port, state:'filtered', latencyMs: Date.now()-started }); });
    socket.on('error', err => { socket.destroy(); resolve({ protocol:'tcp', port, state: err.code === 'ECONNREFUSED' ? 'closed' : 'filtered', error: err.code }); });
  });
}

export function probeUdp(target, port, options = {}) {
  assertAuthorized(target, options.config ?? {});
  const timeout = Math.min(options.timeoutMs ?? 1500, 5000);
  const family = net.isIP(target.ip) === 6 ? 'udp6' : 'udp4';
  return new Promise(resolve => {
    const socket = dgram.createSocket(family); const started = Date.now(); let done = false;
    const finish = result => { if (!done) { done = true; socket.close(); resolve({ protocol:'udp', port, ...result, latencyMs:Date.now()-started }); } };
    socket.on('message', () => finish({ state:'open' }));
    socket.on('error', err => finish({ state: err.code === 'ECONNREFUSED' ? 'closed' : 'filtered', error: err.code }));
    socket.send(Buffer.alloc(0), port, target.ip, err => { if (err) finish({ state:'filtered', error:err.code }); });
    setTimeout(() => finish({ state:'open|filtered' }), timeout);
  });
}

export async function scanPorts(target, ports, protocols, options = {}) {
  const max = Math.min(options.concurrency ?? 32, 64);
  const jobs = [];
  for (const port of ports) for (const protocol of protocols) jobs.push({ port, protocol });
  const out = []; let cursor = 0;
  async function worker() { while (cursor < jobs.length) { const job = jobs[cursor++]; out.push(await (job.protocol === 'tcp' ? probeTcp(target, job.port, options) : probeUdp(target, job.port, options))); if (options.ratePerSecond) await sleep(Math.ceil(1000/options.ratePerSecond)); } }
  await Promise.all(Array.from({length: Math.min(max, jobs.length)}, worker));
  return out;
}
