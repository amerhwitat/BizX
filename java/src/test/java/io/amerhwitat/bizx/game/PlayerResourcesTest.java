package io.amerhwitat.bizx.game;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class PlayerResourcesTest {
    @Test void healthAmmoAndCheckpointFlow() {
        PlayerResources p = new PlayerResources();
        assertEquals(100, p.health());
        assertEquals(30, p.ammo());
        assertEquals(120, p.reserveAmmo());
        p.takeDamage(100);
        assertEquals("health", p.purchasePrompt().kind());
        p.consumeAmmo(30);
        p.useMedicalKit();
        assertNull(p.purchasePrompt(), "reserve ammo prevents an ammo-depleted prompt");
        p.consumeAmmo(120);
        assertEquals("ammo", p.purchasePrompt().kind());
        PlayerResources.Checkpoint checkpoint = p.saveCheckpoint();
        assertEquals(40, checkpoint.health());
        assertEquals(0, checkpoint.ammo());
        assertEquals(0, checkpoint.reserveAmmo());
        assertTrue(p.resumeFromCheckpoint(checkpoint));
    }
}
