# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## InternetScanner — authorized network inventory

`InternetScanner/` provides a cross-language network inventory and host-discovery component. It distinguishes local/intranet assets from globally routable public assets, records normalized host information, performs local discovery, and supports passive DNS/RDAP-style public metadata for explicitly authorized assets.

The scanner is deliberately bounded: public active discovery requires an explicit target allowlist; target counts, concurrency and probe rates are bounded; Internet-wide enumeration, evasion, spoofing, credential attacks and exploitation are not implemented. Nmap's documentation describes ARP/Neighbor Discovery for local Ethernet host discovery and warns about the legal risks of unauthorized scanning. citeturn0search0turn0search5turn0search9

- Tool: `InternetScanner/`
- Shared configuration: `InternetScanner/config/scanner.json`
- Normalized record contract: `InternetScanner/SCHEMA.md`
- Node.js: `InternetScanner/languages/nodejs/`
- TypeScript: `InternetScanner/languages/typescript/`
- Python: `InternetScanner/languages/python/`
- Java: `InternetScanner/languages/java/`
- C#: `InternetScanner/languages/csharp/`
- C++: `InternetScanner/languages/cpp/`
- Rust: `InternetScanner/languages/rust/`
- Go: `InternetScanner/languages/go/`
- Kotlin: `InternetScanner/languages/kotlin/`
- Swift: `InternetScanner/languages/swift/`
- Dart: `InternetScanner/languages/dart/`
- PHP: `InternetScanner/languages/php/`
- Ruby: `InternetScanner/languages/ruby/`

## EmailSender repository-validation tool

`emailsender/` provides a topic-driven research and outreach assistant for validating BizX repositories. It extracts publicly displayed email addresses with source context, de-duplicates them, applies suppression rules, and places contacts into a human-review queue. The message header is **Games, OS, and Other topics** and the UI includes a bottom sending/research log.

Production sending is intentionally not triggered simply by discovering an address. A recipient must be reviewed/approved, and a configured mail transport must be explicitly authorized.

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
