# BizX Java Unified Runtime

Java 17+ parity implementation for the BizX game platform. `UnifiedBizXRuntime` is the single Java facade for Game, NetworkUnified, launcher, InternetScanner, AssetBrowser, Crypto, Web, 3D, game-assets, game-store, network, rendering and scripts.

The Java layer preserves platform boundaries: native/browser/mobile-specific behavior is exposed through explicit contracts rather than unsafe source renaming. Existing Java services remain available.

## Build and test

From this directory:

```bash
mvn --batch-mode --no-transfer-progress clean verify
mvn package
java -cp target/classes io.amerhwitat.bizx.GameLauncher
```

The shared, language-neutral runtime conformance vectors live in `../contracts/fixtures/bizx-runtime-v1.tsv`. The Java acceptance test checks SHA-256 output, default/custom game-mode normalization, and the ordered public feature list against those vectors. CI runs the same Maven verification on changes to the Java runtime or fixture contract.

## Current public contract

- `features()` returns the stable ordered list of runtime capability identifiers.
- `startGame(null)` and blank modes normalize to `default`; nonblank modes are preserved.
- `sha256(String)` hashes the UTF-8 bytes and returns lowercase hexadecimal.
- The launcher defaults to `default` mode and reports the selected mode.

## Security

Public network targets require an explicit allowlist. Crypto creates provider-bound unsigned intents; private keys and seed phrases are never persisted by this runtime. Internet scanning and asset downloads require explicit application-level authorization.
