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
| Card games & T-Rex | [docs/CARD_GAMES_AND_TREX.md](docs/CARD_GAMES_AND_TREX.md) |
| Public release landing page | [docs/index.md](docs/index.md) |
| Node.js | [nodejs/](nodejs/) |
| Java | [java/](java/) |
| Python | [python/](python/) |
| JavaScript | [javascript/](javascript/) |
| TypeScript | [typescript/](typescript/) |
| Apple/Swift | [apple/](apple/) |
| Documentation | [docs/](docs/) |

## Mobile game hub

The starting menu now includes Texas Hold’em Poker, Blackjack, a Classic Card Suite (Klondike, FreeCell, Hearts, Spades, Crazy Eights and War), and an original T-Rex Runner alongside the existing 2D/3D/4D worlds, wallet, saves, hall of fame, store and peer-presence features.

Flutter's official Games Toolkit includes a card-game template with game-state management and multiplayer integration hooks; Flame is suitable for real-time 2D loops. Kotlin Multiplatform provides shared Android/iOS logic. These references informed architecture; third-party source was not copied.

## Artwork and game flow

Original vector artwork is stored under `mobile/flutter/assets/art/`. Game flow and catalog metadata live in `game-store/storyboards/card-games-and-trex.json`. Card rendering is data-driven from a standard deck model.

## Saves, backups and wallets

Game saves and snapshots are separated from wallet secrets. Recovery phrases/private keys must remain in platform secure storage or a user-controlled wallet provider and never enter logs, screenshots, save files, telemetry or P2P traffic.

## P2P and presence

`network/PeerPresencePolicy.md` defines consent-based peer presence. Connected/disconnected state can be shown during a session using a random peer ID. Raw IP addresses are not exposed or persisted in player profiles and exact location is not inferred from IP.

## Public release

`docs/index.md` is the public project landing page source and is suitable for GitHub Pages. A workflow is included under `.github/workflows/publish-docs.yml`; enabling GitHub Pages for the repository will publish the documentation site.

## External documentation citations

- Flutter Games: https://flutter.dev/games
- Flutter Games Toolkit: https://docs.flutter.dev/resources/games-toolkit
- Flame: https://github.com/flame-engine/flame
- Kotlin Multiplatform: https://kotlinlang.org/docs/multiplatform.html
- Texas Hold’em rules: https://bicyclecards.com/how-to-play/texas-holdem-poker
- Blackjack rules: https://bicyclecards.com/how-to-play/blackjack/
- Tether WDK: https://wdk.tether.io/
- WalletConnect Specifications: https://github.com/WalletConnect/walletconnect-specs
- Wallet Standard: https://github.com/wallet-standard/wallet-standard
- OpenGameArt: https://opengameart.org/
- Poly Haven license: https://polyhaven.com/license
- Poly Haven API: https://api.polyhaven.com/
