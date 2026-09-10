package io.amerhwitat.bizx.payments;

import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

public final class PaymentService {
    public Payment create(String asset, BigDecimal amount) {
        Objects.requireNonNull(asset); Objects.requireNonNull(amount);
        if (amount.signum() <= 0) throw new IllegalArgumentException("amount must be positive");
        return new Payment(UUID.randomUUID().toString(), asset, amount, "created");
    }
    public record Payment(String id, String asset, BigDecimal amount, String status) {}
}
