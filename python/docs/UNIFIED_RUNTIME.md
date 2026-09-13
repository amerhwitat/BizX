# BizX Unified Python Runtime

The `python/bizx` package is the canonical Python implementation. Repository-level Python implementations that previously lived under separate feature folders are represented through one runtime facade so the game can access the same services from a single process.

## Integrated capabilities

| Area | Unified module | Source capability represented |
|---|---|---|
| Core game | `bizx.game`, `BizXRuntime` | progression, survival, tycoon |
| Networking | `bizx.modules.network` | NetworkUnified API, interfaces, TCP checks |
| Authorized scanning | `bizx.modules.scanner` | InternetScanner classification/authorization |
| 3D | `bizx.modules.render3d` | dependency-free scene model and perspective projection for GUI adapters |
| Assets | `bizx.modules.assets` | AssetBrowser HTTPS catalog/download boundary |
| Crypto | `bizx.modules.crypto` | crypto policy, hashes/HMAC, payment intents, external-wallet boundary |
| Payments | `bizx.payments` | game payment lifecycle |
| Monetization | `bizx.monetization` | monetization routing |
| Wallet | `bizx.wallet` | provider boundary; no private-key logging |
| Catalog | `bizx.catalog` | game/store catalog |
| Email | `bizx.modules.email` | validated send-ready email boundary |
| Mobile state | `bizx.modules.mobile` | cross-platform session state |

## Entry points

Headless runtime:

```bash
cd python
python -m bizx
```

Health/module inventory:

```bash
python -m bizx --health
```

Native GUI:

```bash
python -m bizx --gui
```

Tycoon mode:

```bash
python -m bizx tycoon
```

## Design rules

1. Existing feature directories remain available for compatibility; `python/bizx` is the canonical integration layer.
2. Network scanning is authorization-aware and does not silently enable public-target scanning.
3. Asset downloads require HTTPS and an allowlisted provider host and extension.
4. Crypto mode defaults to `free`; transaction intents do not contain private keys or seed phrases.
5. Mainnet submission is deliberately delegated to an explicitly configured external provider/wallet boundary.
6. 3D functionality uses a small dependency-free scene/projection core so the main Python runtime remains installable on standard Python distributions.
7. Optional GUI functionality is isolated behind Tkinter and does not make headless operation depend on a display server.

## Testing

The unified contract is covered by `tests/test_unified_runtime.py` and should be run together with the existing Python test suite.
