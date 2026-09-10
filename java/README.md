# BizX Java

Java 17+ implementation of BizX business services and integration boundaries.

## Build and test

```bash
mvn test
```

## Layout

- `src/main/java/io/amerhwitat/bizx/core` — core health/runtime model
- `src/main/java/io/amerhwitat/bizx/wallet` — wallet provider / JSON-RPC boundary
- `src/main/java/io/amerhwitat/bizx/catalog` — catalog service
- `src/main/java/io/amerhwitat/bizx/payments` — payment lifecycle model
- `src/main/java/io/amerhwitat/bizx/api` — API boundary
- `src/main/java/io/amerhwitat/bizx/cli` — command-line entry point
- `src/test/java` — JUnit tests

Java source is isolated under this directory and does not mix with Node.js, browser JavaScript, TypeScript, Python, or native source.
