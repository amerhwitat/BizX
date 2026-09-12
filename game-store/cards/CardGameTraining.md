# BizX Card Games Developer Training Manual

## Module 1 — Architecture
Start at the launcher, select a game, create a rules state, attach a renderer, and persist a snapshot. Never put rules in widgets or rendering code.

## Module 2 — Deck model
A standard deck is represented by `Suit` and `Rank`. Shuffle and draw operations must use an injectable random source so tests and replay systems can reproduce a match.

## Module 3 — Rules engine
Implement each legal action as a pure state transition. Reject illegal actions before persistence or network transmission.

## Module 4 — Solo AI
Bots consume public state and their own private information. Difficulty changes policy selection, not the rules.

## Module 5 — Multiplayer
Clients send intents; the authoritative host/server resolves them. Sequence numbers prevent duplicate actions. Reconnect from snapshots.

## Module 6 — Art and UI
The preferred deck is the license-verified OpenDecks Public Domain / CC0 deck. Fetch it with the platform script under `mobile/flutter/scripts/`, preserve its license/readme, and keep the fallback renderer available. Art remains independent of rules so every language can share the same asset manifest.

## Module 7 — QA
Test deterministic seeds, legal moves, scoring, serialization, replay, reconnect, malformed packets, and private-information boundaries. Also test both the downloaded-art and missing-art fallback paths.

## Module 8 — Release
Run the language-specific build scripts, validate dependency and asset licenses, generate release manifests, and publish only assets whose licenses permit redistribution.

## Asset references
- OpenDecks CC0 deck: https://github.com/AustinGabriel/OpenDecks-Public-Domain-and-CC0-Playing-Cards
- Kenney Playing Cards Pack: https://kenney.nl/assets/playing-cards-pack
- OpenGameArt Cards: https://opengameart.org/content/cards-0
