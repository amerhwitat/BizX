export const PORT_STATES = Object.freeze(['open','closed','filtered','unfiltered','open|filtered','closed|filtered']);
export const VULNERABILITY_STATES = Object.freeze(['NOT_VULN','LIKELY_VULN','VULN']);
export const PROTOCOLS = Object.freeze(['tcp','udp']);

export function validatePort(port) {
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('invalid port');
}

export function validateProject(project) {
  if (!project || project.schema !== 1 || !Array.isArray(project.hosts)) throw new Error('invalid project');
  if (project.hosts.length > 1024) throw new Error('too many hosts');
  for (const h of project.hosts) {
    if (typeof h.ip !== 'string' || !['local/intranet','public'].includes(h.scope)) throw new Error('invalid host');
    for (const p of (h.openPorts ?? [])) {
      validatePort(p.port);
      if (!PROTOCOLS.includes(p.protocol) || !PORT_STATES.includes(p.state)) throw new Error('invalid port finding');
    }
  }
  return project;
}

export function redactSecrets(value) {
  const text = JSON.stringify(value, (key, v) => /pass(word)?|token|secret|private.?key|api.?key/i.test(key) ? '[REDACTED]' : v);
  return JSON.parse(text);
}
