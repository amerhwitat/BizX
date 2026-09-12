# BizX Card Game Rules Manual

This manual is an original implementation guide. It describes standard rules without copying third-party source code or artwork.

## Included games

1. Texas Hold'em Poker
2. Blackjack
3. Klondike Solitaire
4. FreeCell
5. Hearts
6. Spades
7. Crazy Eights
8. War
9. Go Fish
10. Gin Rummy
11. Cribbage
12. Baccarat
13. Euchre
14. Canasta
15. Pinochle
16. Old Maid

## Texas Hold'em
Each player receives two private cards. Five community cards are revealed as flop, turn and river. Players use the strongest five-card poker hand available from their private and community cards. Betting uses configurable play-money chips; online play must be server-authoritative.

## Blackjack
The player and dealer receive two cards. Number cards count at face value, face cards count ten, and aces count one or eleven. The objective is to reach 21 or get closer than the dealer without exceeding 21. Dealer draw rules are configurable and displayed before play.

## Solitaire / FreeCell
Single-player games use deterministic deal seeds when requested, support undo/redo where the variant permits it, and record elapsed time, moves and completion state.

## Hearts / Spades
Trick-taking games use four players, with system opponents for solo play and synchronized turns for online play. Rules such as passing in Hearts and bidding/trump in Spades are configurable presets.

## Crazy Eights / War / Go Fish
Turn-based shedding, comparison and collection games use explicit legal-move validation and a visible turn indicator.

## Gin Rummy / Cribbage / Baccarat / Euchre / Canasta / Pinochle / Old Maid
Each game is represented by a rules module and a game-state serializer. Variants are data-driven so house rules can be selected without modifying the core engine.

## Multiplayer
Network messages contain game ID, match ID, sequence number, public state delta and action intent. Private hands are never broadcast to unauthorized clients. The server or host validates actions and resolves randomness from a committed seed.

## Responsible play
These implementations use virtual points/chips only. No real-money wagering, gambling deposits, withdrawals or financial settlement is part of the game engine.

## Sources and implementation notes
The implementation was informed by publicly documented game conventions and Flutter's official card-game template architecture. External code and artwork are not copied into BizX. See `docs/CARD_GAMES_AND_TREX.md` and the repository README for citations.
