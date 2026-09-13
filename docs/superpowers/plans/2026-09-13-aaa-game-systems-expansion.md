# AAA Game Systems Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a cross-language, original AAA-style gameplay systems layer to BizX, informed by public/open-source projects, engine documentation, and storefront feature patterns without copying proprietary game code or copyrighted assets.

**Architecture:** Keep the existing deterministic simulation authoritative and extend it with focused modules for world streaming, AI/NPC simulation, abilities/combat, economy/factions, quests/dialogue, vehicles, procedural world generation, save/replay, multiplayer replication contracts, platform services, and asset provenance. Each language receives a native implementation or thin adapter in its existing subdirectory while sharing data contracts in JSON/Markdown. Storefront and game screenshots are treated as visual references only; no copyrighted screenshots or proprietary assets are copied into the repository.

**Tech Stack:** Python, Node.js, Java, Kotlin, Swift, TypeScript/Web, Unity C#, Unreal C++; JSON data contracts; existing NetworkUnified integration; engine-specific adapters; GitHub Actions where available.

**Spec:** `games/story/BIZX_WORLDS_OF_COMMERCE_AND_CONFLICT.md` and `games/story/GAME_FEATURE_MATRIX.md`

## Global Constraints

- Simulation state remains authoritative; presentation, AI narration, and screenshots cannot directly mutate authoritative state.
- Only original or license-compatible assets may be committed.
- Public sources are used for ideas, architecture, APIs, and documentation; proprietary source code is not copied.
- Storefront screenshots are referenced by URL/metadata rather than redistributed unless their license explicitly permits redistribution.
- Deterministic simulation remains testable without a renderer or online service.
- Networked state uses server-authoritative validation and explicit replication contracts.

---

## Task 1 — Research and provenance catalog
- [ ] Record open-source references including Veloren, ALIS, Vitric, O3DE, Nakama, and GT-Caliber.
- [ ] Record engine references for Unreal World Partition, MassEntity, PCG, GAS and Online Services.
- [ ] Record Steam/Epic feature patterns such as achievements, sessions, lobbies, player-driven economies, settlements and world events.
- [ ] Add visual-reference entries with official source URLs and usage restrictions.
- [ ] Commit the catalog.

## Task 2 — Shared AAA feature contracts
- [ ] Add JSON schemas/data examples for world cells, NPC archetypes, abilities, vehicles, loot, quests, factions, world events, save snapshots and replay events.
- [ ] Add deterministic simulation invariants and validation rules.
- [ ] Commit the contracts.

## Task 3 — Core gameplay expansion
- [ ] Add world simulation, NPC behavior, dynamic economy, faction conflicts, abilities/status effects, loot/crafting, vehicles and world events to Python.
- [ ] Add equivalent deterministic systems to Node.js, Java, Kotlin, Swift and TypeScript.
- [ ] Add engine adapters for Unity and Unreal.
- [ ] Add tests/fixtures for cross-language parity where practical.
- [ ] Commit in focused changes.

## Task 4 — AAA world/rendering adapters
- [ ] Add streaming/HLOD/LOD/PCG adapter contracts.
- [ ] Add weather/time-of-day, crowds, navigation and procedural encounter hooks.
- [ ] Add Unity and Unreal integration notes and starter components without requiring proprietary assets.
- [ ] Commit.

## Task 5 — Multiplayer and platform services
- [ ] Add authoritative replication messages and prediction/rollback contracts.
- [ ] Add abstract sessions, lobbies, presence, achievements, leaderboards, cloud-save and commerce interfaces.
- [ ] Map optional adapters to NetworkUnified, Steam/Steamworks, Epic Online Services and Nakama without hard-coding credentials.
- [ ] Commit.

## Task 6 — Asset browser/provenance and visual references
- [ ] Add a provider-neutral asset manifest model with URL, license, creator, checksum and local path.
- [ ] Add CC0-friendly provider references such as Kenney and Poly Haven.
- [ ] Integrate with the existing AssetBrowserService contract.
- [ ] Commit.

## Task 7 — Documentation, feature matrix and verification
- [ ] Update README and game feature matrix with all new systems.
- [ ] Add a research/source index with citations and license notes.
- [ ] Run available repository tests/build checks; if local execution is blocked, use GitHub source/status verification and clearly report the limitation.
- [ ] Review for proprietary-code/asset contamination and secret leakage.
- [ ] Commit final documentation.
