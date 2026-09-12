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
Use the repository's original vector card renderer and asset manifest. Keep art independent of rules so every language can share the same visual specification.

## Module 7 — QA
Test deterministic seeds, legal moves, scoring, serialization, replay, reconnect, malformed packets, and private-information boundaries.

## Module 8 — Release
Run the language-specific build scripts, validate dependency licenses, generate release manifests, and publish only assets whose licenses permit redistribution.
