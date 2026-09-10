package io.amerhwitat.bizx;

import io.amerhwitat.bizx.core.BizXCore;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class BizXCoreTest {
    @Test void reportsJavaHealth() { assertEquals("java", new BizXCore().health().get("runtime")); }
}
