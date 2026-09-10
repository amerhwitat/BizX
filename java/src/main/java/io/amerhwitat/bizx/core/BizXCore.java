package io.amerhwitat.bizx.core;

import java.util.Map;

public final class BizXCore {
    private final String name;
    private final String version;

    public BizXCore() { this("BizX", "1.0.0"); }
    public BizXCore(String name, String version) { this.name = name; this.version = version; }

    public Map<String, String> health() {
        return Map.of("name", name, "version", version, "status", "ok", "runtime", "java");
    }
}
