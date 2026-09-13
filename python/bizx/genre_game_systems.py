"""Original genre-inspired deterministic systems for BizX."""
from dataclasses import dataclass, field

@dataclass
class VehicleState:
    speed: float = 0.0
    grip: float = 1.0
    fuel: float = 100.0
    durability: float = 100.0
    heat: float = 0.0

@dataclass
class FighterState:
    health: int = 100
    stamina: float = 100.0
    meter: float = 0.0
    frame: int = 0
    guarding: bool = False
    combo: int = 0

@dataclass
class OpenWorldState:
    wanted: int = 0
    territory: dict[str, int] = field(default_factory=dict)
    faction_rep: dict[str, int] = field(default_factory=dict)
    businesses: dict[str, float] = field(default_factory=dict)

class GenreGameSystems:
    """Small deterministic building blocks; presentation belongs to engine adapters."""
    def __init__(self):
        self.vehicle = VehicleState()
        self.fighter = FighterState()
        self.world = OpenWorldState()
        self.inputs: list[dict] = []

    def drive(self, throttle: float, brake: float, steering: float, dt: float = 1 / 60) -> VehicleState:
        throttle = max(0.0, min(1.0, throttle)); brake = max(0.0, min(1.0, brake))
        self.vehicle.speed = max(0.0, self.vehicle.speed + (throttle * 18.0 - brake * 28.0) * dt)
        self.vehicle.speed *= max(0.0, 1.0 - abs(steering) * (1.0 - self.vehicle.grip) * dt)
        self.vehicle.fuel = max(0.0, self.vehicle.fuel - throttle * 0.02)
        return self.vehicle

    def set_wanted(self, delta: int) -> int:
        self.world.wanted = max(0, min(5, self.world.wanted + delta)); return self.world.wanted

    def fighter_input(self, action: str) -> dict:
        self.fighter.frame += 1
        active = action in {"light", "heavy", "special"}
        damage = {"light": 6, "heavy": 12, "special": 20}.get(action, 0)
        if active: self.fighter.meter = min(100.0, self.fighter.meter + damage * 0.5)
        self.inputs.append({"frame": self.fighter.frame, "action": action})
        return {"frame": self.fighter.frame, "active": active, "damage": damage, "meter": self.fighter.meter}

    def apply_hit(self, damage: int, blocked: bool = False) -> int:
        final = max(1, damage // 4) if blocked else max(0, damage)
        self.fighter.health = max(0, self.fighter.health - final)
        self.fighter.combo = 0 if blocked else self.fighter.combo + 1
        return final

    def economy_tick(self, revenue: float, costs: float) -> float:
        value = revenue - costs
        for key in self.world.businesses:
            self.world.businesses[key] += value / max(1, len(self.world.businesses))
        return value
