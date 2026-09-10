# BizX Game/Application Entry Points

BizX exposes a single native start point for each implemented runtime. The entry points are intentionally thin: they start the application boundary and delegate runtime behavior to the existing API/core services.

## Entry-point matrix

| Runtime | Entry point | Command |
|---|---|---|
| Node.js 20+ | `nodejs/src/game/launcher.js` | `cd nodejs && npm start` |
| Java 17+ | `java/src/main/java/io/amerhwitat/bizx/GameLauncher.java` | `cd java && mvn package && java -cp target/classes io.amerhwitat.bizx.GameLauncher` |
| Python 3.10+ | `python/bizx/game_launcher.py` via `python/bizx/__main__.py` | `cd python && python -m bizx` |
| Browser JavaScript | `javascript/` runtime entry | See the JavaScript implementation documentation |
| TypeScript | `typescript/` runtime entry | See the TypeScript implementation documentation |

## Design contract

1. Each language owns its own launcher.
2. A launcher imports only its language-native implementation.
3. The launcher delegates into the public API/core boundary rather than duplicating business logic.
4. Runtime-specific command-line arguments remain runtime-native.
5. Documentation must keep the launch command synchronized with the package/build metadata.

## Node.js

`npm start` is the canonical Node.js game/application start command. The package also exports the launcher through the `./game` subpath for programmatic use.

```js
import { startGame } from '@amerhwitat/bizx/game';

startGame({ mode: 'default' });
```

## Java

`io.amerhwitat.bizx.GameLauncher` is the canonical JVM entry class.

```bash
mvn package
java -cp target/classes io.amerhwitat.bizx.GameLauncher
```

## Python

`bizx.__main__` delegates to `bizx.game_launcher.main()`, so the package command is the canonical Python entry.

```bash
python -m bizx
```

The launcher can also be invoked as a module:

```bash
python -m bizx.game_launcher
```

## Relationship to BizXtreme

BizXtreme follows the same cross-language launcher contract while adding its game, crypto, WebGL/Three.js, Aurora and Chimera-facing services. See the corresponding `BizXtreme/docs/GAME_ENTRYPOINTS.md` guide.
