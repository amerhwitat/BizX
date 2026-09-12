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
- `docs/` — language-neutral specifications and architecture.
- `configs/` — language-neutral configuration/schema material.

Each implementation is kept in its own programming-language/runtime directory. The native C++ and C# desktop implementations do not share source files with one another or with the other runtimes.

## Standalone Windows desktop applications

### Visual C++

Open `desktop/vcpp/BizXDesktop.sln` in Visual Studio. The project is C++20/MSVC v143, x64, Unicode, and uses a static runtime in Release builds. The application has its own game state, score/XP dashboard, save/resume, and Hall of Fame entry point.

### C# / WPF

Open `desktop/dotnet/BizX.Desktop.sln`. The WPF project targets both `net48` and `net6.0-windows`. The .NET 6 target is configured for x64 self-contained single-file publishing.

> Terminology: modern .NET 6 uses `net6.0`; .NET Framework uses TFMs such as `net48`. “.NET Framework 6.0” is not a Microsoft target framework.

See [`docs/DESKTOP_CPP_AND_DOTNET.md`](docs/DESKTOP_CPP_AND_DOTNET.md).

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

## Chimera 128D + authenticated P2P

BizX now participates in the common Chimera multidimensional application fabric. Application/world state can be represented through the 128D baseline: geometry, temporal state, observer/perspective, light/material response, events, objects, properties and interaction rules, plus an extensible perception/cognition overlay.

The optional P2P layer is authenticated and opt-in. It supports capability exchange, request/response, pub/sub, snapshot/delta synchronization, content-addressed state, sequence numbers and payload integrity. The protocol does not perform unsolicited network scanning, credential exchange, arbitrary executable transfer or remote command execution.

All language implementations should serialize the same logical state envelope while using native networking facilities. See [`docs/CHIMERA_128D_P2P_INTEGRATION.md`](docs/CHIMERA_128D_P2P_INTEGRATION.md).

## Licensing

New and modified BizX code is intended for GNU GPL v3 or later. Third-party components retain their own licenses. See the repository `LICENSE` file and the GNU GPLv3 terms.
