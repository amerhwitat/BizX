# BizX Python feature conversion map

The canonical application is `python/bizx`. Feature-specific source trees remain intact for their native consumers, while their Python behavior is consolidated behind one runtime facade.

| BizX source tree | Canonical Python surface |
|---|---|
| `game` | `bizx.game` + runtime `game` module |
| `NetworkUnified` | `NetworkUnifiedService` |
| `UnifiedGame/launcher/python` | `GameLauncherService` |
| `3D` | `Scene3D` |
| `game-assets` | `GameAssetService` |
| `game-store` | `GameStoreService` |
| `network` | `NetworkService` + `NetworkUnifiedService` |
| `rendering` | `RenderingService` |
| `scripts` | `ScriptInventory` |
| `web` | `WebService` |
| `AssetBrowser` | `AssetBrowserService` |
| `InternetScanner` | `InternetScanner` |
| `crypto` | `CryptoService` + `wallet` |

## Design

- One executable entry point: `python -m bizx`.
- One runtime object: `BizXRuntime`.
- Headless, GUI, game and web-facing services share the same objects.
- Network inspection preserves authorization controls and does not enable arbitrary public scanning.
- Asset browsing accepts HTTPS sources and requires an explicit download action.
- Store/payment settlement remains provider-bound; free game operation does not require crypto.
- 3D has a dependency-free scene graph and perspective projection core; GPU engines remain optional adapters.
- Shell/BAT/PowerShell build operations are represented by Python command descriptors rather than executed implicitly.

## Compatibility

The original source directories are intentionally retained. This avoids breaking Unity, native, web or language-specific builds while allowing the Python application to consume the same feature model.

Use:

```bash
cd python
python -m bizx --health
python -m bizx --manifest
python -m bizx --gui
```
