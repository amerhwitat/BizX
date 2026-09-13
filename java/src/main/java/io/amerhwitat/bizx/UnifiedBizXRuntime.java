package io.amerhwitat.bizx;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

/** Canonical Java feature-parity facade. Platform engines remain replaceable adapters. */
public final class UnifiedBizXRuntime {
    private static final List<String> FEATURES = List.of(
        "game", "NetworkUnified", "launcher", "InternetScanner", "AssetBrowser",
        "crypto", "web", "3D", "game-assets", "game-store", "network", "rendering", "scripts"
    );

    public List<String> features() { return FEATURES; }

    public String sha256(String value) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8));
            StringBuilder out = new StringBuilder(64);
            for (byte b : digest) out.append(String.format("%02x", b));
            return out.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 unavailable", e);
        }
    }

    public GameSession startGame(String mode) {
        return new GameSession(mode == null || mode.isBlank() ? "default" : mode, "started", "java");
    }

    public record GameSession(String mode, String status, String runtime) {}
}
