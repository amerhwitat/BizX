# BizX ISO-Tool integration

BizX source can be processed by the ISO-Tool orchestration model from either a local checkout or an authorized remote repository.

## Entry points

`analyze-source`, `build-compiled-images`, `import-boot-image`, `build-iso`, and `validate-image` provide explicit workflow boundaries.

## Boot import

The GUI can inspect `.iso`, `.img`, and `.bin` files and stage a bounded boot-sector region. Imported bytes remain inert and are not executed during import.

## Offline recovery

Local source operation works without Internet access. Remote acquisition can monitor connectivity and retry network operations after connectivity returns. Network status and retry events appear in the live operation log.

## Runtime errors

A recoverable compiler, assembler, scanner, or optional packaging failure is logged, marked failed/skipped, and followed by the next independent job. Fatal safety, staging, authorization, or image-integrity conditions can still stop publication.

## Application details

The ISO-Tool desktop front ends show a live details section with current stage, job messages, recoverable errors, network state, status, and cumulative progress. The Python, WPF C#, and VC++ Win32 implementations follow the same behavior.

The canonical ISO-Tool implementation is maintained in `amerhwitat/nlp/ISO-Tool/`.
