# BizX: Worlds of Commerce & Conflict

## Purpose

An original cross-platform open-world RPG/strategy game design for BizX. It combines exploration, business simulation, faction politics, quests, dialogue, combat, crafting, trading, vehicles and dynamic world events.

## Open-source patterns incorporated as design inspiration

- Veloren: persistent multiplayer world, crafting, combat, NPCs, mounts and exploration.
- Open RPG/Godot RPG projects: data-driven dialogue, quests, inventory, save/load and scene transitions.
- Vitric-style systems: quests, equipment, loot, shops, skills, status effects and faction/AI boundaries.
- AI RPG projects: deterministic game rules remain authoritative; optional AI is narration/content assistance, never the authority for HP, inventory, currency or quest completion.
- Open-source strategy RPGs such as Battle for Wesnoth: campaign structure, factions, scenarios and deterministic rules.

These are architectural inspirations only. BizX uses original names, story, rules and assets. No proprietary commercial-game assets or copyrighted game content is copied.

## Flagship story

### Chapter 0 — The First Ledger
The player inherits a failing transport company in the frontier city of Meridian Reach. A missing shipment reveals that three factions are manipulating regional trade.

### Chapter 1 — Roads of Meridian
Build routes, investigate bandits, recruit a first companion, and choose between the Civic Guild, Free Traders and Iron Syndicate.

### Chapter 2 — The Broken Exchange
A market crash creates shortages. The player can stabilize neighborhoods, profit from scarcity, or expose corruption.

### Chapter 3 — Frontier Fire
Faction conflicts become open conflict. Vehicle missions, tactical encounters and settlement defense become available.

### Chapter 4 — The Living Market
World simulation begins producing unscripted opportunities: caravans, storms, shortages, festivals, raids and political negotiations.

### Chapter 5 — Three Futures
The player chooses a governing model for the region. Endings depend on reputation, alliances, wealth, settlements protected and major quest decisions.

## Core loop

`Explore -> Discover -> Negotiate/Fight -> Acquire -> Build -> Trade -> Choose -> World reacts -> Progress story`

## Gameplay systems

- Player attributes: vitality, agility, insight, influence, engineering, commerce.
- Inventory/equipment and stackable resources.
- Quest objectives and branching completion.
- Dialogue conditions based on flags, reputation, inventory and faction standing.
- Combat with initiative, actions, damage, armor and status effects.
- Economy with supply/demand and regional modifiers.
- Factions with reputation from -100 to +100.
- NPC memory represented by deterministic relationship facts.
- Dynamic world events and scheduled NPC activity.
- Vehicles and mounts through an abstract transport interface.
- Save/load with versioned state.
- Optional multiplayer replication through an authoritative server.
- Optional local AI narration. AI cannot directly mutate authoritative state.

## Storyboard contract

Each scene contains: `id`, `chapter`, `location`, `actors`, `beats`, `choices`, `conditions`, `effects`, `nextScene`.

A choice can set flags, grant/revoke items, alter faction reputation, create quests or branch to another scene.

## Asset policy

Only original BizX assets or assets with compatible licenses may ship in the repository. AssetBrowser records source URL, creator, license, checksum and import date for externally sourced assets.
