# Dimensional Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone GPL-3.0-or-later 3D/4D application under `Application/DimensionalStudio/` with multi-format media interchange, polygon/NURBS modeling, multidimensional visualization, color, VFX, animation, tracking, web/desktop renderers, and a local-first RNN/ONNX learning layer.

**Architecture:** A shared `.d4s` scene schema sits above native C++ geometry/rendering, Python research/scripting, Java integration, and TypeScript/Three.js/WebGL. Import/export is adapter-based, with USD/glTF as primary interchange and optional adapters for proprietary formats. The 128D framework is stored as explicit metadata/tensor features and projected into 3D/4D views.

**Tech Stack:** C++20, OpenGL, OpenCV, Python 3.11+, Java 17+, TypeScript, Three.js, WebGL/WebAssembly, ONNX Runtime, CMake, PowerShell, Bash, batch, Python build orchestration, GPL-3.0-or-later.

**Spec:** `docs/superpowers/specs/2026-09-12-dimensional-studio-design.md`

## Global Constraints

- Keep all Dimensional Studio source under `Application/DimensionalStudio/`.
- Do not mix its source files into existing BizX runtime directories.
- Preserve original third-party licenses and do not copy proprietary application code or copyrighted training courses.
- `.d4s` is the native scene format; USD and glTF/GLB are first-class interchange formats.
- Local project assets and model-training data remain local unless the user explicitly exports them.
- Use GPL-3.0-or-later for original application source.

---

### Task 1: Application skeleton and license

**Files:**
- Create: `Application/DimensionalStudio/README.md`
- Create: `Application/DimensionalStudio/LICENSE`
- Create: `Application/DimensionalStudio/CMakeLists.txt`
- Create: `Application/DimensionalStudio/config/application.json`

- [ ] Write tests/checks that required directories and license metadata exist.
- [ ] Add the GPL-3.0-or-later license text and project metadata.
- [ ] Add the root CMake target layout and configuration validation.
- [ ] Run CMake configure and a smoke build.
- [ ] Commit `feat: scaffold Dimensional Studio`.

### Task 2: Native scene model and `.d4s` schema

**Files:**
- Create: `core/include/ds/Scene.hpp`
- Create: `core/include/ds/Geometry.hpp`
- Create: `core/include/ds/Transform.hpp`
- Create: `core/include/ds/DimensionTensor.hpp`
- Create: `schemas/d4s.schema.json`
- Create: `tests/core/test_scene.cpp`

- [ ] Test creation of a scene, object, transform, mesh and 128-component metadata tensor.
- [ ] Implement stable IDs, hierarchy, 3D transforms and time-sampled state.
- [ ] Implement tensor metadata for the 8x16 framework domains without treating all axes as spatial.
- [ ] Implement `.d4s` JSON serialization/deserialization with versioning.
- [ ] Run native unit tests.
- [ ] Commit `feat: add native d4s scene model`.

### Task 3: Polygon and NURBS geometry engine

**Files:**
- Create: `core/geometry/polygon/Mesh.cpp`
- Create: `core/geometry/nurbs/NurbsCurve.cpp`
- Create: `core/geometry/nurbs/NurbsSurface.cpp`
- Create: `core/geometry/subdivision/Subdivision.cpp`
- Create: `core/geometry/algorithms/Topology.cpp`
- Create: `tests/geometry/test_geometry.cpp`

- [ ] Test triangle/quad/n-gon mesh construction and NURBS evaluation.
- [ ] Implement mesh topology, normals, tangents and bounding volumes.
- [ ] Implement B-spline/NURBS curve and surface evaluation.
- [ ] Implement subdivision and LOD interfaces.
- [ ] Run geometry tests and sanitizer-enabled build where available.
- [ ] Commit `feat: add polygon and nurbs geometry core`.

### Task 4: Import/export adapter registry

**Files:**
- Create: `io/include/ds/FormatRegistry.hpp`
- Create: `io/FormatRegistry.cpp`
- Create: `io/adapters/gltf/`
- Create: `io/adapters/obj/`
- Create: `io/adapters/stl/`
- Create: `io/adapters/ply/`
- Create: `io/adapters/usd/`
- Create: `io/adapters/alembic/`
- Create: `io/adapters/fbx/README.md`
- Create: `io/adapters/collada/README.md`
- Create: `io/adapters/bvh/`
- Create: `io/adapters/images/`
- Create: `io/adapters/video/`
- Create: `tests/io/test_registry.cpp`

