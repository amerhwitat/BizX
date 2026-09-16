# BizX

BizX is the core business/application repository for the BizX/BizXtreme platform.

## Web search tags

**Core tags:** `bizx`, `business-simulation`, `game-development`, `rpg`, `strategy-game`, `open-world-game`, `tycoon-game`, `game-engine`, `cross-platform`, `python`, `nodejs`, `java`, `csharp`, `cpp`, `typescript`, `networking`, `multiplayer`, `crypto-wallet`, `blockchain`, `asset-browser`, `chess`, `strategy`, `unity`, `unreal-engine`, `webgl`, `vulkan`, `ai`, `npc-ai`, `procedural-generation`

**Search phrases:** BizX game framework, business simulation game engine, cross-platform RPG strategy game, open-world business simulation, tycoon game engine, multiplayer game networking, crypto wallet game integration, cross-language game development, Unity and Unreal game systems, WebGL game rendering, AI NPC simulation, procedural game world, chess and strategy engine, open licensed game asset browser.

See [`WEB_SEARCH_TAGS.md`](WEB_SEARCH_TAGS.md) for the maintained tag set and search-phrase metadata.

## Unified build and configuration automation

The repository provides Windows CMD/PowerShell and POSIX shell entry points that discover application manifests and invoke the appropriate dependency manager/build system for each programming language.

## Flagship game framework

`games/story/` contains the original **BizX: Worlds of Commerce & Conflict** design, a cross-platform RPG/strategy game combining open-world exploration, business simulation, factions, branching quests, dialogue, combat, crafting, trading, vehicles, dynamic events and multiple endings.

### AAA systems expansion

The game framework includes a research-driven AAA systems layer based on public/open-source architecture patterns and public engine/storefront documentation. It is an original implementation and does **not** copy proprietary commercial game code, characters, maps, trademarks, stories, scripts, music, voice recordings or copyrighted storefront assets.

- Research and visual-reference catalog: `games/story/AAA_RESEARCH_AND_VISUAL_REFERENCE_CATALOG.md`.
- Famous-game genre catalog: `games/story/FAMOUS_GAME_GENRE_INSPIRATION_CATALOG.md`.
- Shared data contracts: `games/story/aaa_system_contracts.json` and `games/story/game_genre_systems.json`.
- Rendering and legal asset pipeline: `games/story/RENDERING_AND_ASSET_PIPELINE.md`.
- Deterministic systemic primitives: world cells, NPC needs/schedules, dynamic economy, abilities, vehicles, world events and simulation ticks.
- Genre systems include original street-racing, open-world sandbox, 3D fighting, tactical RPG, MMO RPG, survival, racing simulation, action-adventure, city-building and arena-sports foundations.
- Native/adapter implementations include Python, Node.js, Java, Kotlin, Swift, TypeScript, Unity C#, Unreal C++, Go, Rust, C++, standalone C#, Dart, PHP and Ruby, with additional adapters added incrementally.
- Storyboard and branching quest logic remain data-driven under `games/story/storyboard.json`.
- Visual references are documented by official source URL; screenshots are not redistributed unless their license permits it.
- Asset imports must carry provider, creator, source URL, license and SHA-256 provenance.

### Chess and strategy systems

`games/chess-strategy/` adds a common chess/strategy contract and native adapters across the language implementations. Chess support includes FEN/PGN, legal-move integration, UCI engine boundaries, clocks, puzzles, analysis, replay and variant-provider hooks. Strategy support includes deterministic turns, resources, production, trade, territory, diplomacy, technology, fog-of-war, AI policies and replay.

The engine boundary is intentionally provider-neutral. Stockfish 19 is the current open-source research target, while python-chess and Lichess source projects provide public protocol/rules/UI references. External code remains separately licensed and is not copied into BizX.

### Network, cryptography and wallets

