# InternetScanner normalized schema

All implementations should consume/emit the same logical project model. The canonical Node engine is the reference implementation; other language implementations may provide adapters.

```json
{
  "schema": 1,
  "hosts": [{
    "ip": "192.168.1.10",
    "scope": "local/intranet",
    "authorized": true,
    "reverseDns": [],
    "interfaces": [],
    "reachable": true,
    "openPorts": [{
      "protocol": "tcp",
      "port": 443,
      "state": "open",
      "service": "https",
      "version": null,
      "confidence": "low"
    }],
    "publicMetadata": null,
    "vulnerabilities": [],
    "mapNodeId": "host:192.168.1.10",
    "observedAt": "ISO-8601"
  }]
}
```

Port states intentionally retain uncertainty: `open`, `closed`, `filtered`, `unfiltered`, `open|filtered`, `closed|filtered`. UDP silence must not be represented as confirmed `open`.

Vulnerability records use `NOT_VULN`, `LIKELY_VULN`, or `VULN` and must include evidence. A product/version match alone is not confirmation.

## Scope and authorization

- `local/intranet`: loopback, link-local, RFC1918/IPv6 unique-local, or directly connected authorized assets.
- `public`: globally routable assets.
- Active public probing requires an exact configured allowlist entry.
- The authorization guard is enforced in the engine, not merely in the GUI.
- No exploit execution, brute force, credential attacks, denial-of-service testing, spoofing, stealth/evasion, or anonymous scanning.

## Import/export

JSON is canonical. CSV is tabular reporting. Nmap XML may be imported as evidence. Imported content must be size-limited, schema-validated, and stripped of secrets.

## Topology

Nodes and edges are evidence-backed. Unknown relationships remain unknown; the renderer must not invent network paths or ownership relationships.
