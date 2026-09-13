# BizX Game Feature Matrix

| System | Python | Node.js | Java | Kotlin | Swift | TypeScript | Unity C# | Unreal C++ | Other runtimes |
|---|---|---|---|---|---|---|---|---|---|
| Deterministic state | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | contract |
| Story/scene graph | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | JSON |
| Branching quests | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | JSON |
| Dialogue conditions | contract | contract | contract | contract | contract | contract | adapter | adapter | JSON |
| Inventory/equipment | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | contract |
| Faction reputation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | contract |
| Combat | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | adapter |
| Economy | existing | existing | existing | contract | contract | contract | adapter | adapter | existing modules |
| Save/load | existing | existing | existing | adapter | adapter | browser storage | engine save | engine save | adapter |
| AI narration | optional | optional | optional | optional | optional | optional | optional | optional | provider-neutral |
| Rendering | adapter | adapter | adapter | mobile | Metal | WebGL/WebGPU | Unity | Unreal | native |
| Multiplayer | NetworkUnified | NetworkUnified | NetworkUnified | mobile adapter | mobile adapter | WebSocket | engine/network adapter | engine/network adapter | NetworkUnified |

## Design rule

The simulation is authoritative. AI narration, rendering and UI cannot invent or directly mutate authoritative HP, credits, inventory, faction reputation or quest completion.
