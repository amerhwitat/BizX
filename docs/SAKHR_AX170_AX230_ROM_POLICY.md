# Sakhr MSX AX-170 / AX-230 ROM & Emulator Integration

## Scope

BizX tracks reproducible emulation support for the Sakhr/Al Alamiah AX-170 and AX-230 MSX1 systems.

The public machine definitions and ROM checksums are documented by the MSX community and open-source emulator projects. The AX-170 is documented as an Arabic MSX1 with Z80/T7937-class hardware; the AX-230 is an Arabic localized Sanyo-derived MSX1. openMSX provides a machine definition for AX-230 and identifies its required system ROM by SHA-1.

## ROM policy

The original Sakhr firmware/system ROMs are copyrighted firmware. BizX does **not** redistribute third-party proprietary ROM dumps unless redistribution rights are established.

The repository therefore provides:

- emulator configuration and build tooling;
- checksum/identity manifests;
- ROM validation and installation helpers;
- source-code changes needed to emulate the machines;
- reproducible generation of non-proprietary test images;
- instructions for supplying a user-owned dump.

Users who own or are otherwise legally entitled to use a ROM dump can place it in the configured ROM pool and validate it locally.

## Known ROM identities

### AX-230

openMSX's AX-230 machine definition references:

- BIOS/Arabic firmware image: `IC125.BIN`
- SHA-1: `0340707c5de2310dcf5e569b7db4c6a6a5590cb7`
- Games ROM: `IC127.BIN`
- SHA-1: `620a209bdfdb65a22380031fce654bd1df61def2`

The exact ROM layout and slot mapping are maintained in the upstream openMSX machine definition.

### AX-170

MAME's current AX-170 driver identifies a good dump set and the community MAME metadata reports:

- `ax170bios.rom` — 32 KiB — CRC32 `bd95c436`
- `ax170arab.rom` — 32 KiB — CRC32 `339cd1aa`

The AX-170 machine definition should be treated as the authoritative runtime integration point for the emulator build used by BizX.

## Runtime installation

For openMSX, system ROMs belong in the user's `systemroms` pool. openMSX identifies ROMs primarily by SHA-1, so filenames are not sufficient for identity.

For MAME, provide the required ROM set through the normal MAME ROM-path mechanism. Do not commit proprietary dumps to this repository.

## Sources

- MSX Wiki: Sakhr AX-170 and AX-230
- openMSX machine configuration for Al Alamiah AX-230
- MAME MSX1 driver
- openMSX setup documentation

Last reviewed: 2026-09-29.
