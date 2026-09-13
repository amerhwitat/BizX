export class StrategyState {
  constructor() { this.turn = 0; this.resources = { gold: 100, food: 100, science: 0 }; this.territory = []; }
}
export class ChessStrategy {
  constructor() { this.state = new StrategyState(); }
  tick(resource, amount) { this.state.resources[resource] = (this.state.resources[resource] ?? 0) + amount; this.state.turn++; return this.snapshot(); }
  snapshot() { return { turn: this.state.turn, resources: {...this.state.resources}, territory: [...this.state.territory] }; }
  uci(fen, command = 'go movetime 100') { return { protocol: 'UCI', position: fen, command, adapter: 'external-engine' }; }
}
