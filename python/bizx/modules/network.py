"""Public network compatibility module for the unified BizX runtime."""
from __future__ import annotations

from . import NetworkService as _NetworkService
from . import NetworkUnifiedService


class NetworkService(_NetworkService):
    """Presence API plus the stable target-classification helper."""

    @staticmethod
    def classify(target: str) -> str:
        return NetworkUnifiedService.classify(target)
