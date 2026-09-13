# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## Unified build and configuration automation

The repository now provides native Windows CMD/PowerShell and POSIX shell entry points that discover application manifests and invoke the appropriate dependency manager/build system for each programming language.

```text
build.cmd             # Windows CMD -> PowerShell orchestrator
build.sh              # Linux/macOS/WSL
install-deps.cmd      # Windows dependency bootstrap
install-deps.sh       # POSIX dependency bootstrap
clean.cmd / clean.sh  # remove generated build/dependency directories
scripts/build.ps1
scripts/build.sh
scripts/install-deps.ps1
scripts/install-deps.sh
scripts/clean.ps1
scripts/clean.sh
```

Supported native ecosystems include Node.js/npm, Python/pip, Rust/Cargo, Go/modules, Java/Maven, Kotlin/Gradle, C/C++/CMake, Swift/SwiftPM, Dart/pub, PHP/Composer and Ruby/Bundler. The orchestrator discovers manifests recursively while excluding source-control and generated dependency/build directories.

Dependency installation uses existing lockfiles where present. Operating-system toolchain installation is intentionally not forced by the repository scripts; missing toolchains are reported so administrators can install them through their managed OS package mechanism. This avoids silently changing a developer workstation.

The same build entry points are used by `.github/workflows/build-all.yml`, providing Linux, Windows and macOS validation. GitHub documents native build/test workflows for Node.js, Python, Java, Go, .NET, Ruby, Rust, Swift and related ecosystems, and its setup actions support dependency caching. citeturn0search1turn0search5 CMake Presets can be used by individual C/C++ applications for reproducible configure/build settings. citeturn0search0

## InternetScanner — authorized network inventory

`InternetScanner/` provides a cross-language network inventory and host-discovery component. It distinguishes local/intranet assets from globally routable public assets, records normalized host information, performs local discovery, and supports passive DNS/RDAP-style public metadata for explicitly authorized assets.

The scanner is deliberately bounded: public active discovery requires an explicit target allowlist; target counts, concurrency and probe rates are bounded; Internet-wide enumeration, evasion, spoofing, credential attacks and exploitation are not implemented.

## EmailSender repository-validation tool

`emailsender/` provides a topic-driven research and outreach assistant for validating BizX repositories. It extracts publicly displayed email addresses with source context, de-duplicates them, applies suppression rules, and places contacts into a human-review queue.

## Tycoon Business Game

The cross-language Tycoon runtime is available in the Node.js, Java 17 and Python implementations. It combines business acquisition, operating revenue/costs, turn-based progression, snapshots, the shared payment-routing policy, and the provider-neutral monetization engine.

## Monetization

`games/monetization/` adds consumable packs, premium unlocks, subscriptions, banner/interstitial/rewarded ads, revenue events, entitlement tracking, test mode, and server-side verification hooks.

## Source-code citation index

| Area | Source |
|---|---|
| InternetScanner | [InternetScanner/](InternetScanner/) |
| EmailSender | [emailsender/](emailsender/) |
| Visual C++ desktop | [desktop/vcpp/](desktop/vcpp/) |
| C# WPF desktop | [desktop/dotnet/](desktop/dotnet/) |
| Unreal Engine 5 C++ | [Unreal5/BizXUnreal/](Unreal5/BizXUnreal/) |
| Unity 3D package/data | [Unity3D/](Unity3D/) |
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
