import test from "node:test";
import assert from "node:assert/strict";
import { MODULES, UnifiedBizXRuntime } from "../src/unified-runtime.js";

test("web runtime exposes all feature families", () => {
  const runtime = new UnifiedBizXRuntime();
  assert.deepEqual(runtime.health().modules, MODULES);
});

test("projects the origin into the viewport", () => {
  assert.deepEqual(new UnifiedBizXRuntime().project({ x: 0, y: 0, z: 0 }), { x: 400, y: 300, z: 5 });
});

test("crypto intent is unsigned", () => {
  assert.match(new UnifiedBizXRuntime().cryptoIntent("provider", "TEST", 1), /UNSIGNED$/);
});
