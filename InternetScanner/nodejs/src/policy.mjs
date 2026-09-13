import net from 'node:net';

function ipv4Private(ip) {
  const p = ip.split('.').map(Number);
  return p.length === 4 && ((p[0] === 10) || (p[0] === 172 && p[1] >= 16 && p[1] <= 31) || (p[0] === 192 && p[1] === 168) || p[0] === 127 || (p[0] === 169 && p[1] === 254));
}

function ipv6Local(ip) {
  const s = ip.toLowerCase();
  return s === '::1' || s.startsWith('fe80:') || s.startsWith('fc') || s.startsWith('fd');
}

export function classifyIp(ip) {
  if (net.isIP(ip) === 4) return ipv4Private(ip) ? 'local/intranet' : 'public';
  if (net.isIP(ip) === 6) return ipv6Local(ip) ? 'local/intranet' : 'public';
  throw new Error(`invalid IP: ${ip}`);
}

export class PolicyError extends Error { constructor(message) { super(message); this.name = 'PolicyError'; } }

export function authorizeTarget(target, config = {}) {
  const scope = classifyIp(target.ip);
  if (scope === 'local/intranet') return { authorized: true, scope, reason: 'private-or-local' };
  const allow = new Set(config.public?.allowlistedTargets ?? []);
  if (config.authorizedOnly !== false && !allow.has(target.ip)) return { authorized: false, scope, reason: 'public-target-not-allowlisted' };
  return { authorized: true, scope, reason: 'explicit-public-allowlist' };
}

export function assertAuthorized(target, config) {
  const decision = authorizeTarget(target, config);
  if (!decision.authorized) throw new PolicyError(`active probe blocked: ${target.ip}`);
  return decision;
}
