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
| Client/server/host networking | [network/ClientServerNetwork.md](network/ClientServerNetwork.md) |
| Node.js | [nodejs/](nodejs/) |
| Java | [java/](java/) |
| Python | [python/](python/) |
| JavaScript | [javascript/](javascript/) |
| TypeScript | [typescript/](typescript/) |
| Apple/Swift | [apple/](apple/) |
| Documentation | [docs/](docs/) |

## Mobile game hub

The starting menu now includes Texas Hold’em Poker, Blackjack, a Classic Card Suite (Klondike, FreeCell, Hearts, Spades, Crazy Eights and War), and an original T-Rex Runner alongside the existing 2D/3D/4D worlds, wallet, saves, hall of fame, store and peer-presence features.

## Artwork and game flow

Original vector artwork is stored under `mobile/flutter/assets/art/`. Game flow and catalog metadata live in `game-store/storyboards/card-games-and-trex.json`. Card rendering is data-driven from a standard deck model.

## Saves, backups and wallets

Game saves and snapshots are separated from wallet secrets. Recovery phrases/private keys must remain in platform secure storage or a user-controlled wallet provider and never enter logs, screenshots, save files, telemetry or P2P traffic.

## P2P, presence and client/server networking

`network/PeerPresencePolicy.md` defines consent-based peer presence. `network/ClientServerNetwork.md` adds client, server, host and hybrid operation alongside P2P. Users configure networking from the existing application, choose a nickname and avatar, and can upload a local PNG/JPEG/WebP avatar when built-in choices are unavailable. Host mode runs a local client against the embedded server so the host follows the same routing and authorization path as remote users.

## Public release

`docs/index.md` is the public project landing page source and is suitable for GitHub Pages. A workflow is included under `.github/workflows/publish-docs.yml`; enabling GitHub Pages for the repository will publish the documentation site.

## External documentation citations

- Flutter Games: https://flutter.dev/games
- Flutter Games Toolkit: https://docs.flutter.dev/resources/games-toolkit
- Flame: https://github.com/flame-engine/flame
- Kotlin Multiplatform: https://kotlinlang.org/docs/multiplatform.html
- Texas Hold’em rules: https://bicyclecards.com/how-to-play/texas-holdem
- Blackjack rules: https://bicyclecards.com/how-to-play/blackjack/
- Tether WDK: https://wdk.tether.io/
- WalletConnect Specifications: https://github.com/WalletConnect/walletconnect-specs
- Wallet Standard: https://github.com/wallet-standard/wallet-standard
- OpenGameArt: https://opengameart.org/
- Poly Haven license: https://polyhaven.com/license
- Poly Haven API: https://api.polyhaven.com/
