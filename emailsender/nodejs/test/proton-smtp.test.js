import test from 'node:test';
import assert from 'node:assert/strict';
import { SMTP_CONFIG, createProtonSmtpTransport } from '../src/index.js';

test('creates a Proton SMTP transport from runtime credentials', () => {
  const transport = createProtonSmtpTransport({ username: 'amer.hwitat@proton.me', token: 'runtime-only-token' });
  assert.equal(transport.host, SMTP_CONFIG.host);
  assert.equal(transport.port, SMTP_CONFIG.port);
  assert.equal(transport.secure, false);
});

test('rejects missing SMTP credentials before network access', () => {
  assert.throws(() => createProtonSmtpTransport({ username: '', token: '' }), /SMTP username and token are required/);
});

test('transport never exposes the SMTP token in its public description', () => {
  const transport = createProtonSmtpTransport({ username: 'amer.hwitat@proton.me', token: 'secret-token' });
  assert.equal(transport.toString(), '[Proton SMTP transport]');
  assert.equal(JSON.stringify(transport).includes('secret-token'), false);
});
