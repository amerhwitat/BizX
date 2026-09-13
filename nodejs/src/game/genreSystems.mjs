export class GenreGameSystems {
  constructor() {
    this.vehicle = { speed: 0, grip: 1, fuel: 100, durability: 100, heat: 0 };
    this.fighter = { health: 100, stamina: 100, meter: 0, frame: 0, guarding: false, combo: 0 };
    this.world = { wanted: 0, territory: {}, factionRep: {}, businesses: {} };
    this.inputs = [];
  }
  drive(throttle, brake, steering, dt = 1 / 60) {
    throttle = Math.max(0, Math.min(1, throttle)); brake = Math.max(0, Math.min(1, brake));
    this.vehicle.speed = Math.max(0, this.vehicle.speed + (throttle * 18 - brake * 28) * dt);
    this.vehicle.speed *= Math.max(0, 1 - Math.abs(steering) * (1 - this.vehicle.grip) * dt);
    this.vehicle.fuel = Math.max(0, this.vehicle.fuel - throttle * 0.02);
    return this.vehicle;
  }
  setWanted(delta) { this.world.wanted = Math.max(0, Math.min(5, this.world.wanted + delta)); return this.world.wanted; }
  fighterInput(action) {
    this.fighter.frame++;
    const damage = ({ light: 6, heavy: 12, special: 20 })[action] ?? 0;
    const active = damage > 0;
    if (active) this.fighter.meter = Math.min(100, this.fighter.meter + damage * 0.5);
    this.inputs.push({ frame: this.fighter.frame, action });
    return { frame: this.fighter.frame, active, damage, meter: this.fighter.meter };
  }
  applyHit(damage, blocked = false) {
    const finalDamage = blocked ? Math.max(1, Math.floor(damage / 4)) : Math.max(0, damage);
    this.fighter.health = Math.max(0, this.fighter.health - finalDamage);
    this.fighter.combo = blocked ? 0 : this.fighter.combo + 1;
    return finalDamage;
  }
}
