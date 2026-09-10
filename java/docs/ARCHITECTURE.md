# BizX Java Architecture

The Java implementation mirrors BizX service boundaries without importing source from other languages.

## Layers

1. `core` — runtime identity and health.
2. `wallet` — provider request boundary for externally controlled wallets.
3. `catalog` — application/product registration.
4. `payments` — validated payment lifecycle objects.
5. `api` — service-facing facade.
6. `cli` — JVM command-line entry point.

## Integration

Use `BizXApi` and the service classes from JVM applications. Wallet signing and private-key custody remain outside this library; the provider boundary accepts requests and returns provider results.
