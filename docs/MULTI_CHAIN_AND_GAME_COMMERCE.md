# BizX Multi-Chain Wallet, Explorers and Game Commerce

## Scope

BizX uses an adapter architecture rather than pretending that one protocol can natively send every cryptocurrency. Each chain family has a balance reader, transaction/explorer adapter and wallet-provider integration where supported.

## Supported reference families

BTC, ETH/EVM, BNB, Polygon, Avalanche, SOL/SPL, LTC, DOGE, BCH, XRP, ADA, DOT, TRX, XLM and TON are included in the initial registry. The registry is intentionally extensible; additional coins and tokens are added by chain adapters rather than by duplicating wallet logic.

Ethereum applications use node JSON-RPC for blockchain interaction. Solana uses its documented RPC structures for account/token data. Provider signing remains external to the game/application. citeturn0search8turn0search4

## Balance checks

A balance query must identify:

- chain/network;
- asset/native coin or token contract/mint;
- public address;
- decimal precision;
- block/slot freshness;
- source/RPC endpoint;
- explorer URL.

Never infer a balance from a local game value. Display a pending/stale state when the chain source cannot be reached.

## Explorer/scanner model

Explorer links are generated from the chain registry. Scanner modules can additionally query supported public RPC/indexer APIs and normalize transactions into a common model. Explorer websites are presentation/fallback links; they are not trusted as signing authorities.

## Wallet operations

Normal operation is non-custodial:

`connect -> public account -> balance -> prepare -> wallet confirmation -> sign -> broadcast -> verify`

The application never needs a recovery phrase/private key for connection, balance checking, or normal payment.

## Game purchases

Initial catalog includes premium time, XP boosts, inventory slots, cosmetic skins, explorer content, and physical accessories. Purchases follow:

`catalog -> quote -> wallet connect -> payment preview -> provider signing -> confirmation -> entitlement/fulfillment`

The order database stores public address, order ID, chain, asset, amount, transaction reference and fulfillment state only.

## Security

No secret keys are generated server-side for users. No seed phrase or private key is placed in telemetry, analytics, logs, source control, URLs, order records, or explorer queries.

## Unity/WebGL

Unity WebGL communicates with browser wallet providers through a `.jslib` bridge and C# `[DllImport("__Internal")]` calls. This follows Unity's documented browser scripting model. citeturn0search1turn0search7

## Reverse-engineering boundary

The public repository contains application artifacts and integration metadata, but an APK or compressed WebGL build cannot be represented as source code merely by documentation. This repository therefore provides a clean reimplementation/integration layer. If source-level auditing of the shipped binaries is required, the original binary artifacts must be supplied to a binary-analysis workflow.
