#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "\${BASH_SOURCE[0]}")/../.." && pwd)"
OUT="\${ROOT}/retro/dist/sakhr-emulators"
mkdir -p "\${OUT}"

export DEBIAN_FRONTEND=noninteractive
sudo apt-get update
sudo apt-get install -y mame openmsx

MAME_BIN="$(command -v mame || command -v /usr/games/mame)"
OPENMSX_BIN="$(command -v openmsx || command -v /usr/games/openmsx)"

install -m 0755 "\${MAME_BIN}" "\${OUT}/mame"
install -m 0755 "\${OPENMSX_BIN}" "\${OUT}/openmsx"

mame -version | head -n 1 > "\${OUT}/mame-version.txt" || true
openmsx -version 2>&1 | head -n 1 > "\${OUT}/openmsx-version.txt" || true

cat > "\${OUT}/README.txt" <<'EOF'
Sakhr AX-170 / AX-230 emulator binaries

This bundle contains emulator executables obtained from the host Linux distribution:
  - MAME
  - openMSX

The emulator programs are separate from Sakhr machine firmware. No proprietary
Sakhr BIOS/firmware ROMs are redistributed here. Supply legally obtained dumps
when an emulator requires them.

MAME machine targets:
  ax170
  ax230

The BizX cartridge images are under retro/dist/sakhr-msx/.
EOF

printf '%s\n' "Sakhr emulator binaries staged in \${OUT}"
