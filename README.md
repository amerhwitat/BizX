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

## Build and run

### Windows / all detected targets

```bat
build-tools\build.bat
```

PowerShell:

```powershell
.\build-tools\build.ps1
```

### Visual C++

Open `desktop/vcpp/BizXDesktop.sln` in Visual Studio, or use the repository MSVC build script. The project is C++20/MSVC v143, x64 and Unicode.

### C# / WPF

```powershell
dotnet build desktop\dotnet\BizX.Desktop.sln -c Release
```

### Node.js

```bash
cd nodejs
npm ci
npm test
node src/game/launcher.js
```

### Java

```bash
cd java
mvn test
```

### Python

```bash
python -m pip install -r python/requirements.txt
python python/bizx/game_launcher.py
```

If a Python executable is desired, use the repository PyInstaller builder; packaging is performed on the target operating system.

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
