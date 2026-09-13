# BizX Node.js / JavaScript

Unified Node.js implementation of the BizX application contracts. The `src/unified` runtime brings the requested game, NetworkUnified, UnifiedGame launcher, InternetScanner, AssetBrowser, crypto, web, 3D, game-assets, game-store, network, rendering and scripts capabilities into one JavaScript runtime while preserving the original feature-specific implementations elsewhere in the repository.

## Requirements
- Node.js 20+

Node.js supports stable ECMAScript modules and provides standard cryptographic, HTTP/HTTPS, networking and Web APIs; BizX uses those platform primitives rather than implementing cryptographic primitives from scratch. citeturn0search0turn0search2turn0search3

## One application entry point

```bash
cd nodejs
npm start
```

The canonical launcher is `src/unified/launcher.js`.

Useful commands:

```bash
npm run health
npm run manifest
npm test
npm run lint
```

## Public API

```js
import { createUnifiedBizX, Vector3, PerspectiveCamera } from '@amerhwitat/bizx';

const app = createUnifiedBizX();
console.log(app.health());
```

## Integrated areas

- Game and game launcher
- NetworkUnified and network services
- UnifiedGame launcher boundary
- InternetScanner with explicit authorization
- AssetBrowser with HTTPS-only metadata access
- Crypto and non-custodial transaction intents
- Web/API route contracts
- 3D vectors and perspective projection
- Game asset catalog
- Game store/catalog
- Rendering capability model
- Build/test/runtime script registry

See `docs/FEATURE_CONVERSION_MAP.md` for the source-to-JavaScript conversion map.
