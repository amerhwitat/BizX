export type WorldCell={id:string;seed:number;biome:string;population:number;weather:string;loaded:boolean};
export type NPC={id:string;faction:string;food:number;rest:number;safety:number;state:string};
export type Vehicle={id:string;owner:string;fuel:number;durability:number;cargo:number;cargoCapacity:number;speed:number};
export class AAASystems {
  tick=0; cells=new Map<string,WorldCell>(); npcs=new Map<string,NPC>(); prices=new Map<string,number>(); events:Array<Record<string,unknown>>=[]; private seed:number;
  constructor(seed=1){this.seed=seed>>>0}
  private rand(){this.seed=(Math.imul(1664525,this.seed)+1013904223)>>>0;return this.seed/0x100000000}
  addCell(c:WorldCell){this.cells.set(c.id,{...c})}; addNPC(n:NPC){this.npcs.set(n.id,{...n})}
  triggerEvent(id:string,kind:string,duration:number,effects:Record<string,unknown>={}){this.events.push({id,kind,remaining:duration,effects})}
  tickOnce(){this.tick++; for(const n of this.npcs.values()){n.food=Math.max(0,n.food-.005);n.rest=Math.max(0,n.rest-.003);n.state=n.safety<.25?'flee':n.food<.25?'seek_food':n.rest<.2?'sleep':'work'} for(const e of this.events)e.remaining=Number(e.remaining)-1;this.events=this.events.filter(e=>Number(e.remaining)>0)}
  market(good:string,supply:number,demand:number){const p=Math.max(.01,(demand+1)/(supply+1));this.prices.set(good,Number(p.toFixed(4)));return p}
  resolveAbility(baseDamage:number,defense=0){const r=Math.floor(this.rand()*20)+1;const hit=r+5>=defense;return{hit,critical:r===20,damage:hit?baseDamage*(r===20?2:1):0}}
}
