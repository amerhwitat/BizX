# BizX Language Implementations

BizX maintains parallel implementations with matching conceptual subsystem boundaries while keeping source trees independent.

| Language/runtime | Directory | Purpose | Game/application entry |
|---|---|---|---|
| Native VC++ | `desktop/vcpp/` | Standalone Windows desktop | `BizXDesktop.cpp` / `BizXDesktop.sln` |
| C# / WPF | `desktop/dotnet/` | Standalone Windows desktop | `BizX.Desktop/MainWindow.xaml` / solution |
| Node.js | `nodejs/` | Server and integration APIs | `src/game/launcher.js` / `npm start` |
| Java | `java/` | JVM services and enterprise integration | `io.amerhwitat.bizx.GameLauncher` |
| Python | `python/` | Automation, tooling and service integration | `python -m bizx` |
| Browser JavaScript | `javascript/` | Browser-facing implementation | language-native browser entry |
| TypeScript | `typescript/` | Typed browser/application implementation | language-native application entry |

## Desktop targets

The WPF desktop project multi-targets `net48` and `net6.0-windows`. Modern .NET 6 is not named “.NET Framework 6.0”; Microsoft uses `net6.0` for modern .NET and `net48`/`net481` for .NET Framework.

The VC++ desktop project is C++20/MSVC v143, Win32 Unicode, x64, and uses a static runtime for its Release configuration.

## Separation rule

Each language/runtime directory contains only that implementation's source and native build metadata. C++ desktop code is under `desktop/vcpp/`; C# desktop code is under `desktop/dotnet/`. Neither directory imports source files from the other.

## Common conceptual boundaries

The desktop implementations expose application state, score/XP, save/resume, and Hall of Fame entry points while the existing server, browser and service implementations retain their runtime-specific responsibilities.
