import { createInterface } from 'node:readline';
import { readFileSync, existsSync } from 'node:fs';
import { request } from 'node:https';

export const MESSAGE_HEADER = 'Games, OS, and Other topics';

export function extractEmails(text) {
  const matches = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
  return [...new Set(matches.map(e => e.toLowerCase()))];
}

export function discoverContacts(text, sourceUrl, topic) {
  return extractEmails(text).map(email => ({
    email,
    topic,
    sourceUrl,
    discoveredAt: new Date().toISOString(),
    status: 'needs-review',
    approved: false
  }));
}

export function buildValidationMessage({ recipientName = 'there', repoUrl = '', feedbackUrl = '' } = {}) {
  return `${MESSAGE_HEADER}\n\nHello ${recipientName},\n\nI am validating open-source repositories covering games, operating systems, and related software topics. I would appreciate your review of the public repository below if this is relevant to your work.\n\nRepository: ${repoUrl}\n\nPlease share any correctness, compatibility, build, documentation, or gameplay issues you notice. ${feedbackUrl ? `Feedback: ${feedbackUrl}` : ''}\n\nIf you do not want further messages from this project, reply with “unsubscribe” and the address will be added to the suppression list.\n\nThank you.\n`;
}

export class ContactQueue {
  constructor({ suppressed = [] } = {}) {
    this.suppressed = new Set(suppressed.map(x => x.toLowerCase()));
    this.contacts = new Map();
  }
  add(contact) {
    const email = contact.email.toLowerCase();
    if (this.suppressed.has(email)) return { ...contact, status: 'suppressed' };
    const existing = this.contacts.get(email);
    this.contacts.set(email, { ...existing, ...contact, email, status: existing?.status ?? 'needs-review' });
    return this.contacts.get(email);
  }
  approve(email) {
    const c = this.contacts.get(email.toLowerCase());
    if (!c || this.suppressed.has(c.email)) return false;
    c.approved = true;
    c.status = 'approved';
    return true;
  }
  list() { return [...this.contacts.values()]; }
}

export async function fetchPage(url, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const req = request(url, { headers: { 'User-Agent': 'BizX-EmailSender/1.0 (repository validation)' } }, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { body += chunk; if (body.length > 2_000_000) req.destroy(new Error('page too large')); });
      res.on('end', () => resolve({ status: res.statusCode ?? 0, body, finalUrl: url }));
    });
    req.setTimeout(timeoutMs, () => req.destroy(new Error('request timeout')));
    req.on('error', reject);
    req.end();
  });
}

export class EmailSender {
  constructor({ dryRun = true, requireHumanApproval = true, logger = console.log } = {}) {
    this.dryRun = dryRun;
    this.requireHumanApproval = requireHumanApproval;
    this.logger = logger;
  }
  async send(contact, message, transport) {
    if (this.requireHumanApproval && !contact.approved) throw new Error(`Recipient ${contact.email} is not approved`);
    if (this.dryRun) { this.logger(`[DRY-RUN] queued ${contact.email}`); return { ok: true, mode: 'dry-run', email: contact.email }; }
    if (!transport?.send) throw new Error('No email transport configured');
    this.logger(`[SEND] ${contact.email} started`);
    const result = await transport.send({ to: contact.email, subject: 'Repository validation request', text: message });
    this.logger(`[SEND] ${contact.email} ${result?.ok === false ? 'failed' : 'accepted'}`);
    return result;
  }
}

export function loadSuppression(path) {
  if (!existsSync(path)) return [];
  try { return JSON.parse(readFileSync(path, 'utf8')).emails ?? []; } catch { return []; }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  console.log('BizX EmailSender — discovery/review mode. Automatic unsolicited sending is disabled.');
  rl.close();
}
