"""Deterministic AAA-style systemic simulation primitives for BizX."""
from dataclasses import dataclass, field
import random

@dataclass
class WorldCell:
    cell_id: str; seed: int; biome: str; population: int = 0; weather: str = "clear"; loaded: bool = False

@dataclass
class NPC:
    npc_id: str; faction: str; x: float = 0.0; y: float = 0.0; z: float = 0.0
    food: float = 1.0; rest: float = 1.0; safety: float = 1.0; state: str = "idle"

@dataclass
class Vehicle:
    vehicle_id: str; owner: str; fuel: float = 100.0; durability: float = 100.0
    cargo_capacity: int = 10; cargo: int = 0; speed: float = 1.0

@dataclass
class WorldEvent:
    event_id: str; kind: str; remaining: int; effects: dict = field(default_factory=dict)

class AAASystems:
    def __init__(self, seed: int = 1):
        self.rng = random.Random(seed); self.tick = 0
        self.cells: dict[str, WorldCell] = {}; self.npcs: dict[str, NPC] = {}
        self.vehicles: dict[str, Vehicle] = {}; self.events: list[WorldEvent] = []
        self.prices: dict[str, float] = {}; self.abilities: dict[str, dict] = {}

    def add_cell(self, cell: WorldCell): self.cells[cell.cell_id] = cell
    def add_npc(self, npc: NPC): self.npcs[npc.npc_id] = npc
    def add_vehicle(self, vehicle: Vehicle): self.vehicles[vehicle.vehicle_id] = vehicle
    def register_ability(self, ability_id: str, resource: float, cooldown: int, effects: dict):
        self.abilities[ability_id] = {"resource": resource, "cooldown": cooldown, "effects": dict(effects)}
    def trigger_event(self, event_id: str, kind: str, duration: int, effects: dict | None = None):
        self.events.append(WorldEvent(event_id, kind, duration, effects or {}))
    def tick_once(self):
        self.tick += 1
        for npc in self.npcs.values():
            npc.food = max(0.0, npc.food - 0.005); npc.rest = max(0.0, npc.rest - 0.003)
            npc.state = "flee" if npc.safety < 0.25 else ("seek_food" if npc.food < 0.25 else ("sleep" if npc.rest < 0.2 else "work"))
        for event in self.events: event.remaining -= 1
        self.events = [e for e in self.events if e.remaining > 0]
    def market_update(self, good: str, supply: float, demand: float) -> float:
        price = max(0.01, (demand + 1.0) / (supply + 1.0))
        self.prices[good] = round(price, 4); return self.prices[good]
    def resolve_ability(self, ability_id: str, base_damage: int, defense: int = 0) -> dict:
        a = self.abilities[ability_id]; roll = self.rng.randint(1, 20); hit = roll + 5 >= defense
        return {"hit": hit, "critical": roll == 20, "damage": base_damage * (2 if roll == 20 else 1) if hit else 0, "effects": a["effects"]}
    def snapshot(self) -> dict:
        return {"tick": self.tick, "cells": {k: vars(v) for k,v in self.cells.items()}, "npcs": {k: vars(v) for k,v in self.npcs.items()}, "prices": self.prices.copy()}
