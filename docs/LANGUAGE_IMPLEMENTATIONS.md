# BizX Language Implementations

BizX maintains parallel implementations with matching subsystem boundaries.

| Language/runtime | Directory | Purpose |
|---|---|---|
| Node.js 20+ | `nodejs/` | Server and integration APIs |
| Java 17+ | `java/` | JVM services and enterprise integration |
| Python 3.10+ | `python/` | Automation, tooling and service integration |
| Browser JavaScript | `javascript/` | Browser-facing implementation |
| TypeScript | `typescript/` | Typed browser/application implementation |

## Separation rule

Each language directory contains only that language's source and its native build/test metadata. Shared architecture, schemas and configuration stay in `docs/` and `configs/`.

## Common boundaries

The implementations converge on core services, wallet/provider requests, catalog, payment lifecycle, API, and CLI behavior. Runtime-specific integrations remain native to the implementation rather than being copied as foreign-language source.

## Verification

Node.js uses `npm test`; Java uses `mvn test`; Python uses `python -m unittest discover -s tests`. CI can run all three independently.
