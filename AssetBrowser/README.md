# In-Game Free Asset Browser

Asset Browser adds an in-game/local GUI for discovering openly licensed game media, reviewing license/provenance metadata, downloading approved assets, and importing them into the game's `game_assets/` workspace.

## Providers

- Openverse: openly licensed images and audio. License metadata is shown and must be reviewed before use.
- Poly Haven: CC0 HDRIs, textures, and models. The live API requires a descriptive User-Agent and visible Poly Haven credit.
- Kenney: CC0 game assets. The browser uses curated official asset pages rather than scraping.

## Safety and licensing

Downloads are restricted to HTTPS URLs returned by configured providers. Archives/executables are not executed. The browser records source, license, attribution, SHA-256, and download time in `game_assets/manifest.json`. Users remain responsible for complying with the individual asset license and provider terms.

## GUI

Start with `scripts/run.bat`, `scripts/run.ps1`, or `scripts/run.sh`, then open the displayed local address. The GUI supports search, provider/type filters, license/provenance display, download, import into the game asset workspace, and manifest export.

## Configuration

`config/providers.json` contains provider endpoints and allowed download hosts. `ASSET_BROWSER_PORT` defaults to `8790`; `ASSET_BROWSER_DIR` can select the asset workspace.


## Browser GUI and local API

The shared browser interface is published at [BizX / BizXtreme Asset Browser](https://amerhwitat.github.io/apps/bizx-asset-browser/index.html). Run `python3 AssetBrowser/python/app.py` to start the local service (default port 8790). The GUI supports Openverse/Poly Haven/Kenney search, source/license review, installed manifest inspection and confirmed imports. It does not download files from GitHub Pages; imports are performed by the local service after confirmation.

The service uses the exact-origin `ASSET_BROWSER_CORS_ORIGINS` allowlist. Defaults allow local development origins only. To opt in to the published portfolio GUI, set `ASSET_BROWSER_CORS_ORIGINS=https://amerhwitat.github.io`. Do not use wildcard origins. The API validates provider download hosts and file extensions before saving imports; always review license terms before shipping assets.
