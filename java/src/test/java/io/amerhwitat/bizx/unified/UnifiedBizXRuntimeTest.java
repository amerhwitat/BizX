package io.amerhwitat.bizx.unified;

import static org.junit.jupiter.api.Assertions.*;
import java.util.Set;
import org.junit.jupiter.api.Test;

class UnifiedBizXRuntimeTest {
    @Test void exposesAllFeatureFamilies() {
        var r = new UnifiedBizXRuntime();
        assertEquals(13, r.modules().size());
        assertEquals("ok", r.health().get("status"));
    }
    @Test void projectsOriginDeterministically() {
        var r = new UnifiedBizXRuntime();
        var p = r.project(new UnifiedBizXRuntime.Vec3(0,0,0),800,600,5);
        assertEquals(400.0,p.x()); assertEquals(300.0,p.y());
    }
    @Test void cryptoIsProviderBound() {
        var r = new UnifiedBizXRuntime();
        assertThrows(IllegalArgumentException.class, () -> r.cryptoIntent("", "TEST", 1));
        assertTrue(r.cryptoIntent("demo-provider","TEST",1).endsWith(":UNSIGNED"));
    }
    @Test void networkPublicTargetsNeedAllowlist() throws Exception {
        var r = new UnifiedBizXRuntime();
        var result = r.authorize("8.8.8.8", Set.of());
        assertFalse(result.allowed());
    }
}
