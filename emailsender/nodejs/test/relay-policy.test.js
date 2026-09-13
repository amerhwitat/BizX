import test from 'node:test';
import assert from 'node:assert/strict';
import { EmailSender, RELAY_POLICY } from '../src/index.js';

test('open relays are disabled', () => assert.equal(RELAY_POLICY.allowOpenRelay, false));
test('From spoofing is disabled', () => assert.equal(RELAY_POLICY.allowFromSpoofing, false));
test('privacy mode still requires approval', async () => {
  const sender = new EmailSender({ dryRun: true, requireHumanApproval: true });
  await assert.rejects(() => sender.send({ email: 'test@example.com', approved: false }, 'x', null, { privacyMode: true }), /not approved/);
});
test('authorized privacy relay can dry-run', async () => {
  const logs = [];
  const sender = new EmailSender({ dryRun: true, logger: x => logs.push(x) });
  const result = await sender.send({ email: 'test@example.com', approved: true }, 'x', { authorizedSender: true, openRelay: false, spoofing: false, id: 'test-relay' }, { privacyMode: true });
  assert.equal(result.ok, true);
  assert.match(logs[0], /privacy=true/);
});
