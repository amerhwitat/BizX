# InternetScanner GUI

The web GUI is a presentation layer. Real network operations are performed by a local/native scanner backend so browser sandbox restrictions do not turn into a security-policy bypass.

## Dashboard

- Live host table
- IPv4/IPv6 address and scope
- TCP and UDP port states
- reverse DNS
- service/version evidence
- vulnerability findings and severity
- interactive topology/map canvas
- event stream
- scan cancellation
- JSON import/export

## Planned native adapters

The same UI contract can be connected to Node.js, Python, Java, C++, Rust, Go, C#, Kotlin, Swift and Dart native backends. Each adapter must consume the shared authorization policy and normalized schemas.

## Import/export

JSON is the canonical lossless format. CSV is intended for host/port reporting. XML/Nmap-compatible import can be used as an interoperability layer when Nmap is installed locally.

## Map model

Nodes represent interfaces, gateways, hosts and authorized public assets. Edges represent observed local connectivity or logical relationships. The map does not infer physical location from an IP address. Public registry/geolocation information, when added, is displayed as metadata with its source and confidence.
