# BizX Java Architecture

The Java implementation mirrors BizX service boundaries without importing source from other languages.

## Layers

1. `GameLauncher` — single application/game start point.
2. `core` — runtime identity and health.
3. `wallet` — provider request boundary for externally controlled wallets.
4. `catalog` — application/product registration.
5. `payments` — validated payment lifecycle objects.
6. `api` — service-facing facade.
7. `cli` — JVM command-line utilities.

## Launch flow

`GameLauncher.main()` constructs `BizXApi`, starts the Java application boundary, and reports the runtime health state. This is intentionally a thin entrypoint; business services remain behind the API layer.

```text
GameLauncher
    -> BizXApi
        -> Core / Wallet / Catalog / Payments
```

## Integration

Use `BizXApi` and the service classes from JVM applications. Wallet signing and private-key custody remain outside this library; the provider boundary accepts requests and returns provider results.
