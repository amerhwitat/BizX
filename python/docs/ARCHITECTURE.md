# BizX Python Architecture

The Python implementation mirrors BizX service boundaries using a dependency-light package design.

## Layers

1. `bizx.core` — runtime identity and health.
2. `bizx.wallet` — provider request boundary.
3. `bizx.catalog` — application/product registration.
4. `bizx.payments` — validated payment lifecycle objects.
5. `bizx.api` — service facade.
6. `bizx.cli` — command-line entry point.

## Integration

Import the package from Python services, automation and research tooling. Wallet signing and private-key custody remain outside this package and should be provided by an operator-controlled secure wallet boundary.
