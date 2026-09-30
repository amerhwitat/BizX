# BizX Game Vault Architecture

The Game Vault is a source-first, provenance-aware home for open-source game research, legally redistributable dependencies, original BizX/Chimera games, storyboards and build metadata.

## Layout

```text
games/
  open-source/
  chimera-original/
  engines/
  storyboards/
  game-design-docs/
  asset-manifests/
  licenses/
  manifests/
  tools/
```

## Import states

- `CATALOGED`: researched and provenance recorded.
- `SOURCE_ONLY`: source may be inspected but is not redistributed by BizX.
- `BUILT`: reproducible target build completed.
- `OPTIONAL`: eligible for an optional bundle/ISO.
- `REQUIRES_EXTERNAL_ASSETS`: build needs separately obtained data.
- `LICENSE_RESTRICTED`: reference only.
- `PLATFORM_SPECIFIC`: limited to documented platforms.

Every imported file/package requires provider, source URL, version/revision, applicable license, asset-license status and SHA-256. Proprietary game content is never copied into the repository.

Original games consume the deterministic BizX simulation contracts and renderer-neutral snapshot pipeline. Aurora consumes a generated game registry rather than treating arbitrary binaries as trusted applications.
