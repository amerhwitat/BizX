# BizX Feature Conversion Map

## Scope

BizX now defines one cross-language feature contract for the existing application surface plus the new network, cryptocurrency/wallet, chess and strategy-game modules. Each language adapter implements the same concepts natively rather than embedding source code from another language.

## Feature families

- **Network**: IPv4/IPv6 parsing and classification, endpoint records, TCP/UDP transport abstractions, WebSocket/HTTP client boundaries, lobby/presence, message envelopes, rate limits, TLS configuration, authorized scanner hooks.
- **Crypto**: hash/HMAC interfaces, signature-provider boundary, address validation, transaction models, chain metadata, fee/confirmation policy, secure secret-storage boundary. No private keys, seed phrases or credentials are checked into source.
- **Wallets**: non-custodial wallet interface, watch-only accounts, address book, balances, transaction history, network selection, provider adapters and explicit user-confirmed transaction boundary.
- **Chess**: legal board model, FEN/PGN, UCI engine boundary, Stockfish adapter boundary, clocks, puzzles, analysis, variants and replay.
- **Strategy**: deterministic turn engine, resource economy, diplomacy, territory, technology tree, fog-of-war, AI policy interface, replay and network synchronization.
- **Game platform**: asset provenance, launcher, rendering capability registry, save/replay, monetization and existing BizX gameplay contracts.

## Language targets

Python, Node.js, JavaScript, TypeScript, Java, Kotlin, Swift, C++, C#, Go, Rust, Dart, PHP and Ruby. Unity C# and Unreal C++ use the same contract at their engine boundary.

## Design rule

The authoritative game state is deterministic and language-neutral. Transport, rendering, UI and external providers are adapters. Crypto providers are never required for free gameplay. Wallet operations are opt-in and require explicit confirmation at the application boundary.

## Chess/strategy research basis

The chess integration is designed around public protocols and open-source projects rather than copied game code. Stockfish is GPLv3 and exposes UCI; python-chess provides legal move generation, PGN/FEN, variants and UCI/XBoard engine communication; Lichess publishes open-source chess rules, board UI and browser Stockfish components. See:

- https://stockfishchess.org/
- https://python-chess.readthedocs.io/en/latest/
- https://lichess.org/source

The strategy layer uses general concepts such as turn order, resource production, diplomacy and territory control and contains original BizX rules/data.

## License boundary

Only code whose license is compatible with the target component should be vendored. External engines/libraries remain separable dependencies with their original license and attribution. Commercial game assets, ripped content and proprietary source are not imported.
