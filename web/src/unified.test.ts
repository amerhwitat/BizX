import { strict as assert } from 'node:assert';
import { UnifiedBizXRuntime } from './unified';

describe('UnifiedBizXRuntime', () => {
  it('exposes feature parity', () => {
    const runtime = new UnifiedBizXRuntime();
    assert.ok(runtime.features.includes('game'));
    assert.ok(runtime.features.includes('NetworkUnified'));
    assert.ok(runtime.features.includes('crypto'));
    assert.ok(runtime.features.includes('3D'));
  });
});
