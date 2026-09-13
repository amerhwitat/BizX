# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## Tycoon Business Game

The cross-language Tycoon runtime is available in the Node.js, Java 17 and Python implementations. It combines business acquisition, operating revenue/costs, turn-based progression, snapshots, the shared payment-routing policy, and the new provider-neutral monetization engine.

Purchases and payment settlement are configured for the primary Ethereum receiving address `0x0B4fF3fc6AE19fAF9A0d2628a646ABD9636B1162`. The repository never stores private keys. Real transfers, swaps, or exchanges remain non-custodial and require explicit user/wallet authorization.

## Monetization

`games/monetization/` adds consumable packs, premium unlocks, subscriptions, banner/interstitial/rewarded ads, revenue events, entitlement tracking, test mode, and server-side verification hooks. Provider targets include Unity Ads/LevelPlay, AppLovin MAX, Google AdMob, Google Play Billing, Apple StoreKit/App Store Connect, and RevenueCat. Provider account IDs and secrets are injected at deployment time and are never committed.

- Configuration: `games/monetization/monetization.json`
- Platform links: `games/monetization/PLATFORM_LINKS.md`
- Integration guide: `games/monetization/README.md`
- Payment configuration: `games/payment-config/`

## Free world maps, audio and VFX

`game-assets/` contains a researched free-asset catalog and machine-readable manifest. The replacement for generated artwork uses CC0/public-domain sources wherever possible, including Poly Haven for realistic PBR/HDRI/3D environments, Kenney/OpenGameArt for nostalgic maps and tiles, and CC0 sound/VFX collections for gameplay feedback.

## Source-code citation index

| Area | Source |
|---|---|
| Visual C++ desktop | [desktop/vcpp/](desktop/vcpp/) |
| C# WPF desktop | [desktop/dotnet/](desktop/dotnet/) |
| Unreal Engine 5 C++ | [Unreal5/BizXUnreal/](Unreal5/BizXUnreal/) |
| Unity 3D package/data | [Unity3D/](Unity3D/) |
| Portable 3D assets | [3D/assets/](3D/assets/) |
| Free game asset catalog | [game-assets/](game-assets/) |
| Rendering architecture | [rendering/](rendering/) |
| Multi-chain crypto | [crypto/](crypto/) |
| Game/store/storyboards | [game-store/](game-store/) |
| Mobile Kotlin | [mobile/kotlin/](mobile/kotlin/) |
| Mobile Flutter | [mobile/flutter/](mobile/flutter/) |
| P2P/presence policy | [network/](network/) |
| Payment configuration | [games/payment-config/](games/payment-config/) |
| Monetization | [games/monetization/](games/monetization/) |
| Node.js | [nodejs/](nodejs/) |
| Java | [java/](java/) |
| Python | [python/](python/) |
| JavaScript | [javascript/](javascript/) |
| TypeScript | [typescript/](typescript/) |
| Apple/Swift | [apple/](apple/) |
| Documentation | [docs/](docs/) |
