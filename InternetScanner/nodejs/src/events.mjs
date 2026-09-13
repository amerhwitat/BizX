export class EventBus {
  #listeners = new Set();
  subscribe(listener) { this.#listeners.add(listener); return () => this.#listeners.delete(listener); }
  publish(event) { for (const listener of this.#listeners) listener(Object.freeze({ ...event, at: event.at ?? new Date().toISOString() })); }
}

export class ScanSession {
  constructor(id, bus) { this.id = id; this.bus = bus; this.state = 'idle'; this.snapshotData = { id, state: this.state, hosts: [], events: [] }; }
  start() { this.state = 'running'; this.#emit('scan.started'); }
  pause() { if (this.state === 'running') { this.state = 'paused'; this.#emit('scan.paused'); } }
  resume() { if (this.state === 'paused') { this.state = 'running'; this.#emit('scan.resumed'); } }
  cancel() { if (!['completed','cancelled'].includes(this.state)) { this.state = 'cancelled'; this.#emit('scan.cancelled'); } }
  complete() { this.state = 'completed'; this.#emit('scan.completed'); }
  snapshot() { return structuredClone({ ...this.snapshotData, state: this.state }); }
  #emit(type, data = {}) { const event = { type, scanId: this.id, ...data }; this.snapshotData.events.push(event); this.bus.publish(event); }
}

export class ScanController {
  constructor(bus = new EventBus()) { this.bus = bus; this.sessions = new Map(); }
  start() { const id = `scan-${Date.now()}-${Math.random().toString(16).slice(2)}`; const s = new ScanSession(id, this.bus); this.sessions.set(id, s); s.start(); return s; }
}
