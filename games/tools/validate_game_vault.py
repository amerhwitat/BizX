#!/usr/bin/env python3
"""Validate Game Vault provenance and build metadata."""
from __future__ import annotations
import hashlib,json,pathlib,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
MANIFEST=ROOT/"manifests/game-vault.json"; BUILDS=ROOT/"manifests/game-builds.json"
ALLOWED={"CATALOGED","SOURCE_ONLY","BUILT","OPTIONAL","REQUIRES_EXTERNAL_ASSETS","LICENSE_RESTRICTED","PLATFORM_SPECIFIC","PLANNED"}
def main():
    errors=[]; data=json.loads(MANIFEST.read_text()); builds=json.loads(BUILDS.read_text())
    if data.get("schema")!="bizx-game-vault-v1": errors.append("invalid vault schema")
    if builds.get("schema")!="bizx-game-build-manifest-v1": errors.append("invalid build manifest schema")
    ids={e.get("id") for e in data.get("entries",[])+data.get("originals",[])}
    for e in data.get("entries",[])+data.get("originals",[]):
        if not e.get("id") or not e.get("status"): errors.append(f"missing id/status: {e}")
        if e.get("status") not in ALLOWED: errors.append(f"invalid status: {e.get('id')}")
        if e.get("status")!="PLANNED" and not e.get("source"): errors.append(f"missing source: {e.get('id')}")
    for g in builds.get("games",[]):
        if g.get("id") not in ids: errors.append(f"build target absent from vault: {g.get('id')}")
        for k in ("source","revision","license_status","asset_status","state"):
            if not g.get(k): errors.append(f"{g.get('id')} missing {k}")
    print("game-vault manifest sha256="+hashlib.sha256(MANIFEST.read_bytes()).hexdigest())
    print("game-build manifest sha256="+hashlib.sha256(BUILDS.read_bytes()).hexdigest())
    for e in errors: print("ERROR:",e,file=sys.stderr)
    return 1 if errors else 0
if __name__=="__main__": raise SystemExit(main())
