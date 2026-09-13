#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
. .venv/bin/activate
pyinstaller --noconfirm --clean --windowed --name BizX bizx/gui.py
