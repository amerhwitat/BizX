import net from 'node:net';
import tls from 'node:tls';

function cleanHeader(value) {
  return String(value ?? '').replace(/[\r\n]/g, ' ').trim();
}

function cleanAddress(value) {
  const address = String(value ?? '').replace(/[\r\n<>]/g, '').trim();
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
  return [`From: ${displayFrom}`, `To: ${toAddress}`, `Subject: ${safeSubject}`, 'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: 8bit', '', body, ''].join('\r\n');
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
  if (!Number.isInteger(code) || code < 200 || code >= 400) throw new Error(`SMTP ${code || 'response'}: ${lines.join(' | ')}`);
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

function startTls(socket, host) {
  return new Promise((resolve, reject) => {
    const secureSocket = tls.connect({ socket, host, servername: host, rejectUnauthorized: true });
    secureSocket.once('secureConnect', () => resolve(secureSocket));
    secureSocket.once('error', reject);
  });
}

export function createProtonSmtpTransport({ username, token, host = 'smtp.protonmail.ch', port = 587 } = {}) {
  if (!username || !token) throw new Error('SMTP username and token are required');
  const config = Object.freeze({ host, port, secure: false });
  return Object.freeze({
    host: config.host,
    port: config.port,
    secure: config.secure,
    toString: () => '[Proton SMTP transport]',
    toJSON: () => ({ host: config.host, port: config.port, secure: config.secure }),
    async send(envelope) {
      let socket = await connectPlain(config.host, config.port);
      try {
        let nextLine = lineReader(socket);
        await response(nextLine);
        const ehloName = cleanAddress(username).split('@')[0];
        await command(socket, nextLine, `EHLO ${ehloName}`);
        await command(socket, nextLine, 'STARTTLS', 220);
        socket = await startTls(socket, config.host);
        nextLine = lineReader(socket);
        await command(socket, nextLine, `EHLO ${ehloName}`);
        const auth = Buffer.from(`\u0000${username}\u0000${token}`).toString('base64');
        await command(socket, nextLine, `AUTH PLAIN ${auth}`);
        const from = typeof envelope.from === 'object' ? envelope.from.email : envelope.from;
        await command(socket, nextLine, `MAIL FROM:<${cleanAddress(from)}>`);
        await command(socket, nextLine, `RCPT TO:<${cleanAddress(envelope.to)}>`);
        socket.write('DATA\r\n');
        await response(nextLine);
        socket.write(`${buildMessage(envelope)}.\r\n`);
        await response(nextLine);
        await command(socket, nextLine, 'QUIT');
        return { ok: true, mode: 'smtp', email: envelope.to, from };
      } finally {
        socket.end();
      }
    }
  });
}
