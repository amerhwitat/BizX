#!/usr/bin/env python3
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
m=json.loads((ROOT/'retro-manifest.json').read_text())
for k,v in m['implemented'].items():
 print(f"{k}: {v.get('image','Commodore media set')}")
print("Non-Commodore images are structural until target-specific emulator smoke tests pass.")
