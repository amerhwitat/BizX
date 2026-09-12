# Chimera 128D + authenticated P2P integration

BizX participates in the shared Chimera application architecture.

## 128D state contract

Applications represent world/application state as a multidimensional envelope. The baseline includes geometry and temporal state, observer/perspective, light/material response, events, objects, properties and interaction rules, followed by a cognitive overlay for perception, memory, inference and action. The schema is extensible beyond 128 dimensions without changing the transport envelope.

## P2P contract

The peer layer is opt-in and authenticated. A peer advertises a stable node identifier, protocol version, capabilities and supported dimensions. Messages contain a monotonically increasing sequence number, message type, sender identity, payload hash and optional signature.

Supported patterns:

- peer handshake/capability exchange
- request/response
- publish/subscribe state updates
- content-addressed synchronization
- snapshot and delta exchange
- replay detection and bounded queues

No unsolicited port scanning, credential exchange, executable payload delivery or arbitrary remote command execution is part of the protocol.

## Language parity

C++, C#, Java, Node.js, Python, JavaScript and TypeScript implementations should serialize the same logical envelope and use native networking APIs appropriate to their runtime. Compatibility is defined by the wire schema and conformance vectors, not by shared source code.

## Security

P2P must remain disabled until explicitly configured. Authentication keys and application secrets belong in the local secret store and never in source control or synchronization payloads.
