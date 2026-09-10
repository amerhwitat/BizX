package io.amerhwitat.bizx.api;

import io.amerhwitat.bizx.core.BizXCore;
import java.util.Map;

public final class BizXApi {
    private final BizXCore core;
    public BizXApi(BizXCore core) { this.core = core; }
    public Map<String, String> health() { return core.health(); }
}
