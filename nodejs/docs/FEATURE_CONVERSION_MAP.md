# BizX source-to-Node.js/JavaScript conversion map

The Node.js directory is the canonical JavaScript runtime integration point. Existing source-language implementations remain intact; this layer converts their application contracts into JavaScript modules rather than mechanically translating engine-specific syntax.

| BizX source area | Node.js/JavaScript integration |
|---|---|
| game | `src/game/launcher.js` + unified runtime |
| NetworkUnified | `NetworkUnified` |
| UnifiedGame/launcher/python | `src/unified/launcher.js` |
| InternetScanner | `InternetScanner` with explicit authorization |
| AssetBrowser | HTTPS metadata boundary |
| crypto | `CryptoService` and transaction-intent boundary |
| web | `WebService` route contract |
| 3D | `Vector3`, `PerspectiveCamera` |
| game-assets | `AssetCatalog` |
| game-store | `GameStore` |
| network | `NetworkUnified` |
| rendering | `RenderingService` capability contract |
| scripts | `ScriptService` command registry |

## Security boundaries

Crypto remains non-custodial by default: transaction intents are unsigned and mainnet execution is not enabled by this facade. Secrets must not be placed in logs or game state. Network scanning is authorization-aware and does not provide an unrestricted scanning primitive.

## Runtime model

Node.js uses ECMAScript modules (`type: module`) and the built-in `node:crypto` and HTTPS APIs where appropriate. Node's official documentation describes ESM as a stable module format and `node:crypto` as the standard cryptographic API. The implementation therefore favors standard runtime primitives over custom cryptography.