`games/crypto-wallet/` defines the cross-language contract for the existing NetworkUnified layer plus cryptocurrency and wallet capabilities. It covers IPv4/IPv6, TCP/UDP/HTTP/HTTPS/WebSocket boundaries, versioned network envelopes, hashing/HMAC/signature-provider interfaces, address/account metadata, watch-only wallets, provider-backed wallets, transaction lifecycle and explicit confirmation.

Supported coin metadata currently includes BTC, BCH, LTC, DOGE, ETH, ETC, SOL, ADA, XRP, DOT and AVAX. The integration is non-custodial by default: secrets are never committed or logged, free gameplay does not require crypto, and transaction submission remains behind an explicit provider/confirmation boundary.

### Famous-game inspiration boundary

BizX can reproduce general gameplay concepts such as open-world driving, police pursuit, vehicle tuning, tactical contracts, party progression, frame-based fighting, combos, parries, dynamic economies, faction wars and procedural worlds. It cannot copy the protected expression of named commercial games. This keeps BizX an original implementation while allowing it to learn from the broader game-development field.

### Story and gameplay

- Data-driven branching storyboard in `games/story/storyboard.json`.
- Deterministic authoritative game-state engines in Python, Node.js, Java, Kotlin, Swift and browser TypeScript.
- Unity C# and Unreal C++ gameplay foundations.
- Inventory, quests, faction reputation, skill checks, combat, progression and story flags.
- Original vehicle/driving, wanted-state and 3D fighting primitives.
- Optional AI narration is subordinate to deterministic game rules.
- AssetBrowser provenance and licensing rules remain mandatory for external assets.

## Real-time rendering

`games/story/RENDERING_AND_ASSET_PIPELINE.md` defines a renderer-neutral path from fixed-step simulation to high-fidelity engine adapters. Supported targets include OpenGL/WebGL/WebGPU, Vulkan/D3D12/Metal-capable native renderers, and optional Unreal/Unity/O3DE presentation layers.

The architecture supports world streaming, LOD, occlusion culling, instancing, dynamic resolution, async asset loading, animation/crowd LOD, GPU effects, frame-time telemetry and deterministic replay. High-end engine features remain optional adapter capabilities rather than requirements of the authoritative simulation.

Recent research into real-time generative world rendering is also tracked as an experimental render-server boundary. Generated pixels never become authoritative gameplay state.

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

## Feature conversion and interoperability

See `docs/FEATURE_CONVERSION_MAP.md`, `games/chess-strategy/contracts.json` and `games/crypto-wallet/contracts.json` for the shared contracts and language mapping.

## Source-code index

| Area | Source |
|---|---|
| Flagship game design | `games/story/` |
| AAA research/reference catalog | `games/story/AAA_RESEARCH_AND_VISUAL_REFERENCE_CATALOG.md` |
| Famous-game genre catalog | `games/story/FAMOUS_GAME_GENRE_INSPIRATION_CATALOG.md` |
| Rendering and legal asset pipeline | `games/story/RENDERING_AND_ASSET_PIPELINE.md` |
| Genre system contracts | `games/story/game_genre_systems.json` |
| AAA system contracts | `games/story/aaa_system_contracts.json` |
| Chess and strategy | `games/chess-strategy/` |
| Crypto and wallets | `games/crypto-wallet/` |
| Feature conversion map | `docs/FEATURE_CONVERSION_MAP.md` |
| InternetScanner | `InternetScanner/` |
| NetworkUnified | `NetworkUnified/` |
| AssetBrowser | `AssetBrowser/` |
| EmailSender | `emailsender/` |
| Visual C++ desktop | `desktop/vcpp/` |
| C# WPF desktop | `desktop/dotnet/` |
| Unreal Engine 5 C++ | `Unreal5/BizXUnreal/` |
| Unity 3D | `Unity3D/` |
| Mobile Kotlin | `mobile/kotlin/` |
| Mobile Flutter | `mobile/flutter/` |
| Node.js | `nodejs/` |
| Java | `java/` |
| Python | `python/` |
| JavaScript | `javascript/` |
| TypeScript | `typescript/` |
| Apple/Swift | `apple/` |
| Documentation | `docs/` |
