import assert from 'node:assert/strict';
import { PlayerResources } from './index.js';

const p = new PlayerResources();
assert.equal(p.health, 100); assert.equal(p.ammo, 30); assert.equal(p.reserveAmmo, 120);
assert.equal(p.useMedicalKit(), 100); assert.equal(p.addAmmo(), 150);
p.takeDamage(100); assert.equal(p.needsPurchasePrompt().kind, 'health');
const healthCheckpoint = p.saveCheckpoint(); assert.equal(healthCheckpoint.health, 0); assert.equal(p.resumeFromCheckpoint(healthCheckpoint), true);

const a = new PlayerResources({ reserveAmmo: 0 });
a.consumeAmmo(30); assert.equal(a.needsPurchasePrompt().kind, 'ammo');
const ammoCheckpoint = a.saveCheckpoint(); assert.equal(ammoCheckpoint.ammo, 0); assert.equal(a.resumeFromCheckpoint(ammoCheckpoint), true);

assert.equal(a.requestPurchase('health').price, 0.49);
assert.equal(a.requestPurchase('ammo').price, 0.29);
console.log('survival resource tests passed');
