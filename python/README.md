# BizX Python

Python 3.10+ unified implementation of the BizX game platform and its Python-capable repository modules.

## One main Python implementation

`python/bizx` is now the canonical integration layer. The unified runtime brings the existing game services together with NetworkUnified, InternetScanner, AssetBrowser, 3D rendering support, crypto/payment boundaries, email validation, mobile session state, catalog, wallet and monetization services.

Headless:

```bash
cd python
python -m bizx
```

Health and module inventory:

```bash
python -m bizx --health
```

Native Tkinter GUI:

```bash
python -m bizx --gui
```

Tycoon mode:

```bash
python -m bizx tycoon
```

The GUI and headless runtime use the same `BizXRuntime` facade rather than maintaining separate application logic.

## Integrated package layout

- `bizx/core` — core health/runtime model
- `bizx/game` — progression, survival and tycoon game logic
- `bizx/network` — chat/session networking compatibility layer
- `bizx/catalog` — catalog service
- `bizx/payments` — payment lifecycle
- `bizx/monetization` — monetization routing
- `bizx/wallet` — wallet/provider boundary
- `bizx/api` — API boundary
- `bizx/modules/network.py` — unified NetworkUnified networking facade
- `bizx/modules/scanner.py` — authorization-aware InternetScanner facade
- `bizx/modules/assets.py` — HTTPS asset browser/download service
- `bizx/modules/render3d.py` — dependency-free 3D scene and perspective projection
- `bizx/modules/crypto.py` — cryptography primitives and safe transaction intents
- `bizx/modules/email.py` — validated email boundary
- `bizx/modules/mobile.py` — cross-platform mobile session state
- `bizx/unified.py` — single application/runtime entry point
- `bizx/gui.py` — GUI adapter using the same runtime
- `tests` — standard-library unit tests

## Compatibility sources consolidated by the runtime

The unified package represents Python implementations previously located in `AssetBrowser/python`, `InternetScanner/languages/python`, `NetworkUnified/python`, `emailsender/languages/python`, `marketplace/crypto/python`, and `UnifiedGame/launcher/python`, while retaining those directories for compatibility and reference. The 3D subsystem is represented natively under `bizx/modules/render3d.py` so the Python application can participate in the repository's 3D pipeline without requiring a second Python application.

## Requirements

The core runtime uses Python's standard library. Tkinter is required only for the optional desktop GUI. Install the local declaration with:

```bash
python -m pip install -r requirements.txt
```

## Tests

```bash
python -m unittest discover -s tests
```

See `docs/UNIFIED_RUNTIME.md` for the complete integration map and security boundaries.
