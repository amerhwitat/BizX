# InternetScanner security model

## Scan modes

1. **Local** — interface/subnet discovery and TCP/UDP probing on directly connected networks.
2. **Intranet** — explicit authorized CIDRs.
3. **Authorized public** — exact public IPs/hostnames placed in the allowlist.
4. **Metadata** — passive DNS/RDAP/registry enrichment without active probing.

Every active probe passes through the authorization policy before execution. A GUI request cannot bypass that policy.

## Protocol coverage

The engine models TCP and UDP separately and supports IPv4 and IPv6. UDP results must distinguish `open`, `closed`, and `open|filtered` where the available evidence cannot distinguish the state.

IPv6 local discovery uses interface/neighbor information where the operating system permits it; it does not attempt brute-force enumeration of an IPv6 address space.

## Vulnerability assessment

The assessment layer correlates observed service/product/version data with trusted vulnerability intelligence and reports:

- `NOT_VULN`
- `LIKELY_VULN` — version/product evidence suggests exposure but is not conclusive.
- `VULN` — safe evidence establishes the vulnerable condition.

The scanner does **not** execute exploits, denial-of-service tests, credential attacks, brute-force authentication, evasion, or destructive payloads.

Nmap's vulnerability library uses a similar distinction between likely and confirmed vulnerability states. Its NSE documentation also warns that some scripts are intrusive or exploitative, so InternetScanner will not enable those categories through the GUI. See https://nmap.org/nsedoc/lib/vulns.html and https://nmap.org/book/man-nse.html.

## Runtime visibility

Every scan emits structured events for target authorization, discovery, probe start/finish, timeout, DNS, service identification, vulnerability correlation, errors, cancellation, import and export. Credentials and secrets are never emitted to logs.
