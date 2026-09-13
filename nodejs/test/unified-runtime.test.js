import test from 'node:test';
import assert from 'node:assert/strict';
import { createUnifiedBizX, Vector3, PerspectiveCamera } from '../src/unified/index.js';

test('unified runtime exposes requested BizX feature families', () => {
  const runtime = createUnifiedBizX();
  assert.equal(runtime.health().status, 'ok');
  for (const name of ['game', 'NetworkUnified', 'UnifiedGame/launcher/python', 'InternetScanner', 'AssetBrowser', 'crypto', 'web', '3D', 'game-assets', 'game-store', 'network', 'rendering', 'scripts']) assert.ok(runtime.features.includes(name));
});

test('crypto creates non-custodial transaction intents', () => {
  const runtime = createUnifiedBizX();
  const intent = runtime.crypto.createTransactionIntent({ chain: 'evm', asset: 'ETH', to: '0xexample', amount: '1', mode: 'testnet' });
  assert.equal(intent.signed, false);
  assert.equal(intent.mode, 'testnet');
  assert.equal(runtime.crypto.hash('BizX'), '516c25f3b26ce33468fee54d03b9d083587a47d186de78210cb179cc98a1f93a');
});

test('3D projection is deterministic', () => {
  const camera = new PerspectiveCamera({ fov: 60 });
  const point = camera.project(new Vector3(0, 0, 2), 1000, 1000);
  assert.equal(point.x, 500);
  assert.equal(point.y, 500);
});

test('network scanner keeps authorization explicit', () => {
  const runtime = createUnifiedBizX({ network: { allowHosts: ['example.test'] } });
  assert.equal(runtime.scanner.inspectTarget('example.test').authorized, true);
  assert.equal(runtime.scanner.inspectTarget('other.test').authorized, false);
});
