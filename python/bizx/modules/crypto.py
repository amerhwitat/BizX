"""Safe, deterministic crypto facade for the unified BizX runtime."""
from __future__ import annotations

from enum import Enum
import hashlib
from typing import Any


class CryptoMode(str, Enum):
    FREE = "free"
    PROVIDER = "provider"


class CryptoService:
    """Creates unsigned provider-bound intents; never stores or handles key material."""

    def __init__(self, mode: CryptoMode = CryptoMode.FREE) -> None:
        self.mode = CryptoMode(mode)

    def can_submit_mainnet(self) -> bool:
        # Submission requires an external provider and a separate user-confirmation flow.
        return False

    @staticmethod
    def sha256_hex(payload: bytes | str) -> str:
        data = payload.encode("utf-8") if isinstance(payload, str) else payload
        return hashlib.sha256(data).hexdigest()

    def create_payment_intent(
        self, *, order_id: str, asset_id: str, amount_minor: int, currency: str
    ) -> dict[str, Any]:
        if not order_id.strip() or not asset_id.strip() or not currency.strip():
            raise ValueError("order, asset, and currency are required")
        if isinstance(amount_minor, bool) or amount_minor <= 0:
            raise ValueError("amount_minor must be a positive integer")
        return {
            "order_id": order_id,
            "asset_id": asset_id,
            "amount_minor": amount_minor,
            "currency": currency.upper(),
            "status": "created",
            "mode": self.mode.value,
            "signing_required": True,
        }
