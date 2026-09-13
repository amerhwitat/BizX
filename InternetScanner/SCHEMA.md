# Normalized host record

Every implementation should emit the same logical record:

```json
{
  "ip": "192.168.1.10",
  "scope": "local/intranet",
  "authorized": true,
  "reverseDns": [],
  "interfaces": [],
  "reachable": null,
  "openPorts": [],
  "publicMetadata": null,
  "observedAt": "ISO-8601"
}
```

`publicMetadata` is passive registry/DNS information only. It must not contain credentials, secrets, or inferred sensitive identity data.

## Scope model

- `local/intranet`: loopback, link-local and private/site-local addresses or explicitly connected LAN assets.
- `public`: globally routable addresses.
- Public active discovery is permitted only for exact allowlisted assets in configuration.

The scanner is an inventory/discovery component, not an Internet-wide reconnaissance engine.
