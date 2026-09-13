# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## Unified build and configuration automation

The repository provides Windows CMD/PowerShell and POSIX shell entry points that discover application manifests and invoke the appropriate dependency manager/build system for each programming language.

## InternetScanner — authorized network inventory

`InternetScanner/` provides cross-language network inventory and host discovery. It distinguishes local/intranet assets from public assets and keeps public active operations allowlist-only.

## NetworkUnified — user-facing networking/API application

`NetworkUnified/` consolidates the repository networking code behind a versioned API contract. It provides a runnable implementation for Python, Node.js, TypeScript, Go, Rust, Java, C#, C++, Dart, Kotlin, Swift, PHP and Ruby. The API exposes catalog, health, safe configuration, local interfaces, IP classification, authorization, and bounded TCP connectivity checks. Python and Node.js provide local HTTP API servers on `127.0.0.1:8787`; the other implementations provide native runnable adapters/diagnostics using their language networking APIs.

Launch from the repository root with `run-network-api.bat`, `run-network-api.ps1`, or `run-network-api.sh`. Select an implementation with `NETWORK_API_IMPL=python|node|typescript|go|rust|java|csharp|cpp|dart|kotlin|swift|php|ruby`.

The GUI console is at `NetworkUnified/gui/index.html` and the shared API contract is `NetworkUnified/contract/api.json`.

Public targets require an explicit allowlist. The networking layer does not implement Internet-wide enumeration, credential attacks, evasion, spoofing, or exploitation.

## Tycoon Business Game

The cross-language Tycoon runtime is available in the Node.js, Java 17 and Python implementations. It combines business acquisition, operating revenue/costs, turn-based progression, snapshots, payment-routing policy, and provider-neutral monetization.

## Monetization

`games/monetization/` adds consumable packs, premium unlocks, subscriptions, banner/interstitial/rewarded ads, revenue events, entitlement tracking, test mode, and server-side verification hooks.

## Source-code index

| Area | Source |
|---|---|
| InternetScanner | [InternetScanner/](InternetScanner/) |
| NetworkUnified | [NetworkUnified/](NetworkUnified/) |
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
