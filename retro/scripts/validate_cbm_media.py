#!/usr/bin/env python3
from pathlib import Path
import hashlib, json
ROOT=Path(__file__).resolve().parents[1]
MEDIA=ROOT/'media'/'cbm'
def check_d64(p):
    b=p.read_bytes(); assert len(b)==174848, f'{p}: expected 174848 bytes, got {len(b)}'
    # BAM lives at track 18/sector 0; directory begins at track 18/sector 1.
    assert b[144844:144846] == bytes([18,1]), f'{p}: invalid BAM link'
    return hashlib.sha256(b).hexdigest()
def main():
    manifest=json.loads((ROOT/'retro-manifest.json').read_text())
    rows=[]
    for p in sorted(MEDIA.glob('*.d64')): rows.append((p.name,len(p.read_bytes()),check_d64(p)))
    assert (MEDIA/'BizX-C64.prg').read_bytes()[:2] == b'\x01\x08'
    tap=(MEDIA/'BizX-C64.tap').read_bytes(); assert tap[:12]==b'C64-TAPE-RAW'
    t64=(MEDIA/'BizX-C64.t64').read_bytes(); assert t64[:20].startswith(b'C64S tape image')
    print(json.dumps({'d64':rows,'tap_bytes':len(tap),'t64_bytes':len(t64)},indent=2))
if __name__=='__main__': main()
