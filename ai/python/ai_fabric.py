from __future__ import annotations
from dataclasses import dataclass, field
from typing import Any

DISCIPLINES = ("ml", "dl", "rl", "symbolic_ai", "computer_vision", "nlp")

@dataclass
class AIRequest:
    discipline: str
    task: str
    data_kind: str
    provider: str | None = None
    parameters: dict[str, Any] = field(default_factory=dict)
    provenance: dict[str, Any] = field(default_factory=dict)

    def validate(self) -> None:
        if self.discipline not in DISCIPLINES:
            raise ValueError(f"Unknown AI discipline: {self.discipline}")
        if not self.task or not self.data_kind:
            raise ValueError("task and data_kind are required")

class AIFabric:
    disciplines = DISCIPLINES
    def create(self, discipline: str, task: str, data_kind: str, **kwargs: Any) -> AIRequest:
        request = AIRequest(discipline, task, data_kind, **kwargs)
        request.validate()
        return request
