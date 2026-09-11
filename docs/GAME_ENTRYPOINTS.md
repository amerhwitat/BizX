# BizX Game/Application Entry Points

BizX exposes a native start point for each implemented runtime. Source remains separated by language.

## Entry-point matrix

| Runtime | Entry point | Command |
|---|---|---|
| Native VC++ | `desktop/vcpp/BizXDesktop.cpp` | Open `desktop/vcpp/BizXDesktop.sln` and Build x64 |
| C# / WPF | `desktop/dotnet/BizX.Desktop/MainWindow.xaml` | Open `desktop/dotnet/BizX.Desktop.sln` and Build x64 |
| Node.js | `nodejs/src/game/launcher.js` | `cd nodejs && npm start` |
| Java | `java/src/main/java/io/amerhwitat/bizx/GameLauncher.java` | `cd java && mvn package && java -cp target/classes io.amerhwitat.bizx.GameLauncher` |
| Python | `python/bizx/game_launcher.py` via `python/bizx/__main__.py` | `cd python && python -m bizx` |
| Browser JavaScript | `javascript/` runtime entry | See JavaScript documentation |
| TypeScript | `typescript/` runtime entry | See TypeScript documentation |

## Desktop targets

The C# desktop solution uses `net48` plus `net6.0-windows`. Microsoft distinguishes modern .NET TFMs such as `net6.0` from .NET Framework TFMs such as `net48`; “.NET Framework 6.0” is not a valid TFM.

The native VC++ edition is a standalone Win32 Unicode x64 application using C++20/MSVC v143. The C# edition is a standalone WPF application; its .NET 6 target can be published self-contained and single-file for Windows x64.

## Design contract

1. Each language owns its launcher.
2. C++ and C# desktop implementations do not share source files.
3. Existing Node.js, Java, Python, JavaScript and TypeScript implementations remain independently buildable.
4. Runtime-specific arguments remain runtime-native.
5. Documentation and build metadata must stay synchronized.
