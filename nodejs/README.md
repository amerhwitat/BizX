# BizX Node.js

Node.js implementation of the BizX core and integration boundary.

## Requirements
- Node.js 20+

## Run
```bash
npm test
npm start
```

## Layout
- `src/core` — language-native BizX core
- `src/wallet` — provider abstraction
- `src/index.js` — public API
- `test` — Node.js tests

The Node.js tree is intentionally isolated from other programming-language implementations. Browser JavaScript/TypeScript and native implementations belong in their respective language directories.
