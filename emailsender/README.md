# EmailSender

EmailSender is a repository-validation outreach assistant for BizX. It researches public project/repository topics, extracts publicly displayed email addresses, de-duplicates and classifies contacts, and prepares validation messages.

## Sender

- **From:** `amer.hwitat@proton.me`
- **Display name:** `Amer Hwitat`
- **Message header:** `Games, OS, and Other topics`

Proton documents SMTP submission for supported applications using `smtp.protonmail.ch`, port `587`, STARTTLS, and a dedicated SMTP token rather than the normal mailbox password. Keep that token outside Git and inject it through the runtime environment.

## Sending and privacy modes

EmailSender supports two legitimate transport modes:

1. **Direct authenticated submission** — such as the configured Proton SMTP transport.
2. **Authenticated relay / authorized alias** — a user-configured SMTP relay can be selected through environment-backed configuration.

The relay feature is **privacy-preserving/pseudonymous, not technically anonymous**. Normal SMTP authorization, provider policies, and message traceability remain in effect. EmailSender does not spoof From addresses, bypass authentication, create or use open relays, forge trace headers, or attempt to make messages untraceable.

RFC 6409 separates message submission from message relay and specifies authenticated/authorized submission, normally on port 587. citeturn0search0

## Safety gates

EmailSender **does not automatically send an unsolicited message merely because an address was discovered**. Discovery adds a contact to a review queue. A human must approve the recipient and the send action, and the configured sender/relay must authorize the submission.

Dry-run is enabled by default. Suppression lists and opt-out handling remain active for every transport.

## Authenticated relay

The Node.js implementation now includes a provider-neutral `createAuthenticatedRelayTransport()` supporting:

- STARTTLS on port 587 by default.
- TLS-on-connect when explicitly selected.
- Runtime-only username/password or token credentials.
- Mandatory authorized-sender allowlisting.
- Explicit rejection of open-relay and From-spoofing configurations.
- Sender validation immediately before `MAIL FROM`.
- Credential-free `toJSON()`/logging metadata.
- No insecure plaintext transport unless explicitly enabled by the caller.

The environment-backed helper is `createRelayFromEnvironment()` in `nodejs/src/index.js`. Real credentials must never be committed to Git.

## Multi-language implementations

The provider-neutral relay contract is implemented for:

- Node.js / TypeScript
- Python
- Java
- C#
- C++
- Rust
- Go
- Kotlin
- Swift
- Dart
- PHP
- Ruby

See `MULTILANGUAGE.md` and `languages/` for the language-specific policy modules. The common contract covers authorization, privacy mode, dry-run behavior, suppression, and rejection of open-relay/identity-spoofing configurations.

## Features

- Topic-driven web research using configurable search providers.
- HTML/text page fetching and email extraction.
- Context capture: source URL, surrounding text, discovered topic, timestamp.
- Domain and address de-duplication.
- Blocklist and suppression-list support.
- Human approval queue before sending.
- Native Node.js Proton SMTP adapter using STARTTLS on port 587.
- Authenticated custom-relay configuration through runtime environment variables.
- Privacy mode that minimizes application-side metadata without claiming anonymity.
- Dry-run mode enabled by default.
- Per-recipient send log shown in the application log panel.
- Export/import of contact review queues.
- Repository validation message templates.
- No passwords, API keys, SMTP secrets, OAuth tokens, or private keys in Git.

## Configuration

`config/email-config.json` contains non-secret sender and relay policy. `.env.example` documents runtime variables. Never commit SMTP or relay credentials.

## Reviewed SMTP send

After a human has approved a contact, a calling application can construct an authenticated transport from runtime-only credentials. The transport must identify itself as an authorized relay and cannot be configured as an open relay or From-spoofing transport.

```js
import { createProtonSmtpTransport, EmailSender } from './src/index.js';

const transport = createProtonSmtpTransport({
  username: process.env.EMAILSENDER_SMTP_USERNAME,
  token: process.env.EMAILSENDER_SMTP_TOKEN
});

const sender = new EmailSender({ dryRun: false, requireHumanApproval: true, requireAuthorizedRelay: true });
await sender.send(approvedContact, message, transport, { privacyMode: true });
```

For another authorized provider:

```js
import { createRelayFromEnvironment, EmailSender } from './src/index.js';

const transport = createRelayFromEnvironment();
const sender = new EmailSender({ dryRun: false, requireHumanApproval: true, requireAuthorizedRelay: true });
await sender.send(approvedContact, message, transport, { privacyMode: true });
```

The SMTP credential is held only in memory by the transport and is excluded from its JSON representation and string description.

## Recommended workflow

1. Enter repository/project topics.
2. Research public pages.
3. Review each discovered address and its source context.
4. Mark only appropriate contacts as approved.
5. Choose the direct Proton transport or an authorized relay/alias.
6. Verify sender authorization and suppression list.
7. Send individually or in a small reviewed batch.
8. Monitor delivery/rejection results in the bottom log.
9. Honor opt-out requests immediately and add them to the suppression list.
10. Keep all SMTP/relay credentials in the runtime environment or deployment secret store.
