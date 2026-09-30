#!/usr/bin/env python3
"""Policy-first BizX Game Vault build planner/runner."""
import argparse,json,pathlib,subprocess,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
VAULT=ROOT/"manifests/game-vault.json"; BUILDS=ROOT/"manifests/game-builds.json"
def load(p): return json.loads(p.read_text(encoding="utf-8"))
def errors(v,b):
    out=[]
    if v.get("schema")!="bizx-game-vault-v1": out.append("invalid vault schema")
    if b.get("schema")!="bizx-game-build-manifest-v1": out.append("invalid build manifest schema")
    ids={x.get("id") for x in v.get("entries",[])+v.get("originals",[])}
    for g in b.get("games",[]):
        if g.get("id") not in ids: out.append("target absent: "+str(g.get("id")))
        if g.get("revision")=="PIN_REQUIRED": out.append("unpinned revision: "+str(g.get("id")))
        if g.get("license_status")!="VERIFIED": out.append("license not verified: "+str(g.get("id")))
        if g.get("asset_status")!="VERIFIED": out.append("asset license not verified: "+str(g.get("id")))
    return out
def main():
    p=argparse.ArgumentParser(); p.add_argument("--check",action="store_true"); p.add_argument("--plan",action="store_true"); p.add_argument("--run"); p.add_argument("--source-root",default="."); a=p.parse_args()
    v,b=load(VAULT),load(BUILDS); es=errors(v,b)
    if a.check or a.plan or a.run:
        for e in es: print("POLICY:",e,file=sys.stderr)
    if a.plan:
        for g in b["games"]: print(f"{g['id']}: {g['state']} revision={g['revision']}")
    if a.run:
        g=next((x for x in b["games"] if x["id"]==a.run),None)
        if not g or es: return 2
        if not g.get("build_command"): return 3
        subprocess.run(g["build_command"],cwd=a.source_root,shell=True,check=True)
    return 1 if es and a.check else 0
if __name__=="__main__": raise SystemExit(main())
