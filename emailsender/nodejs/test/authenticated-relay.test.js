import test from 'node:test';
import assert from 'node:assert/strict';
import { createAuthenticatedRelayTransport } from '../src/authenticated-relay.js';

test('authenticated relay requires credentials and an authorized sender', () => {
  assert.throws(() => createAuthenticatedRelayTransport({ host: 'smtp.example.org', username: 'relay-user', password: 'secret' }), /authorized sender/i);
  const transport = createAuthenticatedRelayTransport({
    host: 'smtp.example.org',
    port: 587,
    username: 'relay-user',
    password: 'secret',
    authorizedSender: 'amer.hwitat@proton.me'
  });
  assert.equal(transport.authorizedSender, true);
  assert.equal(transport.openRelay, false);
  assert.equal(transport.spoofing, false);
  assert.equal(transport.host, 'smtp.example.org');
});

test('authenticated relay rejects a sender outside its allowlist', () => {
  const transport = createAuthenticatedRelayTransport({
    host: 'smtp.example.org',
    username: 'relay-user',
    password: 'secret',
    authorizedSender: 'amer.hwitat@proton.me'
  });
  assert.throws(() => transport.assertSender('other@example.org'), /authorized sender/i);
  assert.doesNotThrow(() => transport.assertSender('amer.hwitat@proton.me'));
});
