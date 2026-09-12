# BizX Peer Presence & P2P Policy

Peer discovery is opt-in. The game client uses a random peer ID and connection status, not a permanent identity. Raw IP addresses are not stored in player profiles or scoreboards. If a relay/server receives an IP as part of networking, it must retain it only for operational/security purposes and according to its published retention policy.

Location is never inferred from an IP for display to other players. A player may optionally publish a coarse self-selected region label. Exact GPS coordinates are never shared by default.

Presence fields: peer ID, display name, online/offline, last-seen timestamp, optional coarse region. Disconnect removes live status. Any directory feature must require consent and provide disable/delete controls.

P2P transport may use WebRTC/libp2p or platform networking, but wallet keys, seed phrases, backups and private save secrets must never be sent over peer channels.
