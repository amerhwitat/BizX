# BizX Game Feature Matrix

| System | Python | Node.js | Java | Kotlin | Swift | TypeScript | Unity C# | Unreal C++ | Go/Rust/C++/C#/Dart/PHP/Ruby |
|---|---|---|---|---|---|---|---|---|---|
| Deterministic state | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ adapter |
| Story/scene graph | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | JSON contract |
| Branching quests | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | JSON contract |
| Dialogue conditions | contract | contract | contract | contract | contract | contract | adapter | adapter | contract |
| Inventory/equipment | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | adapter |
| Faction reputation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | adapter |
| Combat/abilities/status effects | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ adapter |
| Dynamic economy | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ adapter |
| NPC needs/schedules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ adapter |
| Vehicles/cargo | ✓ | ✓ | contract | contract | contract | contract | adapter | adapter | contract |
| World events/weather | ✓ | ✓ | contract | contract | contract | contract | adapter | adapter | contract |
| Procedural world/streaming | contract | contract | contract | contract | contract | contract | Unity adapter | World Partition/PCG adapter | contract |
| Save/load + replay | existing | existing | existing | adapter | adapter | browser storage | engine save | engine save | contract |
| Multiplayer authority | NetworkUnified | NetworkUnified | NetworkUnified | mobile adapter | mobile adapter | WebSocket | engine/network adapter | engine/network adapter | NetworkUnified |
| Prediction/rollback | contract | contract | contract | contract | contract | contract | adapter | adapter | contract |
| Sessions/lobbies/presence | adapter | adapter | adapter | adapter | adapter | adapter | platform adapter | Online Services/EOS adapter | contract |
| Achievements/leaderboards | adapter | adapter | adapter | adapter | adapter | adapter | platform adapter | Online Services adapter | contract |
| Asset provenance | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | manifest contract |
| AI narration | optional | optional | optional | optional | optional | optional | optional | optional | provider-neutral |
| Rendering | adapter | adapter | adapter | mobile | Metal | WebGL/WebGPU | Unity | Unreal | native |

## AAA systems added

The current expansion adds focused systemic primitives for NPC simulation, dynamic pricing, abilities, vehicles/world-event data, and deterministic ticks. Engine adapters expose the same concepts while keeping the core simulation engine-neutral.

## Design rule

The simulation is authoritative. AI narration, rendering and UI cannot invent or directly mutate authoritative HP, credits, inventory, faction reputation, quest completion, world-event state or network authority.
