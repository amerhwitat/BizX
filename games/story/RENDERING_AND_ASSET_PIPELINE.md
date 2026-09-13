# BizX Real-Time Rendering & Asset Pipeline

## Rendering architecture

BizX uses a deterministic simulation core plus replaceable presentation adapters.

```text
Input -> FixedStep Simulation -> Authoritative World State
                         |-> Replay / Save / Network State
                         |-> Render Snapshot -> Engine Adapter -> GPU
                         |-> Audio Snapshot -> Audio Adapter
                         |-> Telemetry Snapshot -> Profiler
```

## Real-time quality tiers

### Tier 0 — Headless
Deterministic server simulation, CI, replay validation and automated tests.

### Tier 1 — Native lightweight
OpenGL/WebGL/WebGPU renderer with frustum culling, instancing, texture atlases and basic PBR.

### Tier 2 — High fidelity
Vulkan/D3D12/Metal-capable renderers with clustered lighting, temporal upscaling, GPU particles, animation LOD, occlusion culling and virtualized geometry where supported.

### Tier 3 — AAA engine adapter
Unreal/Unity/O3DE adapters can use their own licensed high-end features such as virtualized geometry, global illumination, world streaming, data-oriented entities and cinematic rendering.

## Performance budgets

- fixed simulation step independent of frame rate
- render interpolation between simulation snapshots
- dynamic resolution and frame pacing
- CPU/GPU frame-time telemetry
- asset streaming budgets
- animation LOD
- crowd LOD
- occlusion and frustum culling
- pooled effects and projectiles
- async loading
- deterministic replay for performance regressions

## Character pipeline

1. Import only legally redistributable source assets.
2. Validate skeleton/scale/orientation.
3. Generate collision proxies.
4. Generate LOD chain.
5. Validate material slots.
6. Register provenance and checksum.
7. Add animation state-machine metadata.
8. Package into an engine-specific content catalog.

No commercial character model should be copied or extracted from a game without an explicit license.

## Visual references

Steam/Epic/publisher screenshots may inform composition, HUD hierarchy, lighting goals and UX research. They are not automatically redistributable. The repository therefore stores source references and original BizX concept specifications rather than copied screenshots.

## Open/compatible asset sources

Prefer assets with explicit redistribution rights. CC0 is the simplest target for committed samples. Each imported file must have a sidecar manifest containing:

```json
{
  "asset": "example.glb",
  "creator": "creator-name",
  "provider": "provider-name",
  "source": "https://example.invalid/asset",
  "license": "CC0-1.0",
  "sha256": "..."
}
```

## Research rendering boundary

A future optional render-server adapter can consume white-box render snapshots while gameplay remains authoritative in the simulation engine. This follows the separation principle explored by recent interactive generative-rendering research; it is experimental and must not make generated pixels authoritative for gameplay.
