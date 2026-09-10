# BizX Python

Python 3.10+ implementation of BizX business services and integration boundaries.

## Single-point game entry

The canonical Python launcher is `bizx.game_launcher.main()`. The package module entry `python -m bizx` delegates to the same function, providing one application start path for Python consumers.

```bash
cd python
python -m bizx
```

The launcher is also directly executable as a module file when the package is available on `PYTHONPATH`:

```bash
python -m bizx.game_launcher
```

## Test

```bash
python -m unittest discover -s tests
```

## Package layout

- `bizx/core` — core health/runtime model
- `bizx/wallet` — wallet provider / JSON-RPC boundary
- `bizx/catalog` — catalog service
- `bizx/payments` — payment lifecycle model
- `bizx/api` — API boundary
- `bizx/cli` — command-line utilities
- `bizx/game_launcher.py` — single-point game/application entry
- `bizx/__main__.py` — package entry delegating to the launcher
- `tests` — standard-library unit tests

Python source is isolated under this directory and does not mix with Node.js, browser JavaScript, TypeScript, Java, or native source. See `../docs/GAME_ENTRYPOINTS.md` for the cross-language launcher contract.
