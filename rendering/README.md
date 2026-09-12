# BizX real-time rendering layer

BizX uses a renderer-adapter architecture instead of embedding one third-party renderer into every application.

## Adapters

The first integration targets are:

- Unreal Engine 5 / native C++
- Godot 4 / GDExtension or scene import boundary
- OGRE 14.x / C++
- Bevy / Rust
- Three.js / WebGL/WebGPU
- bgfx / C++ rendering backend
- Filament / C++ PBR renderer

The application owns a normalized scene description and adapters translate it into engine-native meshes, materials, lights, cameras and transforms.

## Rendering modes

`Forward`, `PBR`, `HDR`, `shadowed`, `wireframe`, `unlit`, `2D`, `3D`, and `headless` are represented as capabilities rather than hard-coded engine assumptions.

The adapter must report its backend (Vulkan, Direct3D, Metal, OpenGL/WebGL/WebGPU, etc.), supported material features and asset-import capabilities at runtime.

## Open-source policy

No renderer is copied into BizX. Adapters call the renderer's public APIs and retain the upstream license notices. Engine SDKs are external dependencies.

Current research references include Godot's Forward+/Mobile/Compatibility renderer architecture, OGRE's open-source C++ renderer and recent clustered-lighting work, and Bevy's ECS/render-graph/glTF pipeline.

References:
- https://docs.godotengine.org/en/latest/tutorials/rendering/renderers.html
- https://www.ogre3d.org/
- https://www.ogre3d.org/2026/09/09/ogre-14-6-released
- https://bevy.org/
- https://github.com/bkaradzic/bgfx
- https://github.com/google/filament
