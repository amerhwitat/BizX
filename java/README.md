# BizX Java Unified Runtime

Java 17+ parity implementation for the BizX game platform. `UnifiedBizXRuntime` is the single Java facade for Game, NetworkUnified, launcher, InternetScanner, AssetBrowser, Crypto, Web, 3D, game-assets, game-store, network, rendering and scripts.

The Java layer preserves platform boundaries: native/browser/mobile-specific behavior is exposed through explicit contracts rather than unsafe source renaming. Existing Java services remain available.

## Build

```bash
mvn test
mvn package
java -cp target/classes io.amerhwitat.bizx.GameLauncher
```

## Security

Public network targets require an explicit allowlist. Crypto creates provider-bound unsigned intents; private keys and seed phrases are never persisted by this runtime. Internet scanning and asset downloads require explicit application-level authorization.
