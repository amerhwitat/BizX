export type BizXGameState = { scene: string; hp: number; xp: number; credits: number; inventory: Record<string, number>; flags: Set<string>; factionRep: Record<string, number>; quests: Record<string, string> };

export class BizXGameEngine {
  readonly state: BizXGameState = { scene: 'prologue.ledger', hp: 100, xp: 0, credits: 500, inventory: {}, flags: new Set(), factionRep: { civic: 0, traders: 0, iron: 0 }, quests: {} };
  private seed: number;
  constructor(seed = 1337) { this.seed = seed; }
  grantItem(item: string, count = 1) { this.state.inventory[item] = (this.state.inventory[item] ?? 0) + count; }
  choose(nextScene: string, effects: { credits?: number; xp?: number; flags?: string[]; quest?: string; factionRep?: Record<string, number> } = {}) {
    this.state.scene = nextScene; this.state.credits += effects.credits ?? 0; this.state.xp += effects.xp ?? 0;
    for (const f of effects.flags ?? []) this.state.flags.add(f);
    if (effects.quest) this.state.quests[effects.quest] = 'active';
    for (const [f,d] of Object.entries(effects.factionRep ?? {})) this.state.factionRep[f] = Math.max(-100, Math.min(100, (this.state.factionRep[f] ?? 0) + d));
  }
  skillCheck(skill: number, difficulty: number) { this.seed = (this.seed * 1664525 + 1013904223) >>> 0; const roll = this.seed % 20 + 1; return { roll, total: roll + skill, difficulty, success: roll + skill >= difficulty, critical: roll === 20 }; }
  combatRound(attack: number, defense: number, damage: number) { const r = this.skillCheck(attack, defense); return { ...r, damage: r.success ? damage * (r.critical ? 2 : 1) : 0 }; }
}
