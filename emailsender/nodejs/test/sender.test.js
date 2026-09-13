import test from 'node:test';
import assert from 'node:assert/strict';
import { EmailSender, FROM_EMAIL, MESSAGE_HEADER, ContactQueue } from '../src/index.js';

test('uses the requested From address', () => assert.equal(FROM_EMAIL, 'amer.hwitat@proton.me'));
test('requires recipient approval before sending', async () => {
  const sender = new EmailSender({ dryRun: true });
  await assert.rejects(() => sender.send({ email: 'person@example.com', approved: false }, `${MESSAGE_HEADER}\n...`));
});
test('dry run reports the configured From address', async () => {
  const logs = [];
  const sender = new EmailSender({ dryRun: true, logger: message => logs.push(message) });
  const result = await sender.send({ email: 'person@example.com', approved: true }, `${MESSAGE_HEADER}\n...`);
  assert.equal(result.from, FROM_EMAIL);
  assert.match(logs[0], /amer\.hwitat@proton\.me/);
});
test('suppression list prevents approval', () => {
  const queue = new ContactQueue({ suppressed: ['person@example.com'] });
  queue.add({ email: 'person@example.com' });
  assert.equal(queue.approve('person@example.com'), false);
});
