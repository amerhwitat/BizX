# Chess, Strategy, Network and Crypto Implementation

## Implemented native adapters

| Language | Chess/strategy | Wallet/crypto |
|---|---|---|
| Python | `python/bizx/chess_strategy.py` | `python/bizx/crypto_wallet.py` |
| Node.js | `nodejs/src/chess-strategy/index.js` | `nodejs/src/crypto-wallet/index.js` |
| JavaScript | `javascript/chess-strategy/index.js` | `javascript/crypto-wallet/index.js` |
| TypeScript | `typescript/chess-strategy/index.ts` | `typescript/crypto-wallet/index.ts` |
| Java | `java/src/main/java/ai/bizx/chess/ChessStrategy.java` | `java/src/main/java/ai/bizx/crypto/Wallet.java` |
| Kotlin | `mobile/kotlin/src/main/kotlin/bizx/chess/ChessStrategy.kt` | `mobile/kotlin/src/main/kotlin/bizx/crypto/Wallet.kt` |
| Swift | `apple/ChessStrategy.swift` | `apple/CryptoWallet.swift` |
| C++ | `cpp/chess_strategy.hpp` | `cpp/crypto_wallet.hpp` |
| C# | `csharp/ChessStrategy.cs` | `csharp/CryptoWallet.cs` |
| Go | `go/chessstrategy/chess_strategy.go` | `go/cryptowallet/wallet.go` |
| Rust | `rust/src/chess_strategy.rs` | `rust/src/crypto_wallet.rs` |
| Dart | `mobile/flutter/lib/chess_strategy.dart` | `mobile/flutter/lib/crypto_wallet.dart` |
| PHP | `php/src/ChessStrategy.php` | `php/src/CryptoWallet.php` |
| Ruby | `ruby/lib/bizx/chess_strategy.rb` | `ruby/lib/bizx/crypto_wallet.rb` |

## Network integration

The adapters consume the existing `NetworkUnified` contract rather than creating a second incompatible networking stack. The crypto wallet contract uses the same transport boundary for HTTPS, WebSocket, TCP and UDP where appropriate.

Public active network operations remain authorization/allowlist controlled. Wallet transaction creation stops at `awaiting_confirmation`; provider submission is deliberately outside the deterministic game core.

## Crypto coin model

The shared contract currently models BTC, BCH, LTC, DOGE, ETH, ETC, SOL, ADA, XRP, DOT and AVAX. Coin-specific serialization/signing can be supplied through provider adapters without embedding secrets in the game repository.

## Chess research integration

Stockfish is integrated through a UCI adapter boundary, not as copied source. Stockfish 19 was released in September 2026 and is GPLv3. python-chess documents FEN/PGN, variants, UCI/XBoard communication and tablebase interfaces. Lichess publishes its open-source chess server, rules, board UI and browser Stockfish components.

## Strategy-game layer

The original BizX strategy contract adds turn-based economy, logistics, diplomacy, territory, research, fog-of-war, AI policy and deterministic replay. It can be embedded in the existing tycoon, tactical RPG, city-builder, MMO and arena-sports systems without making the chess engine authoritative over non-chess game state.