- [ ] Test format discovery, capability reporting and unsupported-format diagnostics.
- [ ] Implement an adapter interface with import/export capability flags and provenance.
- [ ] Implement open-format baseline adapters and extension points for SDK/external-converter adapters.
- [ ] Record checksum, source path, importer version and conversion warnings in asset provenance.
- [ ] Run registry tests.
- [ ] Commit `feat: add media import export registry`.

### Task 5: Color science and material system

**Files:**
- Create: `core/color/Color.cpp`
- Create: `core/color/ColorWheel.cpp`
- Create: `core/color/Harmony.cpp`
- Create: `core/material/Material.cpp`
- Create: `core/material/PBR.cpp`
- Create: `tests/color/test_color.cpp`

- [ ] Test RGB/HSL/HSV conversion and complementary/analogous/triadic/tetradic relationships.
- [ ] Implement color-wheel sampling and palette generation.
- [ ] Implement color-space metadata and PBR material channels.
- [ ] Implement exposure/tonemapping hooks and OCIO-compatible metadata boundaries.
- [ ] Run color tests.
- [ ] Commit `feat: add color and material engine`.

### Task 6: Animation, FK/IK, dynamics and VFX interfaces

**Files:**
- Create: `animation/FK.cpp`
- Create: `animation/IK.cpp`
- Create: `animation/Skeleton.cpp`
- Create: `animation/Constraints.cpp`
- Create: `animation/Timeline.cpp`
- Create: `dynamics/DynamicsGraph.cpp`
- Create: `vfx/VFXGraph.cpp`
- Create: `tests/animation/test_animation.cpp`

- [ ] Test FK chain transforms, IK target convergence and timeline interpolation.
- [ ] Implement skeleton hierarchy, constraints and animation clips.
- [ ] Implement pluggable rigid/soft/cloth/particle/fluid/volume solver interfaces.
- [ ] Implement VFX graph nodes and deterministic simulation seeds.
- [ ] Run animation tests.
- [ ] Commit `feat: add animation dynamics and vfx interfaces`.

### Task 7: OpenCV tracking and world-map subsystem

**Files:**
- Create: `computer_vision/OpenCVTracker.cpp`
- Create: `computer_vision/OpticalFlow.cpp`
- Create: `world/WorldMap.cpp`
- Create: `world/Terrain.cpp`
- Create: `tests/cv/test_tracking.cpp`

- [ ] Test tracking interface with synthetic points and deterministic transforms.
- [ ] Implement OpenCV adapter for feature tracking, optical flow and camera calibration.
- [ ] Implement world coordinate systems, terrain tiles and procedural map layers.
- [ ] Add camera/object tracking data import into animation tracks.
- [ ] Run CV/world tests.
- [ ] Commit `feat: add tracking and world systems`.

### Task 8: Native OpenGL desktop viewer

**Files:**
- Create: `desktop/cpp/main.cpp`
- Create: `desktop/cpp/Viewer.cpp`
- Create: `desktop/cpp/RendererGL.cpp`
- Create: `desktop/cpp/CMakeLists.txt`
- Create: `desktop/cpp/build.ps1`
- Create: `desktop/cpp/build.bat`
- Create: `desktop/cpp/build.sh`

- [ ] Test renderer initialization without requiring a full scene.
- [ ] Implement scene loading, camera navigation, mesh rendering and 4D time scrubber.
- [ ] Add shader/material preview and wireframe/NURBS visualization modes.
- [ ] Add Windows/Linux/macOS build scripts.
- [ ] Run native smoke build.
- [ ] Commit `feat: add native opengl viewer`.

### Task 9: Three.js/WebGL browser application

**Files:**
- Create: `web/package.json`
- Create: `web/tsconfig.json`
- Create: `web/src/main.ts`
- Create: `web/src/scene/SceneController.ts`
- Create: `web/src/io/Loaders.ts`
- Create: `web/src/ui/ColorWheel.ts`
- Create: `web/src/workers/geometry.worker.ts`
- Create: `web/index.html`
- Create: `web/build.ps1`
- Create: `web/build.bat`
- Create: `web/build.sh`

