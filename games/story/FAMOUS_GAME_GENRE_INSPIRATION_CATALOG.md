# BizX Famous-Game Genre Inspiration Catalog

Research date: 2026-09-13

BizX may implement **original mechanics inspired by broad game genres**, but it must not copy proprietary stories, scripts, characters, maps, source code, ripped models, textures, animations, music, voice lines, or trademarked branding from commercial games.

## Original BizX genre families

| Genre reference family | BizX original implementation target |
|---|---|
| Street-racing / open-world driving | Meridian Street Circuit: licensed/original vehicles, traffic simulation, police pursuit, tuning, races, contracts, dynamic road events |
| Open-world crime sandbox | Meridian Underworld: original factions, businesses, territory control, heists, stealth, wanted-state simulation and systemic NPC reactions |
| 3D competitive fighting | Arena of Eight: original fighters, frame-based move data, hitboxes/hurtboxes, guard, parry, throws, combos, stamina and rollback-ready deterministic combat |
| Tactical RPG | Frontier Contracts: party roles, contracts, camp, equipment, tactical encounters and procedural missions |
| MMO/open-world RPG | Living Meridian: settlements, professions, factions, caravans, crafting, mounts, dynamic events and player economy |
| Survival/crafting | Wild Meridian: gathering, weather, shelter, equipment durability, food, hazards and procedural resources |
| Racing simulation | Meridian Motorsport: tire model abstraction, grip, braking, aero, damage, telemetry, qualifying and championships |
| Action-adventure | Relic Roads: traversal, puzzles, environmental interactions, combat and branching discoveries |
| Strategy / city building | Meridian Foundry: production chains, population, logistics, taxation, diplomacy and territory growth |
| Sports/arena | BizX Champions: deterministic match state, teams, ratings, seasons, tournaments and spectator presentation |

## Story architecture

Each family uses original data-driven storyboards rather than copied scripts:

`chapter -> scene -> actors -> beats -> choices -> conditions -> effects -> next scene`

World simulation can alter narrative state through faction reputation, economy, wanted status, relationships, settlement prosperity, injuries, vehicle ownership and discovered locations.

## Driving systems

- arcade and simulation handling modes
- acceleration/braking/steering curves
- tire grip and surface modifiers
- traffic lanes and intersection control
- police pursuit state machine
- heat/wanted level
- vehicle tuning and damage
- race checkpoints and ghost telemetry
- dynamic road hazards
- weather and time-of-day modifiers

## Fighting systems

- fixed-step deterministic simulation
- startup/active/recovery frames
- hitboxes and hurtboxes
- hit stun / block stun
- guard / parry / throw
- combo counter and scaling
- meter/resource systems
- launch / juggle states
- rollback-friendly input history
- replay recording

## Open-world systems

- streamed world cells
- NPC schedules and needs
- factions and relationships
- crime/wanted propagation
- dynamic economy
- procedural encounters
- vehicles and pedestrians
- interiors/exteriors
- weather and day/night
- world events
- save-state migration

## Legal asset pipeline

Only import assets when the repository license permits redistribution and modification. Prefer CC0/public-domain sources such as Kenney and Poly Haven, or assets created by BizX contributors. For every imported asset record creator, provider, source URL, license, version and SHA-256 checksum.

Commercial storefront screenshots are references for composition and UI analysis only unless redistribution rights are explicit. Do not place copied Steam/Epic/publisher screenshots in the source tree.

## Rendering target

The simulation remains renderer-neutral. Adapters may target:

- Unreal Engine 5 / Nanite / Lumen / World Partition where licensed and configured by the developer
- Unity HDRP/ECS where licensed and configured by the developer
- Godot renderer
- O3DE real-time renderer
- WebGPU/WebGL
- Vulkan/OpenGL/Metal/D3D12 native renderers

The architecture also supports a research-only optional render-server boundary inspired by recent work on separating deterministic game state from visual generation. Generated imagery must never determine authoritative gameplay state.
