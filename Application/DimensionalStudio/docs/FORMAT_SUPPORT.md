# Format Support

Dimensional Studio uses an adapter registry so unsupported or optional formats do not contaminate the core scene engine.

## First-class/open interoperability

- `.d4s` native scene format
- glTF 2.0 `.gltf` / `.glb`
- OpenUSD `.usd` / `.usda` / `.usdc` / `.usdz` where the USD SDK is available
- OBJ
- STL
- PLY
- Alembic
- BVH
- SVG curves
- PNG/JPEG/WebP/EXR texture assets
- common video assets through an external media backend

## Optional/proprietary ecosystem adapters

FBX, COLLADA and additional DCC/CAD/game formats are represented as optional adapters. An adapter may use a user-installed SDK or external converter where its license permits. The repository does not redistribute proprietary SDKs or reverse-engineered vendor code.

## Fidelity

The importer reports what it can preserve: geometry, materials, textures, cameras, lights, animation, skeletons, morph targets, metadata and simulation caches. Conversion warnings are stored in asset provenance.

OpenUSD is used for high-complexity scene interchange because its scenegraph supports geometry, shading, lighting and physics schemas and composition of reusable scene components. glTF is used for efficient runtime/web delivery.
