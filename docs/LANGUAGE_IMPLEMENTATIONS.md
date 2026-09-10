# BizX Language Implementations

BizX maintains parallel implementations with matching subsystem boundaries and a consistent single-point application launch contract.

| Language/runtime | Directory | Purpose | Game/application entry |
|---|---|---|---|
| Node.js 20+ | `nodejs/` | Server and integration APIs | `src/game/launcher.js` / `npm start` |
| Java 17+ | `java/` | JVM services and enterprise integration | `io.amerhwitat.bizx.GameLauncher` |
| Python 3.10+ | `python/` | Automation, tooling and service integration | `python -m bizx` |
| Browser JavaScript | `javascript/` | Browser-facing implementation | language-native browser entry |
| TypeScript | `typescript/` | Typed browser/application implementation | language-native application entry |

## Single-point launch contract

Each runtime owns its launcher and delegates into that runtime's native API/core boundary. Launchers must not import source from another programming-language tree. This keeps runtime dependencies explicit while presenting a common conceptual start operation.

The currently implemented server/service launchers are:

- Node.js: `nodejs/src/game/launcher.js`, wired to `npm start`.
- Java: `java/src/main/java/io/amerhwitat/bizx/GameLauncher.java`.
- Python: `python/bizx/game_launcher.py`, exposed as `python -m bizx` through `python/bizx/__main__.py`.

Browser JavaScript and TypeScript remain runtime-specific and should follow the same contract when their application entrypoints are extended.

## Separation rule

Each language directory contains only that language's source and its native build/test metadata. Shared architecture, schemas and configuration stay in `docs/` and `configs/`.

## Common boundaries

The implementations converge on core services, wallet/provider requests, catalog, payment lifecycle, API, and CLI behavior. Runtime-specific integrations remain native to the implementation rather than being copied as foreign-language source.

## Verification

Node.js uses `npm test`; Java uses `mvn test`; Python uses `python -m unittest discover -s tests`. The launcher smoke paths are documented alongside each implementation and in `GAME_ENTRYPOINTS.md`.