- [ ] Test scene initialization and supported loader registration.
- [ ] Implement Three.js scene/view controls and glTF/GLB loading.
- [ ] Add Web Workers for geometry processing and time sampling.
- [ ] Add browser color wheel/material controls and 3D/4D timeline UI.
- [ ] Run npm build and browser smoke tests.
- [ ] Commit `feat: add threejs web viewer`.

### Task 10: Python and Java APIs

**Files:**
- Create: `python/dimensional_studio/scene.py`
- Create: `python/dimensional_studio/color.py`
- Create: `python/dimensional_studio/io.py`
- Create: `python/tests/test_scene.py`
- Create: `java/src/main/java/io/amerhwitat/dimensionalstudio/Scene.java`
- Create: `java/src/main/java/io/amerhwitat/dimensionalstudio/SceneLoader.java`
- Create: `java/build.gradle`

- [ ] Test Python `.d4s` load/save and color relationships.
- [ ] Implement Python scripting/research API over the schema.
- [ ] Implement Java scene-loading/integration API.
- [ ] Run Python and Java tests/builds.
- [ ] Commit `feat: add python and java APIs`.

### Task 11: RNN/LLM learning and ONNX boundary

**Files:**
- Create: `ai/README.md`
- Create: `ai/schema/feature_manifest.json`
- Create: `ai/python/feature_extractor.py`
- Create: `ai/python/rnn_sequence.py`
- Create: `ai/python/train.py`
- Create: `ai/python/export_onnx.py`
- Create: `ai/cpp/OnnxEngine.cpp`
- Create: `ai/web/onnx_engine.ts`
- Create: `tests/ai/test_features.py`

- [ ] Test deterministic extraction of geometry, texture, map and animation features.
- [ ] Implement sequence feature tensors and an RNN model boundary.
- [ ] Implement ONNX export/inference adapters for Python, C++ and web.
- [ ] Add explicit local-training manifests, dataset provenance and opt-in training.
- [ ] Add similarity/recommendation APIs for assets and animation patterns.
- [ ] Run AI tests without requiring a downloaded model.
- [ ] Commit `feat: add local rnn and onnx learning engine`.

### Task 12: Blender/open-source interoperability

**Files:**
- Create: `integrations/blender/README.md`
- Create: `integrations/blender/export_d4s.py`
- Create: `integrations/blender/import_d4s.py`
- Create: `integrations/usd/README.md`
- Create: `integrations/gltf/README.md`

- [ ] Test a minimal `.d4s` round-trip through Blender-compatible glTF data.
- [ ] Implement Blender bridge scripts using documented Python APIs and open formats.
- [ ] Document USD/glTF interoperability and fidelity limits.
- [ ] Run script syntax checks.
- [ ] Commit `feat: add blender interoperability`.

### Task 13: Build, packaging and documentation

**Files:**
- Create: `scripts/build/build-all.ps1`
- Create: `scripts/build/build-all.bat`
- Create: `scripts/build/build-all.sh`
- Create: `scripts/build/build-all.py`
- Create: `scripts/test/test-all.ps1`
- Create: `scripts/test/test-all.sh`
- Create: `docs/USER_GUIDE.md`
- Create: `docs/FORMAT_SUPPORT.md`
- Create: `docs/MULTIDIMENSION_FRAMEWORK.md`
- Create: `docs/AI_ENGINE.md`

- [ ] Test every launcher with a dry-run/help mode.
- [ ] Build native, web, Python and Java targets through one orchestrator.
- [ ] Add dependency discovery and clear missing-tool diagnostics.
- [ ] Document format support, multidimensional model, AI privacy/provenance and build instructions.
- [ ] Commit `build: add cross-platform Dimensional Studio automation`.

### Task 14: BizX integration and verification

**Files:**
- Modify: `README.md`
- Create: `Application/DimensionalStudio/CHANGELOG.md`
- Create: `Application/DimensionalStudio/tests/smoke/README.md`

- [ ] Add the application to the BizX application index without moving existing applications.
- [ ] Run all available native, Python, Java and web tests/builds.
- [ ] Verify no source is copied into existing language directories.
- [ ] Verify license files and third-party notices.
- [ ] Review the complete diff for accidental proprietary material or generated binaries.
- [ ] Commit `docs: integrate Dimensional Studio into BizX`.
