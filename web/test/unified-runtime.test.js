import test from 'node:test';
import assert from 'node:assert/strict';
import { MODULES, UnifiedBizXRuntime } from './unified-runtime.js';

test('exposes all feature families in stable order', () => {
  const runtime = new UnifiedBizXRuntime();
  assert.deepEqual(runtime.health().modules, MODULES);
});

test('projects the origin to the viewport center', () => {
  assert.deepEqual(new UnifiedBizXRuntime().project({ x: 0, y: 0, z: 0 }), {
    x: 400, y: 300, z: 5
  });
});

test('marks crypto intent unsigned', () => {
  assert.match(new UnifiedBizXRuntime().cryptoIntent('provider', 'TEST', 1), /UNSIGNED$/);
});

test('rejects points on or behind the camera plane', () => {
  const runtime = new UnifiedBizXRuntime();
  assert.throws(() => runtime.project({ x: 0, y: 0, z: 5 }), /behind camera/);
});
