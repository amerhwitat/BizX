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
- `kotlin/mobile/` — Android Kotlin mobile application.
- `docs/` — language-neutral specifications and architecture.
- `configs/` — language-neutral configuration/schema material.

Each implementation is kept in its own programming-language/runtime directory.

## Mobile communications

BizX Mobile now includes synchronized text-conversation state plus microphone, speaker and camera capability detection. The media boundary is WebRTC and the chat synchronization contract uses conversation ID, sender ID, monotonic sequence and SHA-256 payload integrity. Runtime microphone/camera permissions are requested only when the user invokes the relevant feature. See [`kotlin/mobile/COMMUNICATIONS.md`](kotlin/mobile/COMMUNICATIONS.md).

BizX is the primary business integration target for synchronized IRC-style channels, presence, voice sessions and video sessions shared with BizXtreme and the authenticated Chimera P2P fabric.

## Standalone Windows desktop applications

### Visual C++

Open `desktop/vcpp/BizXDesktop.sln` in Visual Studio. The project is C++20/MSVC v143, x64, Unicode, and uses a static runtime in Release builds.

### C# / WPF

Open `desktop/dotnet/BizX.Desktop.sln`. The WPF project targets both `net48` and `net6.0-windows`.

See [`docs/DESKTOP_CPP_AND_DOTNET.md`](docs/DESKTOP_CPP_AND_DOTNET.md).

## Chimera 128D + authenticated P2P

BizX participates in the common Chimera multidimensional application fabric. Application/world state can be represented through the 128D baseline. The optional P2P layer is authenticated and opt-in; it supports capability exchange, request/response, pub/sub, snapshot/delta synchronization, content-addressed state, sequence numbers and payload integrity. It excludes unsolicited scanning, credential exchange, arbitrary executable transfer and remote command execution.

## Mobile build

Use the portfolio automation under `ChimeraIIOS/tools/mobile/` to provision the Android SDK and build debug/release APKs for the related repositories.

## Licensing

New and modified BizX code is intended for GNU GPL v3 or later. Third-party components retain their own licenses.
