# Sakhr Arabic Machine ROM Material

This directory provides reproducible acquisition, verification, and emulator integration for Sakhr / Al Alamiah Arabic MSX firmware used by the BizX Sakhr emulation work.

The ROM binaries are not committed to BizX. Historical firmware dumps are not assumed to be freely redistributable. BizX stores metadata, hashes, source locations, and a downloader so that a user who has the right to obtain/use the ROMs can acquire and verify them locally.

Covered machines:
- Sakhr AX-170 / AX-170F: Arabic firmware and main BIOS.
- Sakhr AX-230: IC125 main/Arabic ROM and IC127 games ROM.

Run:
    SAKHR_ROM_ACCEPT=1 ./emulators/sakhr/roms/fetch_sakhr_roms.sh

The AX-170 is documented as a 1986 Sakhr/Sanyo MSX1. The AX-230 is documented as a 1986-1993 Sakhr/Sanyo MSX1 with enhanced Arabic firmware.

Known identities:
AX-170:
- ax170arab.rom: 32768 bytes, CRC32 339cd1aa, SHA-1 0287b2ec897b9196788cd9f10c99e1487d7adbbb
- ax170bios.rom: 32768 bytes, CRC32 bd95c436, SHA-1 5e094fca95ab8e91873ee372a3f1239b9a48a48d

AX-230:
- IC125.BIN: 131072 bytes, SHA-1 0340707c5de2310dcf5e569b7db4c6a6a5590cb7
- IC127.BIN: 1048576 bytes, SHA-1 620a209bdfdb65a22380031fce654bd1df61def2

See sakhr_rom_manifest.json for source URLs and emulator roles.
