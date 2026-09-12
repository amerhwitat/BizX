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
| Rendering architecture | [rendering/](rendering/) |
| Multi-chain crypto | [crypto/](crypto/) |
| Game/store/storyboards | [game-store/](game-store/) |
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

## Language-separated architecture

- `desktop/vcpp/` — standalone native Visual C++ Win32 desktop application.
- `desktop/dotnet/` — standalone C# WPF desktop application.
- `Unreal5/BizXUnreal/` — native C++ Unreal Engine 5 runtime plugin boundary.
- `Unity3D/` — Unity-compatible C# data boundary and local UPM package manifest.
- `rendering/` — renderer capability and adapter architecture for realtime engines.
- `crypto/` — chain-agnostic wallet/asset/transaction boundary.
- `game-store/` — license-aware 2D/3D/4D storyboard and game-asset catalog.
- `3D/assets/` — source-controlled, engine-neutral demonstration geometry.
- `nodejs/`, `java/`, `python/`, `javascript/`, `typescript/` — language-separated implementations.
- `docs/` — language-neutral specifications and architecture.

## Unreal Engine 5 / Unity 3D

BizX provides a native Unreal 5 C++ plugin under `Unreal5/BizXUnreal/` and portable Unity data under `Unity3D/`.

## Realtime rendering and open assets

`rendering/` describes realtime adapters for Unreal Engine 5, Godot 4, OGRE, Bevy, bgfx, Filament and Three.js, with capability negotiation for PBR, HDR/IBL, lights, shadows and common 2D/3D formats. `game-store/` adds license-aware discovery of free/low-price 2D, 3D and 4D storyboard content. Publicly reachable material is not assumed reusable; importers must preserve source, license, attribution and SHA-256 metadata.

## Multi-chain crypto

`crypto/` adds an extensible self-custody-first boundary for Bitcoin/UTXO, EVM, Solana, TON and additional chains through adapters. It covers balance discovery, receive addresses, send intents, buy/sell provider intents, swap/exchange quote intents and sweep planning. Live signing is explicitly separated from the game/runtime layer and requires user-controlled confirmation.

The design is informed by public work such as Tether WDK, Wallet Standard/WalletConnect specifications and Uniswap Smart Order Router; no third-party implementation is vendored merely because it is public.

## Licensing

New and modified BizX code is intended for GNU GPL v3 or later. Third-party components, assets, exchange providers and engine SDKs retain their own licenses.

## External documentation citations

- Epic Games, Unreal Engine FBX Content Pipeline: https://dev.epicgames.com/documentation/en-us/unreal-engine/fbx-content-pipeline
- Epic Games, Datasmith Import: https://dev.epicgames.com/documentation/en-us/unreal-engine/importing-datasmith-content-into-unreal-engine
- Unity, AssetPostprocessor: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AssetPostprocessor.html
- Tether WDK: https://wdk.tether.io/
- WalletConnect Specifications: https://github.com/WalletConnect/walletconnect-specs
- Wallet Standard: https://github.com/wallet-standard/wallet-standard
- Uniswap Smart Order Router: https://github.com/Uniswap/smart-order-router
- OpenGameArt: https://opengameart.org/
- Poly Haven license: https://polyhaven.com/license
- Poly Haven API: https://api.polyhaven.com/
