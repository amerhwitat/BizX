package io.amerhwitat.bizx.unified;

import java.net.InetAddress;
import java.security.MessageDigest;
import java.util.*;

/** Canonical Java feature-parity facade for the BizX game platform. */
public final class UnifiedBizXRuntime {
    public record Vec3(double x, double y, double z) {}
    public record Asset(String id, String license, String uri) {}
    public record StoreProduct(String id, String title, long priceMinor) {}
    public record NetworkResult(String target, boolean allowed, String classification) {}

    public Map<String,Object> health() {
        return Map.of("status", "ok", "implementation", "java", "modules", modules());
    }

    public List<String> modules() {
        return List.of("game", "network", "network_unified", "launcher", "internet_scanner",
                "asset_browser", "crypto", "web", "3d", "game_assets", "game_store", "rendering", "scripts");
    }

    public Vec3 project(Vec3 p, double width, double height, double cameraZ) {
        double z = p.z() - cameraZ;
        if (z >= -1e-9) throw new IllegalArgumentException("point is behind camera");
        double scale = 1.0 / -z;
        return new Vec3(width / 2.0 + p.x() * scale * width / 2.0,
                height / 2.0 - p.y() * scale * height / 2.0, -z);
    }

    public NetworkResult authorize(String host, Set<String> publicAllowlist) throws Exception {
        InetAddress address = InetAddress.getByName(host);
        boolean local = address.isAnyLocalAddress() || address.isLoopbackAddress() ||
                address.isLinkLocalAddress() || address.isSiteLocalAddress();
        boolean allowed = local || publicAllowlist.contains(address.getHostAddress());
        return new NetworkResult(host, allowed, local ? "local/intranet" : "public");
    }

    public byte[] sha256(byte[] data) throws Exception {
        return MessageDigest.getInstance("SHA-256").digest(data);
    }

    public String cryptoIntent(String provider, String currency, long amountMinor) {
        if (provider == null || provider.isBlank()) throw new IllegalArgumentException("provider required");
        if (amountMinor < 0) throw new IllegalArgumentException("amount must be non-negative");
        return provider + ":" + currency + ":" + amountMinor + ":UNSIGNED";
    }
}
