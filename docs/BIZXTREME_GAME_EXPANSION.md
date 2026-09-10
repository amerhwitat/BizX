# BizX / BizXtreme Game Expansion Contract

BizX provides the commerce and wallet integration boundary while BizXtreme remains the gameplay client.

## New game systems

- professional game dashboard/main menu
- Missions, Events, Inventory and Marketplace
- free Frontier Starter Pack
- Living Frontier campaign chapters
- rotating weekly/monthly/seasonal events
- cosmetics, boosts, inventory upgrades and expedition equipment
- BTC and multi-chain wallet integration

## Single-point runtime launch

BizX and BizXtreme expose language-native single-point game/application launchers. The launcher is the runtime entry, not a second implementation of the game systems.

For BizX, see `docs/GAME_ENTRYPOINTS.md`. For BizXtreme, see `BizXtreme/docs/GAME_ENTRYPOINTS.md`.

The implemented server/service entry points are:

- Node.js: `src/game/launcher.js` through `npm start`.
- Java: `GameLauncher` through the JVM classpath.
- Python: `python -m bizx` or `python -m bizxtreme`.

Browser JavaScript, TypeScript and Unity/C# continue to use their native application lifecycle. This keeps the shared game contract platform-neutral while avoiding cross-language source duplication.

## Commerce invariant

A blockchain transaction is never treated as direct permission to execute arbitrary game code. The flow is catalog -> quote -> wallet connection -> payment preview -> user signing -> broadcast -> independent confirmation -> entitlement/fulfillment.

## Security invariant

Private keys and recovery phrases stay within a user-controlled wallet boundary. BizX services should only process public wallet identifiers and verification data needed for the requested operation.

## Cross-platform contract

The shared layer is platform-neutral. Native wallet implementations are selected per target while the game uses the same high-level contracts for WebGL, Windows, macOS, Linux, Android and iOS.
