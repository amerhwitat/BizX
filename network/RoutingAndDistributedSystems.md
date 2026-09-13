# BizX routing and distributed-system resilience

BizX networking uses the shared network contract and keeps routing below the application protocol.

## Routing modes

- Local/static route selection for offline and LAN play.
- IPv4/IPv6 dual-stack for online services.
- Client/server discovery through DNS/HTTPS/WebTransport/WebSocket.
- P2P paths through WebRTC where permitted.
- Hybrid server + peer paths.

OS-level routing can expose RIP/RIPng, OSPFv2/v3, IS-IS, BGP4, EIGRP compatibility, Babel, BFD, VRRP, PIM and OpenFabric through an adapter boundary. SDN integration can use OpenFlow, P4Runtime, NETCONF/RESTCONF, gNMI and BGP-LS. These capabilities are configuration-driven and are not enabled automatically by a game/application.

## Distributed-system fixes

BizX defaults to a modular/local architecture. A function becomes a network service only when independent scaling, isolation or deployment requires it.

- Persistent HTTP/2/gRPC channels for typed internal RPC where native clients support them.
- Streaming for long-lived sessions.
- Local caching of stable game metadata.
- Service-local transactional data.
- Outbox/inbox for reliable events.
- Idempotency keys for commands.
- Saga-style compensation for cross-service workflows.
- Timeouts, bounded retries, circuit breakers and bulkheads.
- Blue/green or canary releases with protocol-version compatibility.

## Observability

All service boundaries should propagate W3C trace context and export traces, metrics and logs through OpenTelemetry. This permits correlation across processes and network boundaries. citeturn0search9turn1search5
