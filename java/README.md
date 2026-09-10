# BizX Java

Java 17+ implementation of BizX business services and integration boundaries.

## Single-point game entry

`io.amerhwitat.bizx.GameLauncher` is the canonical Java entry point for starting the BizX game/application runtime. It creates the public `BizXApi` boundary and starts the application without coupling Java source to another implementation language.

Build and launch:

```bash
mvn package
java -cp target/classes io.amerhwitat.bizx.GameLauncher
```

## Build and test

```bash
mvn test
```

## Layout

- `src/main/java/io/amerhwitat/bizx/GameLauncher.java` — single-point game/application entry
- `src/main/java/io/amerhwitat/bizx/core` — core health/runtime model
- `src/main/java/io/amerhwitat/bizx/wallet` — wallet provider / JSON-RPC boundary
- `src/main/java/io/amerhwitat/bizx/catalog` — catalog service
- `src/main/java/io/amerhwitat/bizx/payments` — payment lifecycle model
- `src/main/java/io/amerhwitat/bizx/api` — API boundary
- `src/main/java/io/amerhwitat/bizx/cli` — command-line utilities
- `src/test/java` — JUnit tests

Java source is isolated under this directory and does not mix with Node.js, browser JavaScript, TypeScript, Python, or native source. See `../docs/GAME_ENTRYPOINTS.md` for the cross-language launcher contract.
