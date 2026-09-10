# BizX Python Architecture

The Python implementation mirrors BizX service boundaries using a dependency-light package design.

## Layers

1. `bizx.game_launcher` — single application/game start point.
2. `bizx.core` — runtime identity and health.
3. `bizx.wallet` — provider request boundary.
4. `bizx.catalog` — application/product registration.
5. `bizx.payments` — validated payment lifecycle objects.
6. `bizx.api` — service facade.
7. `bizx.cli` — command-line utilities.

## Launch flow

`python -m bizx` enters through `bizx.__main__`, which delegates to `bizx.game_launcher.main()`. The launcher creates the public `BizXApi` boundary and leaves service logic inside the package layers.

```text
python -m bizx
    -> bizx.__main__
        -> bizx.game_launcher.main()
            -> BizXApi
                -> Core / Wallet / Catalog / Payments
```

## Integration

Import the package from Python services, automation and research tooling. Wallet signing and private-key custody remain outside this package and should be provided by an operator-controlled secure wallet boundary.
