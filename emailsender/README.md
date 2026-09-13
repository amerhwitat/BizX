# EmailSender

EmailSender is a repository-validation outreach assistant for BizX. It researches public project/repository topics, extracts publicly displayed email addresses, de-duplicates and classifies contacts, and prepares validation messages.

## Important sending policy

EmailSender **does not automatically send an unsolicited message merely because an address was discovered**. Discovery adds a contact to a review queue. A human must approve the recipient and the send action, and the configured sender must have permission to send. This protects recipients and the sender from spam/abuse and supports applicable consent, opt-out, and sender-identification requirements.

Google recommends consent/opt-in for bulk or commercial mail, accurate sender identity, clear content, and unsubscribe handling. citeturn0search0turn0search2 The FTC also requires accurate headers and an opt-out mechanism for covered commercial email. citeturn0search3 Public availability of an address is not itself evidence of consent under UK PECR. citeturn0search7

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
- SMTP adapter with environment-only credentials.
- Dry-run mode enabled by default.
- Per-recipient send log shown in the application log panel.
- Export/import of contact review queues.
- Repository validation message templates.
- No passwords, API keys, SMTP secrets, OAuth tokens, or private keys in Git.

## Configuration

Copy `config/email-sender.example.json` to a local configuration file. Keep secrets in environment variables. Never commit production SMTP credentials.

## Run

Node.js:

```bash
node src/index.js
```

Python:

```bash
python -m emailsender
```

Web UI:

Open `web/index.html` in a local development server. The UI provides research, queue review, and a bottom-of-screen send log.

## Recommended workflow

1. Enter repository/project topics.
2. Research public pages.
3. Review each discovered address and its source context.
4. Mark only appropriate contacts as approved.
5. Verify sender configuration and suppression list.
6. Send individually or in a small reviewed batch.
7. Monitor delivery/rejection results in the bottom log.
8. Honor opt-out requests immediately and add them to the suppression list.
