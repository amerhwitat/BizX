import test from 'node:test';
import assert from 'node:assert/strict';
import { createBizX } from '../src/index.js';

test('BizX reports healthy Node.js runtime', () => {
  assert.deepEqual(createBizX().health(), {
    name: 'BizX',
    version: '1.0.0',
    status: 'ok',
    runtime: 'node'
  });
});
