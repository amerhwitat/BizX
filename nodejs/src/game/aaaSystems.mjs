export class AAASystems {
  constructor(seed = 1) { this.seed = seed >>> 0; this.tick = 0; this.cells = new Map(); this.npcs = new Map(); this.vehicles = new Map(); this.events = []; this.prices = new Map(); this.abilities = new Map(); }
  rand() { this.seed = (1664525 * this.seed + 1013904223) >>> 0; return this.seed / 0x100000000; }
  addCell(cell) { this.cells.set(cell.id, {...cell}); }
  addNpc(npc) { this.npcs.set(npc.id, {...npc}); }
  addVehicle(vehicle) { this.vehicles.set(vehicle.id, {...vehicle}); }
  registerAbility(id, resource, cooldown, effects = {}) { this.abilities.set(id, {resource, cooldown, effects}); }
  triggerEvent(id, kind, duration, effects = {}) { this.events.push({id, kind, remaining: duration, effects}); }
  tickOnce() { this.tick++; for (const n of this.npcs.values()) { n.food = Math.max(0, n.food - .005); n.rest = Math.max(0, n.rest - .003); n.state = n.safety < .25 ? 'flee' : n.food < .25 ? 'seek_food' : n.rest < .2 ? 'sleep' : 'work'; } this.events = this.events.map(e => ({...e, remaining:e.remaining-1})).filter(e => e.remaining > 0); }
  marketUpdate(good, supply, demand) { const price = Math.max(.01, (demand + 1) / (supply + 1)); this.prices.set(good, Number(price.toFixed(4))); return this.prices.get(good); }
  resolveAbility(id, baseDamage, defense = 0) { const a = this.abilities.get(id); const roll = Math.floor(this.rand()*20)+1; const hit = roll + 5 >= defense; return {hit, critical:roll===20, damage:hit ? baseDamage*(roll===20?2:1):0, effects:a?.effects ?? {}}; }
  snapshot() { return {tick:this.tick, cells:Object.fromEntries(this.cells), npcs:Object.fromEntries(this.npcs), prices:Object.fromEntries(this.prices)}; }
}
