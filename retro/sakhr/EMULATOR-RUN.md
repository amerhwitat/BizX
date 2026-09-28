# BizX Sakhr AX-170 / AX-230 emulation

The BizX retro target supports the Sakhr AX-170 and AX-230 MSX1 machines.

## MAME

MAME currently exposes the machines as:

- `ax170`
- `ax230`

Example:

```bash
mame ax170 -cart1 retro/dist/sakhr-msx/BizX-Sakhr-AX-170.rom
mame ax230 -cart retro/dist/sakhr-msx/BizX-Sakhr-AX-230.rom
```

The exact cartridge option can vary with the installed MAME build; run
`mame -showusage` to inspect the local option names.

## openMSX

openMSX can load MSX cartridge ROMs directly. Select an MSX1 machine matching
the Sakhr class and attach the generated cartridge image.

## Firmware

Sakhr proprietary firmware/BIOS dumps are intentionally not included. The
generated BizX images are deterministic cartridge artifacts and are not a
replacement for the original machine firmware.

## Certification

Image generation is automated. Emulator execution remains a separate
certification step; a generated ROM must not be described as emulator-certified
until MAME/openMSX execution has been observed and recorded.
