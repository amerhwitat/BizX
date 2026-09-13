#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
python3 -m pip install -r requirements-dev.txt
python3 -m PyInstaller --noconfirm --clean --windowed --onefile --name BizX-AssetBrowser app.py
