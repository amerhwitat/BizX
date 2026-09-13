# BizX Python

Python 3.10+ implementation of BizX business services and integration boundaries.

## GUI-first entry

The canonical interactive entry point is now the native Tkinter application:

```bash
cd python
python -m bizx
```

The GUI provides mode selection, start/stop-safe interaction, status and live diagnostics without blocking the UI thread. The reusable engine remains available through `bizx.game_launcher.main()` for tests, automation and headless workflows.

Direct headless engine use:

```bash
python -m bizx.game_launcher
```

## Requirements

Install the local runtime declaration with:

```bash
python -m pip install -r requirements.txt
```

Tkinter is supplied by supported desktop Python distributions; Linux users may need their distribution's Tk package.

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
- `bizx/game_launcher.py` — reusable headless engine entry
- `bizx/gui.py` — native GUI application entry
- `bizx/__main__.py` — GUI-first package entry
- `tests` — standard-library unit tests

Python source remains isolated under this directory and does not mix with other language implementations.
