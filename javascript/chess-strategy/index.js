export class BizXChessStrategy {
  constructor() { this.turn = 0; this.resources = { gold: 100, food: 100, science: 0 }; }
  strategyTick(resource, amount) { this.resources[resource] = (this.resources[resource] ?? 0) + amount; return ++this.turn; }
  uci(fen, command = 'go movetime 100') { return { protocol: 'UCI', fen, command, adapter: 'external-engine' }; }
  snapshot() { return structuredClone({ turn: this.turn, resources: this.resources }); }
}
