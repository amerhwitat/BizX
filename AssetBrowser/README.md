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
