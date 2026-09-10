# BizX Node.js

Node.js implementation of the BizX core and integration boundary.

## Requirements
- Node.js 20+

## Single-point game entry

The canonical Node.js launcher is `src/game/launcher.js`. `npm start` delegates directly to this launcher, so the game/application can be started from one runtime-specific command.

```bash
cd nodejs
npm start
```

The launcher also accepts an optional mode argument:

```bash
npm start -- arcade
```

Programmatic consumers can import the same entry boundary:

```js
import { startGame } from '@amerhwitat/bizx/game';

const result = startGame({ mode: 'default' });
```

## Test

```bash
npm test
```

## Layout
- `src/core` — language-native BizX core
- `src/wallet` — provider abstraction
- `src/game/launcher.js` — single-point game/application entry
- `src/index.js` — public API
- `test` — Node.js tests

The Node.js tree is intentionally isolated from other programming-language implementations. Browser JavaScript/TypeScript and native implementations belong in their respective language directories. See `../docs/GAME_ENTRYPOINTS.md` for the cross-language launcher contract.
