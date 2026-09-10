import unittest
from bizx import BizXCore, WalletProvider, PaymentService

class BizXTests(unittest.TestCase):
    def test_health(self):
        self.assertEqual(BizXCore().health()["runtime"], "python")

    def test_wallet(self):
        wallet = WalletProvider(lambda payload: payload["method"])
        self.assertEqual(wallet.request("eth_chainId"), "eth_chainId")

    def test_payment(self):
        payment = PaymentService().create("TEST", "1.25")
        self.assertEqual(str(payment.amount), "1.25")

if __name__ == "__main__":
    unittest.main()
