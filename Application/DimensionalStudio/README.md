# BizX Dimensional Studio

Dimensional Studio is a standalone GPL-3.0-or-later 3D/4D modeling and visualization application. It is intentionally isolated under `Application/DimensionalStudio/` from the existing BizX language/runtime implementations.

## Initial capabilities

- Polygon and NURBS scene representation.
- Native `.d4s` scene schema with 3D geometry plus time/4D state.
- 128D framework metadata and perspective-vs-geometry projection model.
- Color wheel and color-harmony engine.
- Import/export adapter registry for open and optional external formats.
- C++20 native core.
- Python scripting/research API.
- TypeScript/Three.js/WebGL viewer foundation.
- OpenCV and ONNX integration boundaries.
- Blender/USD/glTF interoperability boundaries.
- Cross-platform build scripts.

## Format strategy

Primary interchange targets are glTF/GLB and USD. Additional formats such as OBJ, STL, PLY, Alembic, BVH, COLLADA and FBX are exposed through adapter interfaces. Proprietary SDKs/converters are optional external dependencies; proprietary source code and copyrighted training material are not copied into this repository.

## Multidimensional model

The Library-based 128D framework is represented as eight domains of sixteen axes. Geometry uses D1-D3, temporal evolution uses D4, observer/perspective is D5, light/material and events/objects occupy D6-D8, and later axes encode information, cognition, collective and meta-modeling features. These are computational/modeling degrees of freedom, not a claim that all 128 axes are physical spatial coordinates.

## AI engine

The learning subsystem extracts local features from geometry, textures, maps, animation curves and motion graphics. RNN/sequence models may be trained locally and exported to ONNX for native/web inference. Training is opt-in and asset provenance is recorded.

## License

GPL-3.0-or-later. See `LICENSE`.
