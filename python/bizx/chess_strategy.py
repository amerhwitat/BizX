"""Native Python chess/strategy facade for BizX."""
from dataclasses import dataclass, field
from hashlib import sha256
from typing import Dict, List

@dataclass
class StrategyState:
    turn: int = 0
    resources: Dict[str, int] = field(default_factory=lambda: {"gold": 100, "food": 100, "science": 0})
    territory: List[str] = field(default_factory=list)

class ChessStrategy:
    def __init__(self):
        self.state = StrategyState()

    def strategy_tick(self, resource: str, amount: int) -> dict:
        self.state.resources[resource] = self.state.resources.get(resource, 0) + amount
        self.state.turn += 1
        return self.snapshot()

    def snapshot(self) -> dict:
        payload = f"{self.state.turn}|{sorted(self.state.resources.items())}|{self.state.territory}".encode()
        return {"turn": self.state.turn, "resources": dict(self.state.resources), "checksum": sha256(payload).hexdigest()}

    def chess_engine_command(self, fen: str, command: str = "go movetime 100") -> dict:
        return {"protocol": "UCI", "position": fen, "command": command, "adapter": "external-engine"}
