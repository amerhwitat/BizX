# BizX Multi-Chain Crypto Layer

BizX now defines a chain-agnostic, self-custody-first crypto boundary for wallet discovery, balance reads, receive addresses, transaction construction, swaps/exchange quotes, portfolio scanning and explicit sweep planning.

## Scope

Supported by architecture rather than a hard-coded coin limit:

- Bitcoin-family UTXO networks
- EVM chains and ERC-20/ERC-721/ERC-1155 assets
- Solana and SPL assets
- TON
- Other chains through `IChainAdapter`
- WalletConnect-compatible external wallets
- Optional Tether WDK integration for multi-chain wallet primitives

The registry is extensible, so adding a new chain does not require changing game/store logic.

## Safety model

- Private keys and seed phrases never enter the game engine, renderer, store, logs, telemetry, or source-controlled configuration.
- Read-only balance discovery is separated from signing.
- Buy, sell, swap, send and sweep operations are represented as explicit transaction intents.
- Live signing is disabled by default in demos/tests and must be performed by a user-controlled wallet or hardware signer.
- Sweep is a **proposal/scanning operation** until the user explicitly approves each transaction set.
- Testnet/simulation adapters are first-class and should be used in CI.

## Operations

`discover -> balance -> quote -> build intent -> user confirmation -> external signer -> broadcast -> receipt`

## Research basis

The design takes architectural inspiration from open-source/public specifications and SDKs including Tether WDK, Wallet Standard/WalletConnect specifications, and Uniswap's Smart Order Router. Third-party code is not copied into BizX; adapters use public APIs and preserve upstream licenses.

- https://wdk.tether.io/
- https://github.com/WalletConnect/walletconnect-specs
- https://github.com/wallet-standard/wallet-standard
- https://github.com/Uniswap/smart-order-router

This layer is infrastructure code, not financial advice. Availability, legality, token support, fees and exchange access vary by jurisdiction and provider.
