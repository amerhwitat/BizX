# EmailSender multi-language implementation contract

EmailSender uses one provider-neutral contract across language implementations.

## Supported implementation families

Node.js/TypeScript, Python, Java, C#, C++, Rust, Go, Kotlin, Swift, Dart, PHP, and Ruby.

Each implementation supports:
- contact discovery/review rather than automatic unsolicited sending;
- suppression lists;
- explicit recipient approval;
- authenticated SMTP/relay submission;
- STARTTLS/TLS where supported;
- authorized sender/alias validation;
- privacy mode as **pseudonymous relay operation**, not untraceable anonymous mail;
- rejection of open relays and From-address spoofing;
- dry-run mode;
- structured send logging.

A relay may conceal application-side infrastructure details from a recipient only when the relay provider authorizes that behavior. EmailSender never falsifies SMTP identity, bypasses relay authentication, or attempts to create an open relay.

The implementation contract deliberately separates `submission` from `relay`: RFC 6409 defines message submission as an authenticated/authorized service and reserves port 587 for normal submission. citeturn0search0

## Privacy model

`privacyMode=true` means:
1. use an authenticated relay or an alias that the sender controls;
2. avoid unnecessary application metadata in logs;
3. keep relay credentials outside source control;
4. preserve normal SMTP authorization and message traceability;
5. never claim that the message is technically anonymous or untraceable.

There is no `openRelay`, `spoofFrom`, `anonymousTraceSuppression`, or credential-bypass feature.
