# BizX Crypto & Wallet API

This document defines the cross-language game crypto boundary.

## Security model

- Free gameplay never requires cryptocurrency.
- Testnet/local simulation is the default development mode.
- Mainnet execution is disabled until an explicit provider is configured.
- Game code must not persist or log raw private keys, seed phrases, or wallet secrets.
- Prefer external-wallet/provider signing for production transactions.

## Core operations

`createWallet`, `importWallet`, `watchWallet`, `validateAddress`, `getBalance`, `getTransactions`, `estimateFee`, `buildTransaction`, `signTransaction`, `submitTransaction`, `getTransactionStatus`, `requestPayment`, `simulateTransaction`, and `disconnectProvider`.

## Chain model

Adapters expose a common chain/asset registry supporting UTXO and account-based networks. Adapters must identify network, chain ID where applicable, address format, fee model, confirmation policy, and capabilities.

## Game economy

Virtual game currency, inventory, rewards, marketplace entitlements, and blockchain settlement remain separate ledgers. A blockchain transaction becomes a game entitlement only after server/provider confirmation.

## Secret handling

Use platform secure storage where local secret material is explicitly supported. Redact secrets from telemetry and logs. Never transmit a seed phrase to game servers, analytics, crash reports, or chat/network APIs.

## Test requirements

Implement deterministic tests for hashing, signing/verification, address validation, serialization, transaction construction, provider errors, replay protection, confirmation handling, and secret redaction.
