# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## Source-code citation index

| Area | Source |
|---|---|
| Visual C++ desktop | [desktop/vcpp/](desktop/vcpp/) |
| C# WPF desktop | [desktop/dotnet/](desktop/dotnet/) |
| Unreal Engine 5 C++ | [Unreal5/BizXUnreal/](Unreal5/BizXUnreal/) |
| Unity 3D package/data | [Unity3D/](Unity3D/) |
| Portable 3D assets | [3D/assets/](3D/assets/) |
| Node.js | [nodejs/](nodejs/) |
| Java | [java/](java/) |
| Python | [python/](python/) |
| JavaScript | [javascript/](javascript/) |
| TypeScript | [typescript/](typescript/) |
| Kotlin mobile | [kotlin/mobile/](kotlin/mobile/) |
| Swift/Apple | [apple/](apple/) |
| Chimera integration | [chimera/](chimera/) |
| Aurora integration | [aurora_integration.json](aurora_integration.json) |
| ISO tool | [ISO-Tool/](ISO-Tool/) |
| Documentation | [docs/](docs/) |

Each implementation is kept in its own programming-language/runtime directory and component READMEs provide file-level details.

## Language-separated architecture

- `desktop/vcpp/` — standalone native Visual C++ Win32 desktop application.
- `desktop/dotnet/` — standalone C# WPF desktop application.
- `Unreal5/BizXUnreal/` — native C++ Unreal Engine 5 runtime plugin boundary.
- `Unity3D/` — Unity-compatible C# data boundary and local UPM package manifest.
- `3D/assets/` — source-controlled, engine-neutral demonstration geometry.
- `nodejs/`, `java/`, `python/`, `javascript/`, `typescript/` — language-separated implementations.
- `docs/` — language-neutral specifications and architecture.

## Unreal Engine 5 / Unity 3D

BizX now provides a native Unreal 5 C++ plugin under `Unreal5/BizXUnreal/`. Install it under a project's `Plugins/` directory, regenerate project files and build with the matching Unreal toolchain. The plugin exposes `UBizXWorldData` and `FBizXWorldObject` for Blueprint/C++ world-state integration.

The Unity boundary is under `Unity3D/`. It contains a UPM `package.json` and C# world-object model. Portable geometry is under `3D/assets/`. The same OBJ assets can be imported into supported DCC/engine workflows. Unreal's official documentation covers FBX, glTF and Datasmith import workflows; Unity documents UPM and `AssetPostprocessor` import hooks.

See [`docs/UNREAL5_AND_UNITY3D.md`](docs/UNREAL5_AND_UNITY3D.md).

## Mobile communications

BizX Mobile includes synchronized text-conversation state plus microphone, speaker and camera capability detection. The media boundary is WebRTC and chat synchronization uses conversation ID, sender ID, monotonic sequence and SHA-256 payload integrity.

## Chimera 128D + authenticated P2P

BizX participates in the common Chimera multidimensional application fabric. The optional P2P layer is authenticated and opt-in; it supports capability exchange, request/response, pub/sub, snapshot/delta synchronization, content-addressed state, sequence numbers and payload integrity.

## Licensing

New and modified BizX code is intended for GNU GPL v3 or later. Third-party components and engine SDKs retain their own licenses.

## External documentation citations

- Epic Games, Unreal Engine FBX Content Pipeline: https://dev.epicgames.com/documentation/en-us/unreal-engine/fbx-content-pipeline
- Epic Games, Datasmith Import: https://dev.epicgames.com/documentation/en-us/unreal-engine/importing-datasmith-content-into-unreal-engine
- Epic Games, Datasmith supported formats: https://dev.epicgames.com/documentation/en-us/unreal-engine/datasmith-supported-software-and-file-types
- Unity, Asset Store package formats: https://docs.unity.com/en-us/asset-store/publishing/introduction
- Unity, AssetPostprocessor: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AssetPostprocessor.html
