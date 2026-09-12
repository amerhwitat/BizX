# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## Source-code citation index

| Area | Source |
|---|---|
| Visual C++ desktop | [desktop/vcpp/BizXDesktop.cpp](desktop/vcpp/BizXDesktop.cpp), [BizXDesktop.vcxproj](desktop/vcpp/BizXDesktop.vcxproj), [BizXDesktop.sln](desktop/vcpp/BizXDesktop.sln) |
| C# WPF desktop | [desktop/dotnet/BizX.Desktop/App.xaml](desktop/dotnet/BizX.Desktop/App.xaml), [App.xaml.cs](desktop/dotnet/BizX.Desktop/App.xaml.cs), [MainWindow.xaml](desktop/dotnet/BizX.Desktop/MainWindow.xaml), [MainWindow.xaml.cs](desktop/dotnet/BizX.Desktop/MainWindow.xaml.cs), [BizX.Desktop.csproj](desktop/dotnet/BizX.Desktop/BizX.Desktop.csproj) |
| Node.js | [nodejs/](nodejs/) |
| Java | [java/](java/) |
| Python | [python/](python/) |
| JavaScript | [javascript/](javascript/) |
| TypeScript | [typescript/](typescript/) |
| Kotlin mobile | [kotlin/mobile/](kotlin/mobile/) |
| Swift/Apple | [apple/Sources/BizXApple.swift](apple/Sources/BizXApple.swift), [apple/project.yml](apple/project.yml) |
| Apple automation | [apple/scripts/](apple/scripts/), [apple/fastlane/Fastfile](apple/fastlane/Fastfile) |
| Chimera integration | [chimera/p2p_protocol.json](chimera/p2p_protocol.json), [chimera_installer_integration.json](chimera_installer_integration.json), [chimera_ui_integration.json](chimera_ui_integration.json) |
| Aurora integration | [aurora_integration.json](aurora_integration.json) |
| ISO tool | [ISO-Tool/](ISO-Tool/) |
| Documentation | [docs/](docs/) |

## Language-separated architecture

- `desktop/vcpp/` — standalone native Visual C++ Win32 desktop application.
- `desktop/dotnet/` — standalone C# WPF desktop application targeting `net48` and `net6.0-windows`.
- `nodejs/` — Node.js implementation.
- `java/` — Java implementation.
- `python/` — Python implementation.
- `javascript/` — browser JavaScript implementation.
- `typescript/` — TypeScript implementation.
- `kotlin/mobile/` — Android Kotlin mobile application.
- `apple/` — iOS/iPadOS and macOS SwiftUI/Xcode source boundary.
- `docs/` — language-neutral specifications and architecture.
- `configs/` — language-neutral configuration/schema material.

Each implementation is kept in its own programming-language/runtime directory.

## Mobile communications

BizX Mobile includes synchronized text-conversation state plus microphone, speaker and camera capability detection. The media boundary is WebRTC and chat synchronization uses conversation ID, sender ID, monotonic sequence and SHA-256 payload integrity. Runtime microphone/camera permissions are requested only when the user invokes the relevant feature. See `kotlin/mobile/COMMUNICATIONS.md`.

BizX is the primary business integration target for synchronized IRC-style channels, presence, voice sessions and video sessions shared with BizXtreme and the authenticated Chimera P2P fabric.

## Apple applications

`apple/project.yml` is an XcodeGen specification for iOS and macOS application targets. `apple/Sources/` contains the SwiftUI entry point and application boundary. The complete centralized Objective-C and Flutter companion is maintained in [`general/Apple-Implementations/BizX`](https://github.com/amerhwitat/general/tree/master/Apple-Implementations/BizX). Flutter's Objective-C platform-channel path and Xcode integration are supported upstream. On macOS, install Xcode/XcodeGen, generate the project, then build/archive/export. Signing material is supplied outside Git.

## Standalone Windows desktop applications

Open `desktop/vcpp/BizXDesktop.sln` in Visual Studio. The project is C++20/MSVC v143, x64, Unicode, and uses a static runtime in Release builds.

Open `desktop/dotnet/BizX.Desktop.sln`. The WPF project targets both `net48` and `net6.0-windows`.

See `docs/DESKTOP_CPP_AND_DOTNET.md`.

## Chimera 128D + authenticated P2P

BizX participates in the common Chimera multidimensional application fabric. Application/world state can be represented through the 128D baseline. The optional P2P layer is authenticated and opt-in; it supports capability exchange, request/response, pub/sub, snapshot/delta synchronization, content-addressed state, sequence numbers and payload integrity. It excludes unsolicited scanning, credential exchange, arbitrary executable transfer and remote command execution.

## Mobile build

Use the portfolio automation under `ChimeraIIOS/tools/mobile/` to provision the Android SDK and build debug/release APKs for the related repositories.

## Licensing

New and modified BizX code is intended for GNU GPL v3 or later. Third-party components retain their own licenses.
