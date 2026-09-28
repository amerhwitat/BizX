#!/usr/bin/env python3
from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 m=json.loads((ROOT/'retro-manifest.json').read_text())
 for v in m['implemented'].values():
  if 'image' in v: assert (ROOT/v['image']).is_file(), v['image']
 for p in (ROOT/'media/cbm').glob('*.d64'):
  assert len(p.read_bytes())==174848, f'{p}: D64 size'
 b=(ROOT/'media/atari8/BizX-Atari800.atr').read_bytes(); assert b[:2]==b'\x96\x02' and len(b)==92176
 assert len((ROOT/'media/apple2/BizX-AppleII.dsk').read_bytes())==143360
 b=(ROOT/'media/zxspectrum/BizX-ZXSpectrum.tap').read_bytes(); o=nblocks=0
 while o<len(b):
  assert o+2<=len(b); n=b[o]|b[o+1]<<8; o+=2; assert n>=2 and o+n<=len(b); o+=n; nblocks+=1
 assert nblocks>=2
 b=(ROOT/'media/amstradcpc/BizX-AmstradCPC.dsk').read_bytes(); assert b[:8]==b'MV - CPC' and len(b)==194816
 assert len((ROOT/'media/msx/BizX-MSX.dsk').read_bytes())==368640
 assert len((ROOT/'media/bbc/BizX-BBCMicro.ssd').read_bytes())==204800
 assert len((ROOT/'media/trs80/BizX-TRS80.dsk').read_bytes())==184320
 assert len((ROOT/'media/amiga/BizX-Amiga500.adf').read_bytes())==901120
 assert len((ROOT/'media/atarist/BizX-AtariST.st').read_bytes())==368640
 print(json.dumps({'status':'structural-ok','media_sha256':{str(p.relative_to(ROOT)):sha(p) for p in ROOT.rglob('*') if p.is_file() and 'media' in p.parts}},indent=2))
if __name__=='__main__': main()
