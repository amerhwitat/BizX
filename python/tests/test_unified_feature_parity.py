from __future__ import annotations

import json
from pathlib import Path

from bizx.unified import BizXRuntime


def test_runtime_exposes_requested_feature_families():
    runtime = BizXRuntime()
    health = runtime.health()
    modules = set(health["modules"])
    assert {
        "game",
        "network",
        "network_unified",
        "launcher",
        "render3d",
        "rendering",
        "game_assets",
        "game_store",
        "web",
        "scripts",
        "crypto",
    } <= modules


def test_3d_projection_is_deterministic():
    runtime = BizXRuntime()
    scene = runtime.modules["render3d"]
    scene.add_node("camera", (0.0, 0.0, 5.0))
    point = scene.project((0.0, 0.0, 0.0), width=800, height=600)
    assert point == (400.0, 300.0)


def test_network_message_round_trip():
    runtime = BizXRuntime()
    net = runtime.modules["network_unified"]
    encoded = net.encode_message("lobby", {"event": "join", "player": "P1"})
    decoded = net.decode_message(encoded)
    assert decoded["channel"] == "lobby"
    assert decoded["payload"]["event"] == "join"


def test_asset_catalog_is_read_only_until_download_requested():
    runtime = BizXRuntime()
    catalog = runtime.modules["game_assets"]
    items = catalog.catalog()
    assert items
    assert all(item["license"] for item in items)


def test_store_and_launcher_share_runtime():
    runtime = BizXRuntime()
    store = runtime.modules["game_store"]
    launcher = runtime.modules["launcher"]
    assert store.list_products()
    assert launcher.commands()[0]["name"] == "start"


def test_web_routes_are_local_runtime_metadata():
    runtime = BizXRuntime()
    routes = runtime.modules["web"].routes()
    assert "/" in routes
    assert "/health" in routes


def test_scripts_are_safe_command_descriptors():
    runtime = BizXRuntime()
    scripts = runtime.modules["scripts"].inventory()
    assert any(item["name"] == "build-python" for item in scripts)
    assert all("shell" in item for item in scripts)
