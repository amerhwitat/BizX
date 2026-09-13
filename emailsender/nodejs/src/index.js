import { createInterface } from 'node:readline';
import { readFileSync, existsSync } from 'node:fs';
import { request } from 'node:https';
import { createProtonSmtpTransport } from './proton-smtp.js';
import { createAuthenticatedRelayTransport } from './authenticated-relay.js';

export const MESSAGE_HEADER = 'Games, OS, and Other topics';
export const FROM_EMAIL = 'amer.hwitat@proton.me';
export const FROM_NAME = 'Amer Hwitat';
export const SMTP_CONFIG = Object.freeze({
  host: 'smtp.protonmail.ch', port: 587, secure: false, requireStartTls: true,
  usernameEnv: 'EMAILSENDER_SMTP_USERNAME', passwordEnv: 'EMAILSENDER_SMTP_TOKEN'
});
export const RELAY_POLICY = Object.freeze({
  allowOpenRelay: false,
  allowFromSpoofing: false,
  requireAuthorizedRelay: true,
  privacyModeIsPseudonymous: true
});
export { createProtonSmtpTransport, createAuthenticatedRelayTransport };

export function createRelayFromEnvironment({ sender = FROM_EMAIL } = {}) {
  const host = process.env.EMAILSENDER_RELAY_HOST;
  const username = process.env.EMAILSENDER_RELAY_USERNAME;
  const password = process.env.EMAILSENDER_RELAY_PASSWORD;
  if (!host || !username || !password) throw new Error('Authenticated relay environment is incomplete');
  return createAuthenticatedRelayTransport({
    id: 'custom-authenticated-relay',
    host,
    port: Number(process.env.EMAILSENDER_RELAY_PORT || 587),
    security: process.env.EMAILSENDER_RELAY_SECURITY || 'starttls',
    username,
    password,
    authorizedSender: sender
  });
}

export function extractEmails(text) {
  const matches = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
  return [...new Set(matches.map(e => e.toLowerCase()))];
}
export function discoverContacts(text, sourceUrl, topic) {
  return extractEmails(text).map(email => ({ email, topic, sourceUrl, discoveredAt: new Date().toISOString(), status: 'needs-review', approved: false }));
}
export function buildValidationMessage({ recipientName = 'there', repoUrl = '', feedbackUrl = '' } = {}) {
  return `${MESSAGE_HEADER}\n\nHello ${recipientName},\n\nI am validating open-source repositories covering games, operating systems, and related software topics. I would appreciate your review of the public repository below if this is relevant to your work.\n\nRepository: ${repoUrl}\n\nPlease share any correctness, compatibility, build, documentation, or gameplay issues you notice. ${feedbackUrl ? `Feedback: ${feedbackUrl}` : ''}\n\nIf you do not want further messages from this project, reply with “unsubscribe” and the address will be added to the suppression list.\n\nThank you.\n`;
}
export class ContactQueue {
  constructor({ suppressed = [] } = {}) { this.suppressed = new Set(suppressed.map(x => x.toLowerCase())); this.contacts = new Map(); }
  add(contact) { const email = contact.email.toLowerCase(); if (this.suppressed.has(email)) return { ...contact, status: 'suppressed' }; const existing = this.contacts.get(email); this.contacts.set(email, { ...existing, ...contact, email, status: existing?.status ?? 'needs-review' }); return this.contacts.get(email); }
  approve(email) { const c = this.contacts.get(email.toLowerCase()); if (!c || this.suppressed.has(c.email)) return false; c.approved = true; c.status = 'approved'; return true; }
  list() { return [...this.contacts.values()]; }
}
export async function fetchPage(url, timeoutMs = 10000) {
  return new Promise((resolve, reject) => { const req = request(url, { headers: { 'User-Agent': 'BizX-EmailSender/1.0 (repository validation)' } }, res => { let body = ''; res.setEncoding('utf8'); res.on('data', chunk => { body += chunk; if (body.length > 2_000_000) req.destroy(new Error('page too large')); }); res.on('end', () => resolve({ status: res.statusCode ?? 0, body, finalUrl: url })); }); req.setTimeout(timeoutMs, () => req.destroy(new Error('request timeout'))); req.on('error', reject); req.end(); });
}

function assertAuthorizedPrivacyTransport(transport) {
  if (!transport?.send) throw new Error('No authorized relay transport configured');
  if (transport.openRelay === true) throw new Error('Open relay transports are forbidden');
  if (transport.spoofing === true) throw new Error('From-address spoofing is forbidden');
  if (transport.authorizedSender !== true) throw new Error('Relay must explicitly authorize the configured sender');
}

export class EmailSender {
  constructor({ dryRun = true, requireHumanApproval = true, requireAuthorizedRelay = true, logger = console.log } = {}) { this.dryRun = dryRun; this.requireHumanApproval = requireHumanApproval; this.requireAuthorizedRelay = requireAuthorizedRelay; this.logger = logger; }
  async send(contact, message, transport, { privacyMode = false, from = { name: FROM_NAME, email: FROM_EMAIL } } = {}) {
    if (this.requireHumanApproval && !contact.approved) throw new Error(`Recipient ${contact.email} is not approved`);
    if (this.requireAuthorizedRelay && !this.dryRun) assertAuthorizedPrivacyTransport(transport);
    const envelope = { from, to: contact.email, subject: 'Repository validation request', text: message };
    if (privacyMode && from?.email === contact.email) throw new Error('Sender and recipient cannot be identical');
    if (this.dryRun) { this.logger(`[DRY-RUN] privacy=${privacyMode} from=${from.email} queued ${contact.email}`); return { ok: true, mode: 'dry-run', privacyMode, email: contact.email, from: from.email }; }
    this.logger(`[SEND] privacy=${privacyMode} relay=${transport.id ?? 'authorized'} from=${from.email} to=${contact.email} started`);
    const result = await transport.send(envelope);
    this.logger(`[SEND] from=${from.email} to=${contact.email} ${result?.ok === false ? 'failed' : 'accepted'}`);
    return result;
  }
}
export function loadSuppression(path) { if (!existsSync(path)) return []; try { return JSON.parse(readFileSync(path, 'utf8')).emails ?? []; } catch { return []; } }

if (import.meta.url === `file://${process.argv[1]}`) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  console.log(`BizX EmailSender — From: ${FROM_EMAIL}. Privacy relay mode is pseudonymous only; open relays and From spoofing are disabled.`);
  rl.close();
}
