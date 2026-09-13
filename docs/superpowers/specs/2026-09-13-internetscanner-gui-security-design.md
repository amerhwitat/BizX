# InternetScanner GUI & Security Explorer Design

**Date:** 2026-09-13
**Repository:** `amerhwitat/BizX`
**Subsystem:** `InternetScanner/`

## Goal

Evolve InternetScanner from a cross-language discovery contract into a user-facing network inventory and defensive security assessment application with a live GUI, interactive topology map, bounded TCP/UDP IPv4/IPv6 scanning, import/export, service identification, and non-exploitative vulnerability correlation.

## Scope

### 1. GUI

Provide a live dashboard with:

- target/scope selection;
- local, intranet, and explicitly allowlisted public modes;
- IPv4/IPv6 selection;
- TCP/UDP protocol selection;
- configurable port sets;
- bounded rate and concurrency controls;
- start/pause/cancel controls;
- real-time progress and event stream;
- host/service/vulnerability tables;
- host detail panel;
- topology/site map;
- import/export controls.

The GUI must never hide authorization state or silently expand a scan target set.

### 2. Discovery and scanning

The engine will support:

- local interface and connected-subnet discovery;
- IPv4 ARP discovery where platform support permits;
- IPv6 Neighbor Discovery where platform support permits;
- ICMP/TCP host discovery for authorized targets;
- TCP connect scanning;
- UDP inventory scanning;
- IPv4 and IPv6 targets;
- bounded asynchronous execution;
- cancellation and timeouts;
- structured scan events.

Active public-target scanning is permitted only for exact user-approved/allowlisted assets. Internet-wide enumeration and unbounded public CIDR scanning are explicitly out of scope.

### 3. Service identification

For reachable/open ports, the scanner may collect protocol/service/version evidence using safe probes and optional external Nmap integration. Results must record evidence and confidence instead of treating a banner string as certainty.

Nmap is an optional external dependency rather than embedded source. Nmap documentation confirms TCP/UDP port scanning and IPv6 support, while its NSE system provides version and vulnerability-oriented scripts. The application will expose only safe/non-exploitative categories by default.

### 4. Vulnerability correlation

The vulnerability layer will correlate detected product/version/CPE evidence against public vulnerability intelligence, primarily NIST NVD.

Findings will distinguish:

- `NOT_VULN` when a check has evidence of non-applicability;
- `LIKELY_VULN` for version/CPE-based matches that can contain false positives;
- `VULN` only when a non-exploitative check provides confirmation.

The tool will not execute exploits, denial-of-service checks, brute force, credential attacks, malware, or destructive payloads. CVE/CPE matches will include CVE ID, CPE, affected-version evidence, CVSS, source, references, timestamp, and confidence.

### 5. Public metadata

For public assets, passive enrichment may include reverse DNS, RDAP/WHOIS-style registration metadata, ASN/netblock/organization information, DNS records, and certificate metadata where appropriate. Active enrichment remains subject to the target authorization policy.

### 6. Topology/site maps

The map model will represent:

- scanner machine/interfaces;
- gateways/routes;
- subnets;
- hosts;
- IPv4/IPv6 addresses;
- services/ports;
- authorized public assets;
- relationships inferred from local discovery and routing evidence.

Maps are evidence-based: unknown relationships are shown as unknown rather than inferred as facts. Exported maps will have a stable JSON representation and a browser-renderable view.

### 7. Import/export

The project format will support:

- normalized JSON scan projects;
- CSV host/port findings;
- JSON vulnerability findings;
- topology JSON;
- import of prior scanner projects;
- import of compatible Nmap XML where practical;
- export of human-readable security reports.

Imported data is treated as untrusted input and validated before entering the internal model.

## Shared data model

Every host record will retain the existing normalized fields and add protocol/service/security evidence:

```json
{
  "ip": "192.168.1.10",
  "family": "ipv4",
  "scope": "local/intranet",
  "authorized": true,
  "reverseDns": [],
  "interfaces": [],
  "reachable": true,
  "openPorts": [
    {"protocol":"tcp","port":443,"state":"open","service":"https","version":null}
  ],
  "publicMetadata": null,
  "vulnerabilities": [],
  "mapNodeId": "host-192.168.1.10",
  "observedAt": "ISO-8601"
}
```

## Architecture

```text
GUI / CLI / Web UI
        |
        v
Scan Controller ---- Import/Export
        |
        +---- Authorization & Policy Guard
        |
        +---- Discovery Engine
        |       +---- Interfaces / routes
        |       +---- ARP / ND
        |       +---- ICMP / TCP discovery
        |
        +---- Port Engine
        |       +---- TCP
        |       +---- UDP
        |       +---- IPv4 / IPv6
        |
        +---- Service Fingerprinting
        |
        +---- Vulnerability Correlator
        |       +---- CPE normalization
        |       +---- NVD client/cache
        |
        +---- Topology Graph
        |
        +---- Event Bus / Structured Logs
```

All active probe paths must pass through the authorization/policy guard. GUI controls are not the security boundary; the engine must enforce the same policy for CLI, API, tests, and every language binding.

## Multi-language strategy

Keep the existing reference implementations and shared schema. Build a canonical engine contract first, then provide language-specific adapters/front ends where the language has suitable networking and GUI support. The primary full GUI implementation should use a web technology stack so it can run locally across operating systems; native implementations can consume the same normalized project format.

## Testing

Tests will cover:

- IPv4/IPv6 classification;
- public allowlist enforcement;
- policy bypass attempts through low-level probe APIs;
- TCP and UDP result normalization;
- cancellation/timeouts;
- import validation and schema compatibility;
- map node/edge generation;
- vulnerability confidence states;
- NVD response parsing with fixtures;
- GUI event-stream updates;
- export/import round trips;
- rate/concurrency limits;
- credential/secret redaction.

CI will run deterministic unit/integration tests without probing external targets.

## Safety and legal boundary

The application is an authorized network inventory and defensive assessment tool. Public active scans require explicit allowlisting. It does not provide Internet-wide enumeration, stealth/evasion, spoofing, credential attacks, exploitation, anonymous scanning, or destructive vulnerability testing.

## References

- Nmap host discovery and scanning documentation: https://nmap.org/book/host-discovery.html
- Nmap TCP/UDP port scanning: https://nmap.org/book/port-scanning.html
- Nmap IPv6 scanning: https://nmap.org/book/port-scanning-ipv6.html
- Nmap NSE: https://nmap.org/book/nse.html
- Nmap NSE vulnerability library: https://nmap.org/nsedoc/lib/vulns.html
- NIST NVD: https://nvd.nist.gov/
- NIST CPE guidance: https://nvd.nist.gov/general/faq-sections/cpe-faqs
