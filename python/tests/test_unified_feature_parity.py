from __future__ import annotations

import unittest

from bizx.unified import BizXRuntime


class UnifiedFeatureParityTests(unittest.TestCase):
    def setUp(self) -> None:
        self.runtime = BizXRuntime()

    def test_runtime_exposes_requested_feature_families(self) -> None:
        modules = set(self.runtime.health()["modules"])
        self.assertTrue({
            "game", "network", "network_unified", "launcher", "render3d",
            "rendering", "game_assets", "game_store", "web", "scripts", "crypto",
        } <= modules)

    def test_3d_projection_is_deterministic(self) -> None:
        scene = self.runtime.modules["render3d"]
        scene.add_node("camera", (0.0, 0.0, 5.0))
        self.assertEqual(scene.project((0.0, 0.0, 0.0), width=800, height=600), (400.0, 300.0))

    def test_network_message_round_trip(self) -> None:
        net = self.runtime.modules["network_unified"]
        encoded = net.encode_message("lobby", {"event": "join", "player": "P1"})
        decoded = net.decode_message(encoded)
        self.assertEqual(decoded["channel"], "lobby")
        self.assertEqual(decoded["payload"]["event"], "join")

    def test_network_public_target_requires_allowlist(self) -> None:
        net = self.runtime.modules["network_unified"]
        self.assertFalse(net.authorize("8.8.8.8"))
        self.assertTrue(net.authorize("127.0.0.1"))

    def test_asset_catalog_requires_license_metadata(self) -> None:
        items = self.runtime.modules["game_assets"].catalog()
        self.assertTrue(items)
        self.assertTrue(all(item["license"] for item in items))

    def test_store_and_launcher_share_runtime(self) -> None:
        store = self.runtime.modules["game_store"]
        launcher = self.runtime.modules["launcher"]
        self.assertTrue(store.list_products())
        self.assertEqual(launcher.commands()[0]["name"], "start")

    def test_web_routes_are_runtime_metadata(self) -> None:
        routes = self.runtime.modules["web"].routes()
        self.assertIn("/", routes)
        self.assertIn("/health", routes)

    def test_scripts_are_safe_command_descriptors(self) -> None:
        scripts = self.runtime.modules["scripts"].inventory()
        self.assertTrue(any(item["name"] == "build-python" for item in scripts))
        self.assertTrue(all("shell" in item for item in scripts))


if __name__ == "__main__":
    unittest.main()
