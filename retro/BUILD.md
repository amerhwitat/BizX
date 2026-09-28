# BizX Retro Media Build

## Implemented now

The first native media set is the Commodore family. The C64 edition contains an actual tokenized BASIC program inside a standard 1541-style D64, plus PRG, T64 and TAP media.

VICE documents D64/G64/P64 disk support and T64/TAP tape support; TAP is preferred for actual tape emulation. The repository intentionally does not include machine ROMs.

## Emulator smoke test

When VICE is installed:

    x64sc -autostart retro/media/cbm/BizX-C64.d64

For a tape test, attach `retro/media/cbm/BizX-C64.tap` to the virtual datasette and use the emulator tape/autostart controls.

The CI workflow performs structural validation and, when VICE is available on the runner, a bounded C64 autostart smoke test.

## Retro target matrix

The architecture tracks native editions for:

- Commodore 64 / 128 / VIC-20 / Plus/4 / PET
- Atari 8-bit
- Apple II
- ZX Spectrum
- Amstrad CPC
- MSX
- BBC Micro
- TRS-80
- Amiga 500
- Atari ST

Each non-CBM target must use its native image format and CPU/BASIC/OS contract. A file is not renamed to a foreign extension merely to claim compatibility.
