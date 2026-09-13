package io.amerhwitat.bizx

import kotlin.test.Test
import kotlin.test.assertTrue

class UnifiedBizXRuntimeTest {
    @Test fun exposesFeatureParity() {
        val features = UnifiedBizXRuntime().features
        assertTrue("game" in features)
        assertTrue("NetworkUnified" in features)
        assertTrue("crypto" in features)
        assertTrue("3D" in features)
    }
}
