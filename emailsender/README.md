# EmailSender

EmailSender is a repository-validation outreach assistant for BizX. It researches public project/repository topics, extracts publicly displayed email addresses, de-duplicates and classifies contacts, and prepares validation messages.

## Sender

- **From:** `amer.hwitat@proton.me`
- **Display name:** `Amer Hwitat`
- **Message header:** `Games, OS, and Other topics`

Proton documents SMTP submission for supported applications using `smtp.protonmail.ch`, port `587`, STARTTLS, and a dedicated SMTP token rather than the normal mailbox password. Keep that token outside Git and inject it through the runtime environment. See Proton's official SMTP submission documentation: https://proton.me/support/smtp-submission

## Important sending policy

EmailSender **does not automatically send an unsolicited message merely because an address was discovered**. Discovery adds a contact to a review queue. A human must approve the recipient and the send action, and the configured sender must have permission to send. This protects recipients and the sender from spam/abuse and supports applicable consent, opt-out, and sender-identification requirements.

## Message header

Every generated validation message starts with:

`Games, OS, and Other topics`

The message explains that the recipient is being asked to validate public repositories and invites feedback rather than pretending that a relationship exists.

## Features

- Topic-driven web research using configurable search providers.
- HTML/text page fetching and email extraction.
- Context capture: source URL, surrounding text, discovered topic, timestamp.
- Domain and address de-duplication.
- Blocklist and suppression-list support.
- Human approval queue before sending.
- Proton SMTP adapter with environment-only credentials.
- Dry-run mode enabled by default.
- Per-recipient send log shown in the application log panel.
- Export/import of contact review queues.
- Repository validation message templates.
- No passwords, API keys, SMTP secrets, OAuth tokens, or private keys in Git.

## Configuration

`config/email-config.json` contains the non-secret sender and SMTP settings. `.env.example` documents the runtime variables. Never commit the actual SMTP token.

## Run

Node.js:

```bash
node nodejs/src/index.js
```

## Recommended workflow

1. Enter repository/project topics.
2. Research public pages.
3. Review each discovered address and its source context.
4. Mark only appropriate contacts as approved.
5. Verify sender configuration and suppression list.
6. Send individually or in a small reviewed batch.
7. Monitor delivery/rejection results in the bottom log.
8. Honor opt-out requests immediately and add them to the suppression list.
