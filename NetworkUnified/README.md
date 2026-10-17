# NetworkUnified

Unified, user-visible networking/API application for BizX. It exposes the same versioned API surface from each supported language and uses the existing InternetScanner authorization model.

## Safety

Active network operations are limited to local/private targets or explicitly allowlisted public assets. The service does not implement Internet-wide enumeration, credential attacks, evasion, spoofing, or exploitation.

## API

`GET /api/v1` — API catalog and capabilities
`GET /api/v1/health` — health/status
`GET /api/v1/config` — effective safe configuration
`POST /api/v1/classify` — classify an IP as local/intranet/public
`POST /api/v1/authorize` — evaluate a target against the allowlist
`POST /api/v1/tcp-check` — bounded TCP connect check for an authorized target
`GET /api/v1/interfaces` — local interface inventory

Default bind: `127.0.0.1:8787`.

## Implementations

`python/`, `node/`, `typescript/`, `go/`, `rust/`, `java/`, `csharp/`, `cpp/`, `dart/`, `kotlin/`, and `swift/` provide runnable API applications. Each reports the same catalog and normalized JSON shape.

## Launchers

From this directory:

- Windows CMD: `scripts\\run.bat`
- PowerShell: `scripts\\run.ps1`
- POSIX: `scripts/run.sh`

Set `NETWORK_API_PORT` to change the port.


## Browser GUI and CORS

A browser console is published at https://amerhwitat.github.io/apps/bizx-network/index.html. It supports health/config/interface inspection, classification of a single IP address, a server-side authorization check, and one bounded TCP connection attempt. It does not scan ranges or ports.

The Python service reads `NETWORK_API_CORS_ORIGINS` as a comma-separated exact-origin allowlist. Defaults permit local development origins on ports 3000 and 5173. To opt in to the published portfolio GUI, set `NETWORK_API_CORS_ORIGINS=https://amerhwitat.github.io`. Public IP targets must also be present in `NETWORK_API_ALLOWLIST`; CORS permission is not network-target authorization. Do not use wildcard origins or test systems without permission.
