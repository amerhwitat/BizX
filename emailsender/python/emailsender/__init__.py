"""BizX EmailSender: research, review queue, and explicit-send workflow."""
from __future__ import annotations
import re
from dataclasses import dataclass, field
from datetime import datetime, timezone

MESSAGE_HEADER = "Games, OS, and Other topics"
EMAIL_RE = re.compile(r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", re.I)

@dataclass
class Contact:
    email: str
    topic: str = ""
    source_url: str = ""
    discovered_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "needs-review"
    approved: bool = False

class ContactQueue:
    def __init__(self, suppressed=()):
        self.suppressed = {x.lower() for x in suppressed}
        self.contacts: dict[str, Contact] = {}
    def add(self, contact: Contact):
        email = contact.email.lower()
        if email in self.suppressed:
            contact.status = "suppressed"
            return contact
        contact.email = email
        self.contacts[email] = contact
        return contact
    def approve(self, email: str) -> bool:
        c = self.contacts.get(email.lower())
        if not c or c.email in self.suppressed:
            return False
        c.approved = True
        c.status = "approved"
        return True

def extract_emails(text: str) -> list[str]:
    return list(dict.fromkeys(x.lower() for x in EMAIL_RE.findall(text)))

def build_validation_message(repo_url: str = "", recipient_name: str = "there", feedback_url: str = "") -> str:
    return (f"{MESSAGE_HEADER}\n\nHello {recipient_name},\n\n"
            "I am validating open-source repositories covering games, operating systems, and related software topics. "
            "I would appreciate your review if this is relevant to your work.\n\n"
            f"Repository: {repo_url}\n\n"
            "Please share any correctness, compatibility, build, documentation, or gameplay issues you notice. "
            f"{('Feedback: ' + feedback_url) if feedback_url else ''}\n\n"
            "If you do not want further messages from this project, reply with ‘unsubscribe’.\n\nThank you.\n")

class EmailSender:
    def __init__(self, dry_run=True, require_human_approval=True, logger=print):
        self.dry_run = dry_run
        self.require_human_approval = require_human_approval
        self.logger = logger
    def send(self, contact: Contact, message: str, transport=None):
        if self.require_human_approval and not contact.approved:
            raise PermissionError(f"Recipient {contact.email} is not approved")
        if self.dry_run:
            self.logger(f"[DRY-RUN] queued {contact.email}")
            return {"ok": True, "mode": "dry-run", "email": contact.email}
        if transport is None:
            raise RuntimeError("No email transport configured")
        self.logger(f"[SEND] {contact.email} started")
        result = transport(contact.email, message)
        self.logger(f"[SEND] {contact.email} {'accepted' if result.get('ok', True) else 'failed'}")
        return result
