# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## Language-separated architecture

- `desktop/vcpp/` — standalone native Visual C++ Win32 desktop application.
- `desktop/dotnet/` — standalone C# WPF desktop application targeting `net48` and `net6.0-windows`.
- `nodejs/` — Node.js implementation.
- `java/` — Java implementation.
- `python/` — Python implementation.
- `javascript/` — browser JavaScript implementation.
- `typescript/` — TypeScript implementation.
- `Application/DimensionalStudio/` — standalone 3D/4D modeling, VFX, animation, color, world-building and multidimensional research application.
- `docs/` — language-neutral specifications and architecture.
- `configs/` — language-neutral configuration/schema material.

Each implementation is kept in its own programming-language/runtime directory. Dimensional Studio is additionally isolated under `Application/DimensionalStudio/` and does not move or replace the existing BizX applications.

## Dimensional Studio

Dimensional Studio provides a native `.d4s` scene model, polygon and NURBS geometry foundations, 3D/4D viewing, color-wheel/harmony tools, animation/VFX/tracking interfaces, world-map support, OpenGL native rendering and Three.js/WebGL browser rendering. It includes an adapter architecture for glTF/GLB, USD, OBJ, STL, PLY, Alembic, BVH, COLLADA, FBX and common image/video assets, subject to adapter availability and third-party licensing.

The application incorporates the Library-derived 128D model as computational scene metadata: geometry, time, observer/perspective, light/material, events, objects, information and cognition are represented as eight groups of sixteen axes. It also includes a local-first RNN/ONNX learning boundary for extracting features from geometry, maps, textures, animation and motion graphics.

See `Application/DimensionalStudio/README.md` and its `docs/superpowers/` specification/plan.

## Standalone Windows desktop applications

### Visual C++

Open `desktop/vcpp/BizXDesktop.sln` in Visual Studio. The project is C++20/MSVC v143, x64, Unicode, and uses a static runtime in Release builds. The application has its own game state, score/XP dashboard, save/resume, and Hall of Fame entry point.

### C# / WPF

Open `desktop/dotnet/BizX.Desktop.sln`. The WPF project targets both `net48` and `net6.0-windows`. The .NET 6 target is configured for x64 self-contained single-file publishing.

> Terminology: modern .NET 6 uses `net6.0`; .NET Framework uses TFMs such as `net48`. “.NET Framework 6.0” is not a Microsoft target framework.

See `docs/DESKTOP_CPP_AND_DOTNET.md`.

## Existing runtime entry points

| Runtime | Entry point |
|---|---|
| VC++ desktop | `desktop/vcpp/BizXDesktop.cpp` |
| C# desktop | `desktop/dotnet/BizX.Desktop/MainWindow.xaml` |
| Node.js | `nodejs/src/game/launcher.js` |
| Java | `java/src/main/java/io/amerhwitat/bizx/GameLauncher.java` |
| Python | `python/bizx/game_launcher.py` / `python/bizx/__main__.py` |
| Browser JavaScript | `javascript/` |
| TypeScript | `typescript/` |

The desktop applications are standalone Windows implementations; the other runtimes remain available independently.
