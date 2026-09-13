export type ResourceMap = Record<string, number>;
export interface UciRequest { protocol: 'UCI'; fen: string; command: string; }
export class BizXChessStrategy {
  turn = 0;
  resources: ResourceMap = { gold: 100, food: 100, science: 0 };
  strategyTick(resource: string, amount: number): number { this.resources[resource] = (this.resources[resource] ?? 0) + amount; return ++this.turn; }
  uci(fen: string, command = 'go movetime 100'): UciRequest { return { protocol: 'UCI', fen, command }; }
  snapshot() { return { turn: this.turn, resources: { ...this.resources } }; }
}
