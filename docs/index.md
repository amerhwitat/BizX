# BizX — Public Game & Application Hub

BizX is a multi-language application/game platform with desktop, mobile, realtime rendering, wallet boundaries, storyboards and consent-based networking.

## Featured games

- Texas Hold’em Poker — single player and online-ready multiplayer flow
- Blackjack — dealer AI boundary and multiplayer-ready table
- Classic Card Suite — Klondike, FreeCell, Hearts, Spades, Crazy Eights and War
- T-Rex Runner — original arcade runner and high-score flow

## Mobile

- Flutter/Flame: `mobile/flutter/`
- Kotlin Multiplatform: `mobile/kotlin/`
- Original artwork: `mobile/flutter/assets/art/`

## Architecture

Game rules, rendering, saves, wallets and network transport are separated. Private wallet secrets never enter game state or peer messages. Player presence is consent-based and does not expose or persist raw IP addresses or infer exact location.

## Documentation

- [Card Games & T-Rex](CARD_GAMES_AND_TREX.md)
- [Mobile and P2P](MOBILE_AND_P2P.md)
- [Rendering](../rendering/README.md)
- [Game store](../game-store/)

## Repository

[amerhwitat/BizX on GitHub](https://github.com/amerhwitat/BizX)

## Research references

[Flutter Casual Games Toolkit](https://docs.flutter.dev/resources/games-toolkit) • [Kotlin Multiplatform](https://kotlinlang.org/multiplatform/) • [Texas Hold’em rules](https://bicyclecards.com/how-to-play/texas-holdem-poker) • [Blackjack rules](https://bicyclecards.com/how-to-play/blackjack/)
