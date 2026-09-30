#!/usr/bin/env python3
"""Validate BizX Game Vault provenance and package policy."""
from __future__ import annotations
import hashlib,json,pathlib,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
MANIFEST=ROOT/"manifests"/"game-vault.json"
ALLOWED={"CATALOGED","SOURCE_ONLY","BUILT","OPTIONAL","REQUIRES_EXTERNAL_ASSETS","LICENSE_RESTRICTED","PLATFORM_SPECIFIC","PLANNED"}
def main():
    data=json.loads(MANIFEST.read_text(encoding="utf-8")); errors=[]
    if data.get("schema")!="bizx-game-vault-v1": errors.append("invalid vault schema")
    for e in data.get("entries",[])+data.get("originals",[]):
        if not e.get("id") or not e.get("status"): errors.append(f"missing id/status: {e}")
        if e.get("status") not in ALLOWED: errors.append(f"invalid status: {e.get('id')}")
        if e.get("status")!="PLANNED" and not e.get("source"): errors.append(f"missing source: {e.get('id')}")
    print("game-vault manifest sha256="+hashlib.sha256(MANIFEST.read_bytes()).hexdigest())
    for e in errors: print("ERROR:",e,file=sys.stderr)
    return 1 if errors else 0
if __name__=="__main__": raise SystemExit(main())
