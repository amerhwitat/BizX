# BizX Dimensional Studio Architecture Specification

## Goal
Create a standalone, language-separated 3D/4D modeling, visualization, VFX, animation, color, world-building, and research application under `Application/DimensionalStudio/`, without mixing its source with existing BizX applications.

## Design
Dimensional Studio uses a native `.d4s` scene model with explicit 3D geometry plus temporal/4D state and a 128D/infinite-dimensional metadata tensor layer. USD and glTF/GLB are first-class interchange formats; additional import/export adapters are isolated so proprietary formats are handled through documented/open adapters or optional external converters rather than copied proprietary code.

### Core capabilities
- Polygon meshes, subdivision surfaces, curves, Bezier/B-spline/NURBS curves and surfaces.
- 3D viewing and 4D time-varying visualization, with optional higher-dimensional projections.
- Sculpting-oriented tools: multiresolution, dynamic topology, symmetry, masking, brushes and deformation.
- UV, PBR material, texture painting, procedural textures, normal/displacement/roughness/metalness workflows.
- Color theory: RGB/HSL/HSV/XYZ/Lab/LCH, color wheel, harmony/relationship engine, palettes, exposure and color-management metadata.
- FK/IK animation, skeletons, constraints, keyframes, morph targets, motion graphics and procedural animation.
- Rigid/soft bodies, cloth, particles, fluids, smoke/volumes and forces through pluggable simulation interfaces.
- VFX, compositing, camera/object tracking, OpenCV-assisted optical flow and feature tracking.
- Procedural terrain/world maps, atmosphere, oceans and coordinate-aware world scenes.
- OpenGL native rendering and Three.js/WebGL browser rendering, with WebAssembly acceleration where appropriate.
- Desktop implementations in C++ and Python, plus Java integration and browser TypeScript/JavaScript.
- Import/export registry covering open and widely used 3D/media formats: glTF/GLB, OBJ, STL, PLY, USD/USDZ where supported, Alembic, COLLADA, FBX through optional adapters, BVH, SVG curves, common image/video/texture formats, and extensible plugin adapters.
- Blender interoperability through open APIs, open formats and optional Blender bridge scripts.

### Multidimensional framework
The Library's 128D material defines eight domains of 16 axes: physical geometry, temporal dynamics, perspective/observer, energetic/light, interactions/events, object/material, information/uncertainty, and cognitive/semantic. The application represents these as metadata/features around a scene/object tensor rather than claiming that all axes are physical spatial dimensions. D1-D3 encode geometry, D4 time, D5 observer/perspective, D6-D8 physical dynamics/material/events/objects, and later axes encode information, cognition, collective and meta-modeling layers. The framework supports projections, tensor contraction/einsum-style operations, observer-weighted views and higher-dimensional visualization. Source grounding: Library `Multi-Dimensions-Chats.pdf`.

### Learning engine
A pluggable RNN/sequence-learning engine analyzes user-authorized project data such as object graphs, geometry descriptors, maps, texture statistics, animation curves, motion-graphics timelines and tracking trajectories. It produces embeddings/features, similarity scores, sequence predictions and workflow recommendations. It must distinguish inference from autonomous training and must not silently upload project assets. ONNX Runtime is the portable model boundary for browser/native inference; models may be trained externally and imported as ONNX. Optional local training uses documented datasets and user-controlled storage.

### File compatibility
The importer registry identifies format, version, dependencies, fidelity and license constraints. Importers normalize source data into the `.d4s` scene graph. Exporters serialize selected scene subsets to supported formats. Proprietary formats are supported only through clean-room/documented interfaces, optional external converters, or user-installed SDKs; no proprietary SDK or copyrighted training material is copied into the repository.

### Performance
Native C++ owns high-cost geometry, animation, color and scene operations. Python provides scripting/research tools. Java provides a portable integration/runtime layer. TypeScript/JavaScript uses Web Workers and Three.js/WebGL/WebAssembly. Processing uses bounded worker pools, streaming asset loading, lazy texture decoding, mesh LOD and cancellation.

### Licensing
Application source is GPL-3.0-or-later unless a more permissive license is explicitly required by a third-party dependency. Third-party dependencies retain their original licenses. Training material is referenced through public documentation/links and not copied into the repository unless its license permits redistribution.

## Security and provenance
Every imported asset records source path, format, importer version, checksum and conversion warnings. External web research is separated from local project data. Model training datasets have explicit manifests and provenance records.

## Initial implementation boundaries
Phase 1 establishes the scene schema, importer/exporter registry, multidimensional metadata, color engine, C++ geometry core, Python API, TypeScript/Three.js viewer, OpenGL viewer, OpenCV tracking adapter, RNN/ONNX model interface, build scripts and documentation. Full format fidelity and advanced simulation engines remain plugin implementations built on these stable interfaces.
