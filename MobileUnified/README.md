# BizX Mobile Unified Application

Unified mobile architecture for the BizX game/application. The mobile implementations share one platform-neutral game/economy contract while retaining native platform adapters.

## Targets

- Android: Kotlin + Jetpack Compose
- iOS: Swift + SwiftUI
- Cross-platform: Flutter/Dart adapter contract
- Cross-platform: React Native/TypeScript adapter contract

## Shared capabilities

- Tycoon/game state
- virtual BIZ economy and ledger simulation
- rendering capability selection
- online/offline session state
- save/load-ready state serialization
- native platform bridge boundary

Real cryptocurrency settlement is deliberately not embedded in the mobile game ledger. Wallet/network integrations must be explicitly authorized by the user and handled by the existing security/payment layers.

Flutter's layered architecture and platform-channel model support this separation, while Android's Jetpack/Compose architecture provides the native Android UI boundary. citeturn0search0turn0search5

## Structure

```text
MobileUnified/
├── contract/
│   └── mobile_game_contract.json
├── android/
│   └── app/src/main/java/io/amerhwitat/bizx/mobile/
├── ios/
│   └── Sources/BizXMobile/
├── flutter/
│   └── lib/
├── react-native/
│   └── src/
└── scripts/
    ├── build.sh
    ├── build.ps1
    └── build.bat
```

The existing `kotlin/mobile` and `apple` implementations remain supported and are treated as native production adapters rather than being deleted or replaced.
