# BizX Chess & Strategy

A language-neutral contract for chess and deterministic strategy games.

## Chess

- Legal move model and FEN/PGN import/export
- UCI engine adapter
- Stockfish adapter boundary
- clocks, puzzles, analysis and replay
- chess variants through a rule-provider interface
- multiplayer messages through NetworkUnified

Stockfish 19 is the current research target; Stockfish is open-source GPLv3 and cross-platform. python-chess supplies a mature Python rules/protocol reference. Lichess publishes open-source chess rules, UI and browser-engine components.

## Strategy

- deterministic fixed-turn simulation
- resources, production and trade
- territory and logistics
- diplomacy and reputation
- technology/research trees
- fog-of-war and information-state separation
- AI policy interface
- deterministic replay and network synchronization

The rules are original BizX content. No proprietary game code, maps, assets, stories or scripts are copied.

## Integration

Each language directory gets a native adapter under its existing application tree. The shared JSON contract in `games/chess-strategy/contracts.json` is the interoperability source of truth.
