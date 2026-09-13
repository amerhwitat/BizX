import test from 'node:test';
import assert from 'node:assert/strict';
import { MESSAGE_HEADER, extractEmails, ContactQueue, buildValidationMessage, EmailSender } from '../src/index.js';

test('extracts and de-duplicates email addresses', () => {
  assert.deepEqual(extractEmails('A@Example.com B@example.com C@other.org'), ['a@example.com', 'c@other.org']);
});

test('suppression prevents queueing', () => {
  const q = new ContactQueue({ suppressed: ['blocked@example.org'] });
  assert.equal(q.add({ email: 'blocked@example.org', topic: 'games' }).status, 'suppressed');
});

test('requires approval before sending', async () => {
  const sender = new EmailSender({ dryRun: true });
  await assert.rejects(() => sender.send({ email: 'a@example.org', approved: false }, 'x'));
});

test('message contains requested header', () => {
  assert.match(buildValidationMessage({ repoUrl: 'https://example.org/repo' }), new RegExp(MESSAGE_HEADER));
});
