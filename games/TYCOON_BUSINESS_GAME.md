# Tycoon Business Game

The Tycoon mode is a shared business/economy layer implemented independently in the Node.js, Java 17 and Python language trees.

## Included BizX features

- Business acquisition and ownership
- Revenue and operating-cost simulation
- Turn-based economic progression
- Cash balance and snapshots
- Extensible business definitions
- Payment-routing metadata for purchases
- Wallet authorization boundary: the game prepares a payment intent but does not hold keys or submit a real transfer

## Primary payment destination

`0x0B4fF3fc6AE19fAF9A0d2628a646ABD9636B1162`

The same address is used as the configured ETH settlement recipient in every language implementation. Any token conversion/swap layer must produce a user-authorized transaction whose final recipient is this configured address; the game itself never executes or signs financial transactions.

## Entry points

- Node.js: `cd nodejs && npm start tycoon`
- Java: `cd java && mvn package && java -cp target/classes io.amerhwitat.bizx.GameLauncher tycoon`
- Python: `cd python && python -m bizx tycoon`
