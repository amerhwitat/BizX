package io.amerhwitat.bizx;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class UnifiedBizXRuntimeTest {
    @Test void exposesAllFeatureFamilies() {
        var r = new UnifiedBizXRuntime();
        assertTrue(r.features().contains("game"));
        assertTrue(r.features().contains("NetworkUnified"));
        assertTrue(r.features().contains("crypto"));
        assertTrue(r.features().contains("3D"));
        assertTrue(r.features().contains("game-store"));
    }

    @Test void sha256IsDeterministic() {
        assertEquals("d5de73ee1d25f202d90d5a3e8c6eb4e90b1d23ecfad9a9b828c8a6ed8f322b18", new UnifiedBizXRuntime().sha256("BizX-test-placeholder"));
    }
}
