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
