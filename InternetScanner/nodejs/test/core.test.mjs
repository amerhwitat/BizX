import test from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import { classifyIp, authorizeTarget, PolicyError } from '../src/policy.mjs';
import { EventBus, ScanController } from '../src/events.mjs';
import { probeTcp } from '../src/probes.mjs';
import { validateProject, redactSecrets } from '../src/model.mjs';

test('classifies IPv4 and IPv6 local/public targets', () => {
  assert.equal(classifyIp('192.168.1.1'), 'local/intranet');
  assert.equal(classifyIp('10.0.0.1'), 'local/intranet');
  assert.equal(classifyIp('fd00::1'), 'local/intranet');
  assert.equal(classifyIp('2001:db8::1'), 'public');
});

test('blocks public targets unless explicitly allowlisted', () => {
  assert.equal(authorizeTarget({ip:'8.8.8.8'}, {authorizedOnly:true,public:{allowlistedTargets:[]}}).authorized, false);
  assert.equal(authorizeTarget({ip:'8.8.8.8'}, {authorizedOnly:true,public:{allowlistedTargets:['8.8.8.8']}}).authorized, true);
  assert.throws(() => probeTcp({ip:'8.8.8.8'}, 53, {config:{authorizedOnly:true,public:{allowlistedTargets:[]}}}), PolicyError);
});

test('event session transitions are observable', () => {
  const events=[]; const bus=new EventBus(); bus.subscribe(e=>events.push(e.type)); const s=new ScanController(bus).start(); s.pause(); s.resume(); s.cancel(); assert.deepEqual(events,['scan.started','scan.paused','scan.resumed','scan.cancelled']);
});

test('TCP probe works against a local fixture', async () => {
  const server=net.createServer(socket=>socket.end('ok')).listen(0,'127.0.0.1');
  await new Promise(r=>server.once('listening',r));
  const port=server.address().port;
  const finding=await probeTcp({ip:'127.0.0.1'},port,{config:{authorizedOnly:true,public:{allowlistedTargets:[]}},timeoutMs:1000});
  server.close(); assert.equal(finding.state,'open');
});

test('project validation and secret redaction are enforced', () => {
  const project={schema:1,hosts:[{ip:'127.0.0.1',scope:'local/intranet',openPorts:[{port:80,protocol:'tcp',state:'open'}]}]};
  assert.equal(validateProject(project),project); assert.deepEqual(redactSecrets({token:'abc',nested:{password:'x'},name:'ok'}),{token:'[REDACTED]',nested:{password:'[REDACTED]'},name:'ok'});
});
