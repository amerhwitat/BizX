# BizX Kotlin Mobile

Native Android mobile implementation in Kotlin 2.4.20. The module is intentionally isolated under `kotlin/mobile/` so it does not disturb the existing desktop, Node.js, Java, Python, JavaScript, or TypeScript implementations.

## Scope
- Android application entry point with a small native UI.
- Shared conceptual boundary for BizX business state, 128D semantic state, and authenticated opt-in P2P integration.
- Cleartext network traffic disabled by default; network transport must be added behind the existing authenticated P2P contract.
- Designed as the Android side of a future Kotlin Multiplatform expansion to iOS.

## Build
Open `kotlin/mobile/` in Android Studio and build the `app` module. Current toolchain baseline: Kotlin 2.4.20, Android Gradle Plugin 9.4.0, compile/target SDK 36, JDK 17.

## Research basis
Kotlin Multiplatform supports Android and iOS with shared logic and optional shared UI. Android and iOS are stable KMP targets. Android security guidance recommends TLS and disabling cleartext traffic where possible.

References: Kotlin Multiplatform documentation; Android Developers network-security guidance.
