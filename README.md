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
| Mobile Kotlin | [mobile/kotlin/](mobile/kotlin/) |
| Mobile Flutter | [mobile/flutter/](mobile/flutter/) |
| P2P/presence policy | [network/](network/) |
| Node.js | [nodejs/](nodejs/) |
| Java | [java/](java/) |
| Python | [python/](python/) |
| JavaScript | [javascript/](javascript/) |
| TypeScript | [typescript/](typescript/) |
| Apple/Swift | [apple/](apple/) |
| Documentation | [docs/](docs/) |

## Mobile game hub

`mobile/kotlin/` provides a Kotlin Multiplatform boundary for shared Android/iOS logic. `mobile/flutter/` provides a Flutter/Flame multiplatform game shell. The starting menu covers 2D storyboard games, 3D worlds, 4D time-indexed worlds, wallet setup, backup/snapshot workflows, saves, high scores and peer presence.

Flutter's official Games Toolkit provides open-source multiplatform 2D game templates and Flame provides a modular Flutter game engine for mobile, desktop and web. Kotlin Multiplatform supports shared Android/iOS code and Compose Multiplatform UI.

## Saves, backups and wallets

Game saves and snapshots are separated from wallet secrets. Recovery phrases/private keys must remain in platform secure storage or a user-controlled wallet provider and never enter logs, screenshots, save files, telemetry or P2P traffic. Backup manifests contain metadata/references rather than secret material.

## P2P and presence

`network/PeerPresencePolicy.md` defines consent-based peer presence. The game may show connected/disconnected state and a random peer ID during runtime. It must not expose or persist raw IP addresses to other players and must not infer exact location from IP. A player may optionally publish a coarse self-selected region.

## Open storyboard/game resources

`game-store/storyboards/` contains license-gated templates. Public availability does not imply reuse rights. Each imported asset must retain source URL, asset ID, license, attribution and integrity metadata. Do not bulk-scrape or redistribute copyrighted material.

## External documentation citations

- Flutter Games: https://flutter.dev/games
- Flutter Games Toolkit: https://docs.flutter.dev/resources/games-toolkit
- Flame: https://github.com/flame-engine/flame
- Kotlin Multiplatform: https://kotlinlang.org/docs/multiplatform.html
- Android Kotlin Multiplatform: https://developer.android.com/kotlin/multiplatform
- Tether WDK: https://wdk.tether.io/
- WalletConnect Specifications: https://github.com/WalletConnect/walletconnect-specs
- Wallet Standard: https://github.com/wallet-standard/wallet-standard
- Uniswap Smart Order Router: https://github.com/Uniswap/smart-order-router
- OpenGameArt: https://opengameart.org/
- Poly Haven license: https://polyhaven.com/license
- Poly Haven API: https://api.polyhaven.com/
