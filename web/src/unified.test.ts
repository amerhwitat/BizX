import { UnifiedBizXRuntime } from './unified';

export function testUnifiedBizXRuntime(): void {
  const runtime = new UnifiedBizXRuntime();
  for (const feature of ['game', 'NetworkUnified', 'crypto', '3D']) {
    if (!runtime.features.includes(feature as never)) throw new Error(`missing feature: ${feature}`);
  }
}
