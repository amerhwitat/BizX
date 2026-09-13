namespace BizX.Game;
public sealed class AaaSystems { public int Tick {get;private set;}=0; public Dictionary<string,double> Prices {get;}=new(); public List<Npc> Npcs {get;}=new(); public sealed class Npc { public string Id=""; public string Faction=""; public double Food=1,Rest=1,Safety=1; public string State="idle"; }
 public void TickOnce(){Tick++;foreach(var n in Npcs){n.Food=Math.Max(0,n.Food-.005);n.Rest=Math.Max(0,n.Rest-.003);n.State=n.Safety<.25?"flee":n.Food<.25?"seek_food":n.Rest<.2?"sleep":"work";}}
 public double Market(string good,double supply,double demand){var p=Math.Max(.01,(demand+1)/(supply+1));Prices[good]=p;return p;}
 public int ResolveAbility(int baseDamage,int defense,int roll)=>roll+5<defense?0:baseDamage*(roll==20?2:1);
}
