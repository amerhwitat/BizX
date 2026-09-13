#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
for d in python AssetBrowser/python InternetScanner/languages/python NetworkUnified/python emailsender/languages/python marketplace/crypto/python; do
  if [[ -f "$root/$d/requirements.txt" ]]; then echo "Installing $d"; python3 -m pip install -r "$root/$d/requirements.txt"; fi
done
