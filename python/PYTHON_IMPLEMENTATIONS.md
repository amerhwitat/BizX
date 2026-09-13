# BizX Python implementation layout

All Python application code is grouped under `python/` or under the owning feature's `python/` directory. Reusable modules remain importable; GUI entry points are separate from domain logic.

## Network and chat

`bizx.network` contains the shared TCP transport for private/LAN peer-to-peer and client-server text chat. It uses length-prefixed UTF-8 JSON, an application token, bounded messages, and no unsolicited public discovery.

Feature implementations such as `NetworkUnified`, `InternetScanner`, `AssetBrowser`, `emailsender`, and `marketplace/crypto` keep their Python code, requirements, and packaging automation together.

## Build

Each executable Python implementation should provide `requirements.txt`, optional `requirements-dev.txt`, and `build_pyinstaller.bat`, `build_pyinstaller.ps1`, and `build_pyinstaller.sh` (or an equivalent feature-local launcher). PyInstaller is a development/build dependency, not a runtime dependency.
