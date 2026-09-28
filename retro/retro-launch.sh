#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE="${1:-$ROOT/media/cbm/BizX-C64.d64}"
EMU="${BIZX_C64_EMULATOR:-x64sc}"
command -v "$EMU" >/dev/null || { echo 'Install VICE or set BIZX_C64_EMULATOR.' >&2; exit 2; }
exec "$EMU" -autostart "$IMAGE"
