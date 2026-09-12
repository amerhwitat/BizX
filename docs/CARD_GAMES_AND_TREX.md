# BizX Card Games & T-Rex

## Included

The mobile launcher now exposes:

- Texas Hold’em Poker
- Blackjack
- Classic Card Suite: Klondike Solitaire, FreeCell, Hearts, Spades, Crazy Eights, War
- T-Rex Runner

Each game has a catalog entry describing its flow, supported modes and asset policy. The Flutter implementation contains reusable 52-card/deck primitives, Poker round progression, Blackjack scoring, and a T-Rex runner state model. Kotlin Multiplatform exposes the same game catalog to Android/iOS shared logic.

## Game flow

### Texas Hold’em
`lobby → deal → pre-flop → flop → turn → river → showdown → result → save`

The implementation follows the conventional Hold’em structure: two private hole cards, five community cards, betting intervals, and a best-five-card showdown. Rules were independently reimplemented from public rule references rather than copied from a third-party codebase. See [Bicycle Cards: Texas Hold’em](https://bicyclecards.com/how-to-play/texas-holdem-poker).

### Blackjack
`table → deal → hit/stand → dealer action → result → save`

Aces are evaluated as 1 or 11 and face cards as 10. The dealer follows the documented hit-until-17 convention in the rules profile. See [Bicycle Cards: Blackjack](https://bicyclecards.com/how-to-play/blackjack/).

### Classic cards
The catalog reserves a common engine boundary for Solitaire, FreeCell, Hearts, Spades, Crazy Eights and War. Individual rule modules can be added without changing the launcher, save format or networking boundary. Bicycle Cards provides public rules references for many of these games: https://bicyclecards.com/how-to-play.

### T-Rex Runner
`launch → run → jump → obstacle → score → hall-of-fame`

The runner uses original BizX gameplay/state code and original vector artwork. It does not copy Google's Chrome game assets or source.

## Artwork

Original vector artwork is stored under `mobile/flutter/assets/art/`:

- `splash.svg`
- `card_deck.svg`

The Flutter UI also renders cards from data so the deck remains resolution-independent. Future illustrated face cards can be added as license-cleared or original asset packs without changing gameplay logic.

## Single-player and online multiplayer

Single-player modes use deterministic game state plus local AI/action boundaries. Multiplayer uses a transport adapter boundary; the current presence policy is consent-based and does not expose or persist raw player IP addresses or infer exact locations.

Online wagering for real money is intentionally not part of the game engine. Wallet functionality remains a separate provider boundary and private keys/recovery phrases never enter gameplay state, saves, screenshots, telemetry or P2P messages.

## Mobile implementation

Flutter's official Casual Games Toolkit explicitly includes a card-game template with game-state management and multiplayer integration hooks, while Flame is intended for real-time 2D game loops. Kotlin Multiplatform supports shared Android/iOS logic. These sources informed the architecture, not copied implementation code.

- https://docs.flutter.dev/resources/games-toolkit
- https://flutter.dev/blog/building-your-next-casual-game-with-flutter
- https://kotlinlang.org/multiplatform/

## Licensing and provenance

Publicly reachable game logic, artwork or repositories are not automatically licensed for redistribution. BizX/BizXtreme use clean-room implementations for gameplay rules and require explicit license metadata for imported third-party assets. Source URLs, license/attribution metadata and integrity information should accompany imported assets.
