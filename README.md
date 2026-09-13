# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## Unified build and configuration automation

The repository provides Windows CMD/PowerShell and POSIX shell entry points that discover application manifests and invoke the appropriate dependency manager/build system for each programming language.

## InternetScanner — authorized network inventory

`InternetScanner/` provides cross-language network inventory and host discovery. It distinguishes local/intranet assets from public assets and keeps public active operations allowlist-only.

## NetworkUnified — user-facing networking/API application

`NetworkUnified/` consolidates networking code behind a versioned API contract with runnable implementations for Python, Node.js, TypeScript, Go, Rust, Java, C#, C++, Dart, Kotlin, Swift, PHP and Ruby.

## AssetBrowser — in-game open/free asset library

`AssetBrowser/` adds a game-facing GUI for searching openly licensed media, reviewing provider/license metadata, downloading selected assets, verifying SHA-256, and importing them into `game_assets/`. It integrates with Openverse, Poly Haven and the official Kenney catalog. Downloads are restricted to configured HTTPS provider hosts and are never executed. Every imported asset receives a provenance/license record in `game_assets/manifest.json`.

Launch with `AssetBrowser/scripts/run.bat`, `AssetBrowser/scripts/run.ps1`, or `AssetBrowser/scripts/run.sh`. Default GUI/API address is `http://127.0.0.1:8790`.

## Tycoon Business Game

The cross-language Tycoon runtime is available in the Node.js, Java 17 and Python implementations. It combines business acquisition, operating revenue/costs, turn-based progression, snapshots, payment-routing policy, and provider-neutral monetization.

## Monetization

`games/monetization/` adds consumable packs, premium unlocks, subscriptions, banner/interstitial/rewarded ads, revenue events, entitlement tracking, test mode, and server-side verification hooks.

## Source-code index

| Area | Source |
|---|---|
| InternetScanner | [InternetScanner/](InternetScanner/) |
| NetworkUnified | [NetworkUnified/](NetworkUnified/) |
| AssetBrowser | [AssetBrowser/](AssetBrowser/) |
| EmailSender | [emailsender/](emailsender/) |
| Visual C++ desktop | [desktop/vcpp/](desktop/vcpp/) |
| C# WPF desktop | [desktop/dotnet/](desktop/dotnet/) |
| Unreal Engine 5 C++ | [Unreal5/BizXUnreal/](Unreal5/BizXUnreal/) |
| Unity 3D | [Unity3D/](Unity3D/) |
| Mobile Kotlin | [mobile/kotlin/](mobile/kotlin/) |
| Mobile Flutter | [mobile/flutter/](mobile/flutter/) |
| Payment configuration | [games/payment-config/](games/payment-config/) |
| Monetization | [games/monetization/](games/monetization/) |
| Node.js | [nodejs/](nodejs/) |
| Java | [java/](java/) |
| Python | [python/](python/) |
| JavaScript | [javascript/](javascript/) |
| TypeScript | [typescript/](typescript/) |
| Apple/Swift | [apple/](apple/) |
| Documentation | [docs/](docs/) |
