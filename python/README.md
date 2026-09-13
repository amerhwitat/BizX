# BizX Python

Python 3.10+ unified implementation of the BizX game platform and its Python-capable repository modules.

## One main Python application

`python/bizx` is the canonical runtime. It consolidates the game, NetworkUnified, UnifiedGame launcher, 3D, game-assets, game-store, network, rendering, scripts and web feature families into one Python process and one `BizXRuntime` facade.

```bash
cd python
python -m bizx
python -m bizx --health
python -m bizx --manifest
python -m bizx --gui
python -m bizx tycoon
```

## Integrated feature surface

- `bizx/game` — progression, survival and tycoon game logic
- `bizx/modules/NetworkUnifiedService` — NetworkUnified message envelopes, routing, IP classification, allowlisting and guarded TCP checks
- `bizx/modules/GameLauncherService` — UnifiedGame/launcher/python command surface
- `bizx/modules/Scene3D` — 3D scene graph and perspective projection
- `bizx/modules/RenderingService` — renderer-independent capabilities and asset checksums
- `bizx/modules/GameAssetService` — game-assets catalog and licensed asset records
- `bizx/modules/GameStoreService` — game-store products and catalog model
- `bizx/modules/NetworkService` — lobby/presence state
- `bizx/modules/ScriptInventory` — Python build/test/package command descriptors
- `bizx/modules/WebService` — web/game-UI route registry and HTTPS validation
- `bizx/modules/AssetBrowserService` — HTTPS asset-source boundary
- `bizx/modules/InternetScanner` — authorization-aware scanner facade
- `bizx/modules/CryptoService` + `bizx/wallet` — cryptography and provider-bound wallet/payment interfaces
- `bizx/catalog`, `bizx/payments`, `bizx/monetization` — economy and payment services
- `bizx/gui.py` — GUI adapter using the same runtime

## Source-tree conversion

The requested repository trees are represented by a machine-readable manifest and a documented compatibility map in `docs/FEATURE_CONVERSION_MAP.md`. Original native/web directories are retained so existing non-Python applications continue to build; their feature contracts are exposed through the canonical Python implementation.

```bash
python -m bizx --manifest
```

## Safety boundaries

- Network checks are non-destructive and public targets must be explicitly allowlisted.
- Asset sources must use HTTPS; downloads are explicit and are not auto-executed.
- Game-store settlement remains provider-bound.
- Cryptocurrency is optional and is not required for free gameplay.
- Private keys, seed phrases and credentials are never generated into source or logs by these integration adapters.

## Requirements

The core runtime uses Python's standard library. Tkinter is required only for the optional desktop GUI.

```bash
python -m pip install -r requirements.txt
```

## Tests

```bash
python -m pytest -q
```

See `docs/UNIFIED_RUNTIME.md` and `docs/FEATURE_CONVERSION_MAP.md` for the complete architecture and conversion map.
