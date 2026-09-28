#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$ROOT/binary"
if [[ "${SAKHR_ROM_ACCEPT:-0}" != "1" ]]; then
  echo "ROMs are historical firmware dumps; review your rights to obtain/use them."
  echo "Run with SAKHR_ROM_ACCEPT=1 to continue."
  exit 2
fi
command -v curl >/dev/null || { echo "curl is required"; exit 1; }
command -v sha1sum >/dev/null || { echo "sha1sum is required"; exit 1; }
mkdir -p "$OUT"
fetch(){
  local url="$1" file="$2" sha1="$3" size="$4"
  local dst="$OUT/$file" tmp="$dst.part"
  echo "[SAKHR] Fetching $file"
  curl -fL --retry 3 --retry-delay 2 --connect-timeout 20 -o "$tmp" "$url"
  [[ "$(wc -c < "$tmp" | tr -d " ")" == "$size" ]] || { echo "[ERROR] Size mismatch: $file"; rm -f "$tmp"; return 1; }
  [[ "$(sha1sum "$tmp" | awk "{print \$1}")" == "$sha1" ]] || { echo "[ERROR] SHA-1 mismatch: $file"; rm -f "$tmp"; return 1; }
  mv -f "$tmp" "$dst"
  echo "[OK] $file verified"
}
fetch "https://download.file-hunter.com/System%20ROMs/RomDB%20SystemROMs%20OpenMSX/OpenMSX%20SystemRoms%20Unknown%20%5Bax170_arabic%20-%20ax170arab.rom%5D%20%5B4454%5D.rom" "ax170arab.rom" "0287b2ec897b9196788cd9f10c99e1487d7adbbb" "32768"
fetch "https://download.file-hunter.com/System%20ROMs/RomDB%20SystemROMs%20OpenMSX/OpenMSX%20SystemRoms%20Unknown%20%5Bax170_basic-bios1%20-%20ax170bios.rom%5D%20%5B4574%5D.rom" "ax170bios.rom" "5e094fca95ab8e91873ee372a3f1239b9a48a48d" "32768"
fetch "https://download.file-hunter.com/System%20ROMs/RomDB%20SystemROMs%20OpenMSX/OpenMSX%20SystemRoms%20Unknown%20%5BIC125%20-%20qxxca0259.ic125%5D%20%5B4455%5D.rom" "IC125.BIN" "0340707c5de2310dcf5e569b7db4c6a6a5590cb7" "131072"
fetch "https://download.file-hunter.com/System%20ROMs/RomDB%20SystemROMs%20OpenMSX/OpenMSX%20SystemRoms%20Unknown%20%5BIC127%20-%20qxxca0270.ic127%5D%20%5B4579%5D.rom" "IC127.BIN" "620a209bdfdb65a22380031fce654bd1df61def2" "1048576"
echo "[SAKHR] All requested ROMs downloaded and verified."