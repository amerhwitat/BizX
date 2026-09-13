"""Canonical mapping from BizX feature trees to the unified Python runtime."""
from __future__ import annotations

SOURCE_TO_PYTHON = {
    "game": "bizx.game",
    "NetworkUnified": "bizx.modules.NetworkUnifiedService",
    "UnifiedGame/launcher/python": "bizx.modules.GameLauncherService",
    "3D": "bizx.modules.Scene3D",
    "game-assets": "bizx.modules.GameAssetService",
    "game-store": "bizx.modules.GameStoreService",
    "network": "bizx.modules.NetworkService + NetworkUnifiedService",
    "rendering": "bizx.modules.RenderingService",
    "scripts": "bizx.modules.ScriptInventory",
    "web": "bizx.modules.WebService",
    "AssetBrowser": "bizx.modules.AssetBrowserService",
    "InternetScanner": "bizx.modules.InternetScanner",
}


# Files/directories which remain source-specific are not silently deleted. Their
# behavior is represented here and can be called from the canonical runtime.
SOURCE_POLICIES = {
    "3D": "dependency-free Python scene/projection model; optional GPU frontends remain adapters",
    "game-assets": "catalog metadata is Python-native; only explicitly licensed assets may be bundled",
    "game-store": "catalog/storyboard/card metadata is Python-native; payment settlement stays provider-bound",
    "web": "route model is Python-native; browser clients remain transport/UI frontends",
    "scripts": "commands are exposed as safe descriptors; execution is explicit",
    "NetworkUnified": "authorization and local/private target guardrails are preserved",
}


def manifest() -> dict[str, object]:
    return {"source_to_python": dict(SOURCE_TO_PYTHON), "policies": dict(SOURCE_POLICIES)}
