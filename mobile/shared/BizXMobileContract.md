# BizX Mobile Contract

Android/Kotlin and Apple/Swift mobile applications share the same feature vocabulary while using native platform capabilities.

## Contract

`game`, `NetworkUnified`, `launcher`, `InternetScanner`, `AssetBrowser`, `crypto`, `web`, `3D`, `game-assets`, `game-store`, `network`, `rendering`, `scripts`.

## Platform rules

- Android uses Kotlin lifecycle, permissions, secure storage and platform networking/rendering adapters.
- Apple uses Swift lifecycle, Keychain/CryptoKit, URLSession and Metal-ready rendering adapters.
- Internet scanning is authorization-gated; mobile/browser sandboxes cannot be treated as unrestricted raw-socket environments.
- Wallet functionality defaults to unsigned intents/provider boundaries; private keys and recovery secrets are never placed in logs.
- Shared data models should remain serialization-compatible across Java/Kotlin/Swift/TypeScript.
