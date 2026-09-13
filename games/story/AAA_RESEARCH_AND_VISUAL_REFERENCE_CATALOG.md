# BizX AAA Research & Visual Reference Catalog

Research date: 2026-09-13

This catalog converts public design patterns into **original BizX systems**. It does not copy proprietary game code, trademarks, characters, maps, or commercial assets. Storefront screenshots are visual references only; when a screenshot is not clearly redistributable, the repository stores a source URL and design observation instead of the image.

## Open-source implementation references

| Source | Useful patterns for BizX | License / boundary |
|---|---|---|
| Veloren | procedural open world, voxel terrain, combat, NPCs, crafting, mounts, multiplayer | GPL-3; study architecture and independently implement compatible ideas; do not copy code/assets into BizX |
| ALIS | modular Unreal plugins, authoritative inventory/vitals/dialogue/interaction/loading | repository documents its own licensing/component boundaries; use architecture patterns, not copied implementation |
| Vitric | reusable inventory, quest, dialogue, combat, progression, loot, shop and crafting modules | inspect source license before any reuse; BizX implementation remains original |
| O3DE Multiplayer Gem | authoritative replication, prediction, rollback, RPCs, network properties | Apache-2.0 project; BizX uses the concepts through its own interfaces |
| Nakama | realtime multiplayer, social, competitive backend abstraction | open-source backend; optional integration adapter only |
| GT-Caliber | AAA-quality open-world target: streaming, vehicles, crowds, water, weather, data-driven C++ logic | code MIT but authored/third-party assets have separate licenses; no copied content |

## Engine/platform references

### Unreal Engine
- World Partition: grid-cell streaming, Data Layers, One File Per Actor and HLOD for large worlds.
- MassEntity: data-oriented fragments/archetypes for large numbers of agents.
- Gameplay Ability System: attributes, abilities, effects, cooldowns and asynchronous ability tasks.
- PCG: partitioned/hierarchical/runtime procedural generation.
- Online Services: sessions, lobbies, presence, achievements, leaderboards, stats and user files.

Official references:
- https://dev.epicgames.com/documentation/unreal-engine/world-partition-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/overview-of-mass-entity-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/gameplay-ability-system-for-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/pcg-development-guides
- https://dev.epicgames.com/documentation/unreal-engine/overview-of-online-services

### Unity
Use the existing Unity adapter as the presentation layer and keep the deterministic simulation independent. Target patterns include ECS/data-oriented simulation, Addressables/content catalogs, AI navigation, animation state machines, input abstraction, scene streaming, and multiplayer transport adapters.

### Godot
Use scene/resource composition, navigation, animation trees, multiplayer APIs and resource-driven data as patterns for a future Godot adapter. Do not make Godot a hard dependency of the core simulation.

### O3DE
Use entity/component design, server authority, event-driven replication, reliable/unreliable RPCs and local prediction/rollback as reference patterns.

## Storefront feature references

### Steam
Steam pages and Steamworks documentation are used to study player-facing conventions such as achievements, cloud saves, multiplayer sessions, inventories, community features, wishlists, controller support and discoverability. Storefront images remain owned by their respective publishers/developers unless their license says otherwise.

Reference examples:
- https://store.steampowered.com/app/1527950/Wartales/
- https://store.steampowered.com/app/4124950/Ashes_of_Creation/
- https://store.steampowered.com/app/4291360/
- https://partner.steamgames.com/

### Epic Games Store / EOS
Epic references are used for cross-platform sessions, lobbies, achievements, stats, social/presence and commerce abstractions. EOS credentials and platform configuration remain deployment secrets and are never committed.

## Visual reference policy

1. Use official store/engine pages as inspiration for composition, UI hierarchy, world density and presentation quality.
2. Do not commit screenshots copied from Steam, Epic, publishers or other copyrighted sources unless the source explicitly grants redistribution rights.
3. Prefer CC0/public-domain assets for committed samples. Kenney and Poly Haven are examples of providers with CC0 licensing policies.
4. Record provider, creator, source URL, license and checksum for every imported asset.
5. Generated BizX concept art must be original and clearly marked as such.

## AAA design synthesis for BizX

- Seamless world: stream cells around active players; keep simulation state independent of rendering.
- Living population: schedules, needs, relationships, memory, jobs, faction alignment and local navigation.
- Systemic combat: abilities, status effects, stamina/resources, armor, damage types, tactical AI and deterministic resolution.
- Economy: production chains, supply/demand, dynamic prices, logistics, taxation, scarcity and faction policy.
- Dynamic narrative: quest graphs whose conditions read simulation state; world events can create or close opportunities.
- Vehicles: ownership, fuel/energy, damage, cargo, handling, passengers and travel routes.
- Procedural content: deterministic seeds, biome rules, encounter budgets, dungeon graphs and resource placement.
- Multiplayer: server authority, prediction, reconciliation, interest management and replayable events.
- Platform services: abstract achievements, sessions, lobbies, presence, leaderboards and cloud saves.
- Production quality: telemetry, save migration, content versioning, accessibility, localization, controller support and performance budgets.

## Example game references and what BizX extracts

- **Veloren:** interconnected procedural world + mounts + crafting + multiplayer.
- **Wartales:** party progression + contracts + camp management + tactical combat.
- **Ashes of Creation:** settlements that evolve, player-driven economy, caravans, factions, sieges and world events.
- **Reforge Eden: Overlord:** city building + population/professions + armies + industry + exploration.
- **Downfall MMORPG:** faction choice + hybrid fantasy/technology loadouts + PvP/PvE + class/gear combinations.

These are design observations, not a claim that BizX contains or reproduces their proprietary content.
