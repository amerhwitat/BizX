# BizX Payment Configuration

The games use a centralized payment configuration. The primary Ethereum receiving address configured by the project owner is:

`0x0B4fF3fc6AE19fAF9A0d2628a646ABD9636B1162`

## Safety

This repository contains **no private keys** and cannot authorize blockchain transfers. Production purchases, swaps, and exchange operations must be explicitly authorized by the user's wallet/payment provider.

## Architecture

- `primaryEthAddress`: canonical receiving address.
- `quoteProvider`: interface for obtaining exchange quotes.
- `swapProvider`: interface for user-authorized swaps.
- `transactionVerifier`: verifies on-chain payment receipts.
- `ledger`: records game-side settlement state and transaction hashes.
- `testMode`: enables deterministic simulated payments for development.

Games should reference this configuration instead of duplicating an address in source code. Token conversion is quote-based and must never silently move assets without explicit wallet authorization.
