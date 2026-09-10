# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## Language-separated architecture

- `nodejs/` — Node.js 20+ implementation.
- `java/` — Java 17+ implementation using Maven.
- `python/` — Python 3.10+ implementation.
- `javascript/` — browser JavaScript implementation.
- `typescript/` — TypeScript implementation.
- `docs/` — language-neutral specifications and architecture.
- `configs/` — language-neutral configuration/schema material.

Source code is organized by programming language first, then by subsystem. Java and Python are first-class implementations alongside Node.js; browser and native implementations remain isolated from server/runtime source.

## Node.js

```bash
cd nodejs
npm test
npm start
```

## Java

```bash
cd java
mvn test
```

## Python

```bash
cd python
python -m unittest discover -s tests
```

Each implementation exposes stable core and integration boundaries so Chimera II OS and BizXtreme can consume services without coupling to one implementation language.
