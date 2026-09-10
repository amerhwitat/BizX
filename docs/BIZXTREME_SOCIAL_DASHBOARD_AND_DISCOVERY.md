# BizX / BizXtreme Social Dashboard Integration

## Shared KPI contract

The game dashboard exposes score, XP, expedition progress, play time, peer count and rank. The contract is client-neutral so Unity, Three.js and future native clients can render the same semantics.

## Persistence

A local snapshot is the offline source of truth for resume. Cloud synchronization, if enabled later, must be authenticated and versioned. Never trust a peer's local score as authoritative for a competitive global leaderboard.

## Hall of Fame

Local records are supported immediately. Global records require server-side validation/signing or a trusted platform leaderboard. This prevents a malicious P2P peer from rewriting another player's score.

## Peer discovery and P2P

User discovery is opt-in and directory-based. The directory exposes pseudonymous peer identifiers and capability metadata rather than a database of raw IP addresses. WebRTC data channels can carry bidirectional peer-to-peer game/chat data, while signaling/ICE exchange is still required to establish connections.

The application must not scan the public Internet for users or devices. Discovery is limited to users who have explicitly joined the application's directory/network.

## Splash asset

The BizXtreme Aurora Frontier splash is derived from the user's Library artwork and is packaged through the game-specific asset pipeline. Clients should use the logical asset ID `bizxtreme-aurora-frontier` so the binary can be replaced without changing game code.
