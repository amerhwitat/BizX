import { MODULES, UnifiedBizXRuntime } from './unified-runtime.js';

describe('BizX web runtime', () => {
  test('exposes all feature families', () => {
    const r = new UnifiedBizXRuntime();
    expect(r.health().modules).toEqual(MODULES);
  });
  test('projects origin', () => {
    expect(new UnifiedBizXRuntime().project({x:0,y:0,z:0})).toEqual({x:400,y:300,z:5});
  });
  test('crypto intent is unsigned', () => {
    expect(new UnifiedBizXRuntime().cryptoIntent('provider','TEST',1)).toContain('UNSIGNED');
  });
});
