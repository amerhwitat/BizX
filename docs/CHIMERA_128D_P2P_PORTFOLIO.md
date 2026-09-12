# Chimera 128D + P2P Portfolio Integration

BizX is a language-separated application participant in the Chimera portfolio.

## 128D state

BizX application state may expose geometry, time, observer/perspective, light/material response, events, objects, properties and interaction rules, plus extensible perception/cognition/vector dimensions. The model is semantic and may activate only the dimensions required by a feature.

## P2P

P2P is opt-in and authenticated. The implementation boundary is transport-independent and supports hello, request, response, publish, snapshot, delta and acknowledgement messages. Nodes validate identity/capabilities, monotonically increasing sequence numbers, payload hashes and optional signatures before accepting state.

No unsolicited network scanning, credential/private-key exchange, arbitrary executable transfer or remote command execution is part of this application protocol.

## Languages

VC++, C#, Node.js, Java, Python, JavaScript and TypeScript use native runtime/network APIs while sharing the logical envelope and deterministic JSON conformance vectors.

## Licensing

Original BizX code is GPLv3-or-later. Third-party libraries/assets retain their upstream licenses.
