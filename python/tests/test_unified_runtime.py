import unittest

from bizx.unified import BizXRuntime
from bizx.modules.crypto import CryptoService, CryptoMode
from bizx.modules.network import NetworkService


class UnifiedRuntimeTests(unittest.TestCase):
    def test_runtime_exposes_all_core_modules(self):
        runtime = BizXRuntime()
        expected = {
            "game", "network", "scanner", "render3d", "assets", "crypto",
            "payments", "monetization", "wallet", "catalog", "email", "mobile"
        }
        self.assertTrue(expected.issubset(runtime.modules.keys()))

    def test_network_classification_is_local_for_loopback(self):
        self.assertEqual(NetworkService.classify("127.0.0.1"), "local/intranet")

    def test_crypto_defaults_to_safe_mode(self):
        crypto = CryptoService()
        self.assertEqual(crypto.mode, CryptoMode.FREE)
        self.assertFalse(crypto.can_submit_mainnet())

    def test_crypto_hash_is_deterministic(self):
        crypto = CryptoService()
        self.assertEqual(crypto.sha256_hex(b"BizX"), crypto.sha256_hex(b"BizX"))

    def test_wallet_activity_never_requires_private_key(self):
        intent = CryptoService().create_payment_intent(
            order_id="order-1", asset_id="asset-1", amount_minor=500, currency="USD"
        )
        self.assertEqual(intent["status"], "created")
        self.assertNotIn("private_key", intent)
        self.assertNotIn("seed_phrase", intent)


if __name__ == "__main__":
    unittest.main()
