export class BizXGameEngine {
  constructor(seed = 1337) {
    this.seed = seed;
    this.state = { scene: 'prologue.ledger', hp: 100, xp: 0, credits: 500, inventory: {}, flags: [], factionRep: { civic: 0, traders: 0, iron: 0 }, quests: {} };
  }
  grantItem(item, count = 1) { this.state.inventory[item] = (this.state.inventory[item] ?? 0) + count; }
  applyEffects(e = {}) {
    this.state.credits += e.credits ?? 0; this.state.xp += e.xp ?? 0;
    for (const f of e.flags ?? []) if (!this.state.flags.includes(f)) this.state.flags.push(f);
    for (const [f, d] of Object.entries(e.factionRep ?? {})) this.state.factionRep[f] = Math.max(-100, Math.min(100, (this.state.factionRep[f] ?? 0) + d));
    if (e.quest) this.state.quests[e.quest] = 'active';
  }
  choose(nextScene, effects = {}) { this.applyEffects(effects); this.state.scene = nextScene; return structuredClone(this.state); }
  skillCheck(skill, difficulty, roll = ((this.seed = (this.seed * 1664525 + 1013904223) >>> 0) % 20) + 1) {
    const total = roll + skill; return { roll, total, difficulty, success: total >= difficulty, critical: roll === 20 };
  }
  combatRound(attack, defense, damage, roll) { const r = this.skillCheck(attack, defense, roll); return { ...r, damage: r.success ? damage * (r.critical ? 2 : 1) : 0 }; }
}
