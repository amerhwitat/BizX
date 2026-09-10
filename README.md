# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## Language-separated architecture

- `nodejs/` — Node.js 20+ implementation.
- `javascript/` — browser JavaScript implementation.
- `typescript/` — TypeScript implementation.
- `docs/` — language-neutral specifications and architecture.
- `configs/` — language-neutral configuration/schema material.

Source code is organized by programming language first, then by subsystem. This prevents Node.js, browser JavaScript, TypeScript, native, and other implementations from being mixed in the same source directory.

## Node.js

```bash
cd nodejs
npm test
npm start
```

The Node.js implementation is the server/integration foundation and exposes core and wallet provider APIs that can be extended without coupling the runtime to a specific browser or native implementation.
