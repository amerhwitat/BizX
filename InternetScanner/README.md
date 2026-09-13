# InternetScanner

A provider-neutral network inventory and host-discovery tool for **authorized networks and assets**.

## Scope

The scanner distinguishes:
- `local`: RFC1918/private, loopback, link-local and directly connected inventory.
- `intranet`: explicitly authorized RFC1918/CIDR ranges.
- `public`: public IP/hostname metadata collected passively or for explicitly allowlisted single assets.

It records IP, DNS names, address scope, interface/network context, reachability, and public registry metadata when configured. It does **not** perform Internet-wide enumeration, firewall evasion, credential attacks, vulnerability exploitation, or anonymous scanning.

Nmap-style host discovery informed the design: ARP/Neighbor Discovery is appropriate on directly connected Ethernet networks, while ICMP/TCP discovery can be used for authorized targets. Nmap also warns that unauthorized scanning can have legal consequences. See https://nmap.org/book/host-discovery.html and https://nmap.org/book/legal-issues.html.

## Safety defaults

- `authorizedOnly=true`
- private/local discovery is enabled
- public targets require an explicit allowlist
- maximum target count is bounded
- rate/concurrency are bounded
- no raw Internet-wide CIDR scanning
- no evasion/spoofing/open relay behavior
- public enrichment is passive (DNS/RDAP/WHOIS-style registry data)

## Implementations

Reference implementations/contracts are provided under `languages/` for Node.js/TypeScript, Python, Java, C#, C++, Rust, Go, Kotlin, Swift, Dart, PHP and Ruby.

All implementations consume the same `config/scanner.json` schema and emit the same normalized host record.

## Example

```text
scope=local
network=auto
mode=discover
authorizedOnly=true
```

For a public asset, first place the exact IP/hostname in the explicit allowlist and use `mode=metadata` or `mode=discover`.
