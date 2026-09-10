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

## Single-point game entry

Each supported runtime has a language-native game/application launcher. The launchers expose the same conceptual flow—start the BizX application from one runtime entry point, then delegate into that runtime's API/core boundary—without mixing source languages.

| Runtime | Single entry point | Start command |
|---|---|---|
| Node.js 20+ | `nodejs/src/game/launcher.js` | `npm start` from `nodejs/` |
| Java 17+ | `java/src/main/java/io/amerhwitat/bizx/GameLauncher.java` | `java -cp target/classes io.amerhwitat.bizx.GameLauncher` after `mvn package` |
| Python 3.10+ | `python/bizx/game_launcher.py` / `python/bizx/__main__.py` | `python -m bizx` from `python/` |
| Browser JavaScript | language-native browser entry | see `javascript/` documentation |
| TypeScript | language-native application entry | see `typescript/` documentation |

See [`docs/GAME_ENTRYPOINTS.md`](docs/GAME_ENTRYPOINTS.md) for the complete launcher contract and runtime matrix.

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
mvn package
java -cp target/classes io.amerhwitat.bizx.GameLauncher
```

## Python

```bash
cd python
python -m unittest discover -s tests
python -m bizx
```

Each implementation exposes stable core and integration boundaries so Chimera II OS and BizXtreme can consume services without coupling to one implementation language.
