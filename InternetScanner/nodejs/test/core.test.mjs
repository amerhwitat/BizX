import test from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import dgram from 'node:dgram';
import { classifyIp, authorizeTarget, PolicyError } from '../src/policy.mjs';
import { EventBus, ScanController } from '../src/events.mjs';
import { probeTcp, probeUdp } from '../src/probes.mjs';
import { validateProject, redactSecrets } from '../src/model.mjs';
import { exportProject, importProject, exportCsv } from '../src/io.mjs';
import { parseNmapXml } from '../src/security.mjs';

const config={authorizedOnly:true,public:{allowlistedTargets:[]}};

test('classifies IPv4 and IPv6 local/public targets', () => {
  assert.equal(classifyIp('192.168.1.1'), 'local/intranet');
  assert.equal(classifyIp('10.0.0.1'), 'local/intranet');
  assert.equal(classifyIp('fd00::1'), 'local/intranet');
  assert.equal(classifyIp('fe80::1'), 'local/intranet');
  assert.equal(classifyIp('2001:db8::1'), 'public');
});

test('blocks public targets unless explicitly allowlisted', () => {
  assert.equal(authorizeTarget({ip:'8.8.8.8'}, config).authorized, false);
  assert.equal(authorizeTarget({ip:'8.8.8.8'}, {authorizedOnly:true,public:{allowlistedTargets:['8.8.8.8']}}).authorized, true);
  assert.throws(() => probeTcp({ip:'8.8.8.8'}, 53, {config}), PolicyError);
});

test('event session transitions are observable', () => {
  const events=[]; const bus=new EventBus(); bus.subscribe(e=>events.push(e.type)); const s=new ScanController(bus).start(); s.pause(); s.resume(); s.cancel(); assert.deepEqual(events,['scan.started','scan.paused','scan.resumed','scan.cancelled']);
});

test('TCP probe works against a local IPv4 fixture', async () => {
  const server=net.createServer(socket=>socket.end('ok')).listen(0,'127.0.0.1'); await new Promise(r=>server.once('listening',r));
  const port=server.address().port; const finding=await probeTcp({ip:'127.0.0.1'},port,{config,timeoutMs:1000}); server.close(); assert.equal(finding.state,'open');
});

test('UDP probe reports an IPv4 response as open', async () => {
  const server=dgram.createSocket('udp4'); server.on('message',(msg,rinfo)=>server.send(Buffer.from('ok'),rinfo.port,rinfo.address)); server.bind(0,'127.0.0.1'); await new Promise(r=>server.once('listening',r));
  const port=server.address().port; const finding=await probeUdp({ip:'127.0.0.1'},port,{config,timeoutMs:1000}); server.close(); assert.equal(finding.state,'open');
});

test('UDP IPv6 loopback fixture is supported', async () => {
  const server=dgram.createSocket('udp6'); server.on('message',(msg,rinfo)=>server.send(Buffer.from('ok'),rinfo.port,rinfo.address)); server.bind(0,'::1'); await new Promise(r=>server.once('listening',r));
  const port=server.address().port; const finding=await probeUdp({ip:'::1'},port,{config,timeoutMs:1000}); server.close(); assert.equal(finding.state,'open');
});

test('project validation, import/export, and secret redaction are enforced', () => {
  const project={schema:1,hosts:[{ip:'127.0.0.1',scope:'local/intranet',authorized:true,openPorts:[{port:80,protocol:'tcp',state:'open'}],vulnerabilities:[{state:'LIKELY_VULN'}]}]};
  assert.equal(validateProject(project),project); assert.deepEqual(importProject(exportProject(project)),project); assert.match(exportCsv(project),/127\.0\.0\.1/);
  assert.deepEqual(redactSecrets({token:'abc',nested:{password:'x'},name:'ok'}),{token:'[REDACTED]',nested:{password:'[REDACTED]'},name:'ok'});
});

test('Nmap XML preserves TCP and UDP protocol per port', () => {
  const project=parseNmapXml('<nmaprun><host><address addr="192.168.1.2" addrtype="ipv4"/><ports><port protocol="tcp" portid="80"><state state="open"/></port><port protocol="udp" portid="53"><state state="open|filtered"/></port></ports></host></nmaprun>');
  assert.deepEqual(project.hosts[0].openPorts.map(p=>[p.protocol,p.port,p.state]),[['tcp',80,'open'],['udp',53,'open|filtered']]);
});
