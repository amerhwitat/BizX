# BizX Wallet Integration

BizX uses a non-custodial wallet architecture for WebGL and mobile clients.

## Capabilities

- Connect an external wallet provider.
- Read public address, network, balances, and transaction status.
- Send supported assets through a provider-signed transaction.
- Receive assets using address/QR.
- Sign application authentication messages.
- Export an encrypted local wallet backup.
- Provide explicit advanced recovery-phrase/private-key export where the selected wallet exposes those secrets.
- Purchase BizX time and accessories with wallet payments.

## Security rules

1. Connected-wallet mode never receives a private key or recovery phrase.
2. Transaction signing happens inside the wallet/provider.
3. Servers receive public addresses, signed transactions, hashes, and non-secret order metadata only.
4. Recovery phrases/private keys are never logged, uploaded, placed in analytics, or persisted in application databases.
5. Encrypted local backup is the default backup mechanism.
6. Raw secret export requires a dedicated warning and explicit confirmation.
7. The application must never request a seed phrase merely to connect a wallet or make a normal transaction.

## Connection flow

`Connect Wallet -> Provider Approval -> Public Address + Network -> Optional Signed Login`

Use a nonce-based signed challenge for application authentication. Verify the signature server-side and never authenticate by collecting a private key.

## Send flow

`Recipient -> Asset -> Amount -> Fee Estimate -> Transaction Preview -> User Confirmation -> Provider Signature -> Broadcast -> Confirmation`

The preview must show network, recipient, asset, amount, estimated fee, and total before signing.

## Receive flow

Display the public address and QR code. The address can be shared; secret key material must not be included.

## Backup/export

Encrypted wallet-vault export saved directly to local disk is the preferred backup. Advanced export may expose a recovery phrase or private key only after explicit confirmation and a warning that possession grants control of the funds. Web builds should use secure browser cryptography/provider APIs and must not put plaintext secrets into ordinary local storage.

## Purchases

### Buy time

`Choose plan -> Quote -> Wallet payment -> User signs -> Chain confirmation -> Entitlement activated`

### Accessories

`Catalog -> Cart -> Quote -> Wallet payment -> User signs -> Chain confirmation -> Fulfillment`

Commerce services never require a seed phrase or private key.

## Error handling

Handle rejected signatures, wrong network, insufficient balance, insufficient gas, stale quotes, disconnected providers, replaced transactions, pending transactions, and failed confirmations. Never blindly resubmit a transaction after a signing request.
