from dataclasses import dataclass, field
from random import Random
from typing import Any

@dataclass
class GameState:
    scene: str = "prologue.ledger"
    hp: int = 100
    xp: int = 0
    credits: int = 500
    inventory: dict[str, int] = field(default_factory=dict)
    flags: set[str] = field(default_factory=set)
    faction_rep: dict[str, int] = field(default_factory=lambda: {"civic": 0, "traders": 0, "iron": 0})
    quests: dict[str, str] = field(default_factory=dict)

class BizXGameEngine:
    """Authoritative deterministic state engine; narration/UI are adapters."""
    def __init__(self, seed: int = 1337):
        self.rng = Random(seed)
        self.state = GameState()

    def grant_item(self, item: str, count: int = 1) -> None:
        self.state.inventory[item] = self.state.inventory.get(item, 0) + count

    def apply_effects(self, effects: dict[str, Any]) -> None:
        self.state.credits += int(effects.get("credits", 0))
        self.state.xp += int(effects.get("xp", 0))
        self.state.flags.update(effects.get("flags", []))
        for faction, delta in effects.get("factionRep", {}).items():
            self.state.faction_rep[faction] = max(-100, min(100, self.state.faction_rep.get(faction, 0) + int(delta)))
        quest = effects.get("quest")
        if quest:
            self.state.quests[quest] = "active"

    def skill_check(self, skill: int, difficulty: int) -> dict[str, int | bool]:
        roll = self.rng.randint(1, 20)
        total = roll + skill
        return {"roll": roll, "total": total, "difficulty": difficulty, "success": total >= difficulty, "critical": roll == 20}

    def combat_round(self, attack: int, defense: int, damage: int) -> dict[str, int | bool]:
        result = self.skill_check(attack, defense)
        dealt = damage if result["success"] else 0
        if result["critical"]:
            dealt *= 2
        return {**result, "damage": dealt}

    def choose(self, next_scene: str, effects: dict[str, Any] | None = None) -> GameState:
        self.apply_effects(effects or {})
        self.state.scene = next_scene
        return self.state
