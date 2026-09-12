from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable, Sequence
import math

@dataclass(frozen=True)
class AssetFeatures:
    geometry: tuple[float, ...]
    texture: tuple[float, ...]
    animation: tuple[float, ...]
    motion: tuple[float, ...]
    world: tuple[float, ...]

    def vector128(self) -> tuple[float, ...]:
        raw = self.geometry + self.texture + self.animation + self.motion + self.world
        if not raw:
            raw = (0.0,)
        return tuple(raw[i % len(raw)] for i in range(128))

def summarize(values: Iterable[float], limit: int = 8) -> tuple[float, ...]:
    data = [float(v) for v in values]
    if not data:
        return (0.0,)
    mean = sum(data) / len(data)
    variance = sum((x - mean) ** 2 for x in data) / len(data)
    return tuple(data[: max(0, limit - 2)] + [mean, math.sqrt(variance)])[:limit]

def extract_features(vertices: Sequence[Sequence[float]] = (), texture_values: Iterable[float] = (), animation_values: Iterable[float] = (), motion_values: Iterable[float] = (), world_values: Iterable[float] = ()) -> AssetFeatures:
    coords = [float(c) for vertex in vertices for c in vertex]
    return AssetFeatures(
        geometry=summarize(coords),
        texture=summarize(texture_values),
        animation=summarize(animation_values),
        motion=summarize(motion_values),
        world=summarize(world_values),
    )
