# BizX Python implementation layout

`python/bizx` is the canonical Python implementation and application integration layer. Feature-local Python directories remain for compatibility/reference, while their capabilities are represented by the unified runtime.

## Unified runtime

`bizx.unified.BizXRuntime` exposes one process-wide facade for:

- core game, progression, survival and tycoon
- networking and chat/session services
- authorization-aware InternetScanner functionality
- 3D scene/projection support
- in-game HTTPS asset browsing/downloading boundaries
- cryptography, crypto payment intents and external-wallet boundaries
- catalog, payments and monetization
- email validation/send-ready messages
- mobile session state

Run `python -m bizx --health` to print the module inventory.

## Consolidated feature sources

The canonical runtime represents the Python portions of `AssetBrowser/python`, `InternetScanner/languages/python`, `NetworkUnified/python`, `emailsender/languages/python`, `marketplace/crypto/python`, and `UnifiedGame/launcher/python`. These original directories are intentionally retained so existing feature-specific scripts and build workflows do not break.

The repository's 3D capability is integrated into `bizx.modules.render3d` as a dependency-free scene model and perspective projection core, allowing the unified Python application to participate in 3D workflows without creating another application entry point.

## Build

The runtime core uses the Python standard library. Tkinter is required for the optional GUI. PyInstaller is a development/build dependency. The canonical desktop build targets `bizx/gui.py` so the packaged executable opens the same GUI that controls the unified runtime.
