# BizX Standalone Desktop Implementations

BizX now has two isolated Windows desktop implementations. They are intentionally kept in different programming-language subdirectories and do not share source files.

## Native Visual C++

Path: `desktop/vcpp/`

- `BizXDesktop.sln`
- `BizXDesktop.vcxproj`
- `BizXDesktop.cpp`
- Win32 Unicode desktop application
- C++20 / MSVC v143
- x64 Debug and Release
- static MSVC runtime for a self-contained native executable
- local save/resume under `%LOCALAPPDATA%\BizX\save.dat`

Open `desktop/vcpp/BizXDesktop.sln` in Visual Studio with the Desktop development with C++ workload.

## C# desktop

Path: `desktop/dotnet/`

- `BizX.Desktop.sln`
- WPF application
- `net48` compatibility target
- `net6.0-windows` target
- x64 self-contained single-file publishing for the .NET 6 target
- local JSON save/resume under `%LOCALAPPDATA%\BizX\save.json`

The repository uses the correct distinction between modern `.NET 6` (`net6.0`) and `.NET Framework` (`net48`). There is no framework named “.NET Framework 6.0”.

## Source separation

The standalone desktop implementations are independent:

```text
BizX/
  desktop/
    vcpp/       # native C++ only
    dotnet/     # C# / WPF only
```

The existing Node.js, Java, Python, JavaScript, and TypeScript implementations remain in their existing language-specific directories.

## Scope

The desktop baseline provides a standalone application shell with game/application state, score, XP, level, save/resume, and Hall of Fame entry points. It does not replace the existing browser, server, or Unity implementations.
