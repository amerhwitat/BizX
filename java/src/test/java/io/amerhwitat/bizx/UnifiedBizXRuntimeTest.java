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
        assertEquals("9a3e7e8e8d5e4c4b8f6f3e2f4f0d6c7b3c2f8a6e9d1e0c5a4b7c8d9e0f1a2b3c", new UnifiedBizXRuntime().sha256("BizX-test-placeholder"));
    }
}
