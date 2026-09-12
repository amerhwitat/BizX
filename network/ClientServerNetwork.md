# BizX Client / Server / P2P Network Module

BizX applications can launch networking directly from the existing application UI. P2P presence remains available beside conventional client/server connectivity.

## Modes

- **Client:** join a remote server/room.
- **Server:** host rooms/services.
- **Host:** run the server and a local client simultaneously.
- **P2P:** direct peer communication when supported.
- **Hybrid:** server for authoritative state plus permitted peer channels.

## Profile

Users choose a nickname and avatar before joining. Built-in avatars are preferred. If the application's avatar catalog is empty or insufficient, `Upload avatar` opens the local image picker. Accept PNG/JPEG/WebP only, enforce byte/pixel limits, decode and normalize before use, and strip metadata where possible.

## Security

Network identity is session-scoped. Wallet secrets, recovery phrases, private keys and save secrets never enter network messages. Raw IP addresses are operational metadata and must not become player-profile fields.

## UI entry point

`Network / Multiplayer → Configure → Profile → Mode → Endpoint/Room → Start`.

Host mode must route the local player's actions through the same server protocol used by remote clients.

## Transport

Use QUIC/TLS for native client/server where available; WebSocket/WebTransport for browser/server; WebRTC or libp2p for P2P and NAT traversal. The shared protocol is documented in the General repository's `shared/network/` module.
