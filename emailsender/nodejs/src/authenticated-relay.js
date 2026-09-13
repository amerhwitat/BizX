import net from 'node:net';
import tls from 'node:tls';

function cleanHeader(value) {
  return String(value ?? '').replace(/[\r\n]/g, ' ').trim();
}

function cleanAddress(value) {
  const address = String(value ?? '').replace(/[\r\n<>]/g, '').trim().toLowerCase();
  if (!address || !address.includes('@')) throw new Error(`Invalid email address: ${value}`);
  return address;
}

function buildMessage({ from, to, subject, text }) {
  const fromAddress = cleanAddress(typeof from === 'object' ? from.email : from);
  const fromName = typeof from === 'object' ? cleanHeader(from.name) : '';
  const toAddress = cleanAddress(to);
  const safeSubject = cleanHeader(subject || 'Repository validation request');
  const displayFrom = fromName ? `"${fromName.replace(/"/g, '')}" <${fromAddress}>` : fromAddress;
  const body = String(text ?? '').replace(/\r?\n/g, '\r\n').replace(/^\./gm, '..');
  return [
    `From: ${displayFrom}`,
    `To: ${toAddress}`,
    `Subject: ${safeSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '', body, ''
  ].join('\r\n');
}

function lineReader(socket) {
  let buffer = '';
  const queue = [];
  const waiters = [];
  let failure = null;
  socket.setEncoding('utf8');
  socket.on('data', chunk => {
    buffer += chunk;
    while (true) {
      const index = buffer.indexOf('\r\n');
      if (index < 0) break;
      queue.push(buffer.slice(0, index));
      buffer = buffer.slice(index + 2);
    }
    while (queue.length && waiters.length) waiters.shift().resolve(queue.shift());
  });
  socket.on('error', error => {
    failure = error;
    while (waiters.length) waiters.shift().reject(error);
  });
  return () => {
    if (queue.length) return Promise.resolve(queue.shift());
    if (failure) return Promise.reject(failure);
    return new Promise((resolve, reject) => waiters.push({ resolve, reject }));
  };
}

async function response(nextLine) {
  const lines = [];
  let line = await nextLine();
  lines.push(line);
  const code = Number(line.slice(0, 3));
  while (line[3] === '-') {
    line = await nextLine();
    lines.push(line);
  }
  if (!Number.isInteger(code) || code < 200 || code >= 400) {
    throw new Error(`SMTP ${code || 'response'}: ${lines.join(' | ')}`);
  }
  return { code, lines };
}

async function command(socket, nextLine, value, expected = null) {
  socket.write(`${value}\r\n`);
  const result = await response(nextLine);
  if (expected && result.code !== expected) throw new Error(`Unexpected SMTP response ${result.code}`);
  return result;
}

function connectPlain(host, port) {
  const socket = net.createConnection({ host, port });
  return new Promise((resolve, reject) => {
    socket.once('connect', () => resolve(socket));
    socket.once('error', reject);
  });
}

function connectTls(host, port) {
  const socket = tls.connect({ host, port, servername: host, rejectUnauthorized: true });
  return new Promise((resolve, reject) => {
    socket.once('secureConnect', () => resolve(socket));
    socket.once('error', reject);
  });
}

function upgradeToTls(socket, host) {
  return new Promise((resolve, reject) => {
    const secureSocket = tls.connect({ socket, host, servername: host, rejectUnauthorized: true });
    secureSocket.once('secureConnect', () => resolve(secureSocket));
    secureSocket.once('error', reject);
  });
}

function normalizeAllowlist(value) {
  const list = Array.isArray(value) ? value : [value];
  return new Set(list.filter(Boolean).map(cleanAddress));
}

/**
 * Create a real authenticated SMTP relay transport.
 *
 * This transport is intentionally not an open relay: a configured sender
 * allowlist is mandatory, and the authenticated credentials are never logged.
 * `security` may be `starttls`, `tls`, or `plain` (plain is rejected by
 * default unless `allowInsecureTransport` is explicitly true).
 */
export function createAuthenticatedRelayTransport({
  id = 'authenticated-relay',
  host,
  port = 587,
  security = 'starttls',
  username,
  password,
  authorizedSender,
  allowInsecureTransport = false
} = {}) {
  if (!host) throw new Error('Relay host is required');
  if (!username || !password) throw new Error('Relay username and password/token are required');
  const senderAllowlist = normalizeAllowlist(authorizedSender);
  if (!senderAllowlist.size) throw new Error('An authorized sender is required');
  if (!['starttls', 'tls', 'plain'].includes(security)) throw new Error(`Unsupported relay security: ${security}`);
  if (security === 'plain' && !allowInsecureTransport) throw new Error('Insecure relay transport is disabled');

  const config = Object.freeze({ id, host, port, security, username });
  const transport = {
    id: config.id,
    host: config.host,
    port: config.port,
    security: config.security,
    authorizedSender: true,
    openRelay: false,
    spoofing: false,
    assertSender(sender) {
      const normalized = cleanAddress(sender);
      if (!senderAllowlist.has(normalized)) throw new Error(`Sender is not an authorized sender: ${normalized}`);
      return true;
    },
    toString: () => '[Authenticated SMTP relay transport]',
    toJSON: () => ({ id: config.id, host: config.host, port: config.port, security: config.security, authorizedSender: true, openRelay: false, spoofing: false }),
    async send(envelope) {
      const from = typeof envelope.from === 'object' ? envelope.from.email : envelope.from;
      transport.assertSender(from);
      let socket = security === 'tls' ? await connectTls(config.host, config.port) : await connectPlain(config.host, config.port);
      try {
        let nextLine = lineReader(socket);
        await response(nextLine);
        const ehloName = cleanAddress(username).split('@')[0];
        await command(socket, nextLine, `EHLO ${ehloName}`);
        if (security === 'starttls') {
          await command(socket, nextLine, 'STARTTLS', 220);
          socket = await upgradeToTls(socket, config.host);
          nextLine = lineReader(socket);
          await command(socket, nextLine, `EHLO ${ehloName}`);
        }
        const auth = Buffer.from(`\u0000${username}\u0000${password}`).toString('base64');
        await command(socket, nextLine, `AUTH PLAIN ${auth}`);
        await command(socket, nextLine, `MAIL FROM:<${cleanAddress(from)}>`);
        await command(socket, nextLine, `RCPT TO:<${cleanAddress(envelope.to)}>`);
        socket.write('DATA\r\n');
        await response(nextLine);
        socket.write(`${buildMessage(envelope)}.\r\n`);
        await response(nextLine);
        await command(socket, nextLine, 'QUIT');
        return { ok: true, mode: 'smtp-relay', relay: config.id, email: envelope.to, from };
      } finally {
        socket.end();
      }
    }
  };
  return Object.freeze(transport);
}
