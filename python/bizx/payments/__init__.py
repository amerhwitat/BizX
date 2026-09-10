from dataclasses import dataclass
from decimal import Decimal
from uuid import uuid4

@dataclass(frozen=True)
class Payment:
    id: str
    asset: str
    amount: Decimal
    status: str = "created"

class PaymentService:
    def create(self, asset, amount):
        value = Decimal(str(amount))
        if value <= 0:
            raise ValueError("amount must be positive")
        return Payment(str(uuid4()), asset, value)
