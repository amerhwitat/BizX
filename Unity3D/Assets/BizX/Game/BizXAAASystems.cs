using System; using System.Collections.Generic; using UnityEngine;

namespace BizX.Game {
[Serializable] public class BizXWorldCell { public string id; public long seed; public string biome="plains"; public int population; public string weather="clear"; public bool loaded; }
[Serializable] public class BizXNPC { public string id; public string faction; public float food=1, rest=1, safety=1; public string state="idle"; }
[Serializable] public class BizXVehicle { public string id; public string owner; public float fuel=100, durability=100, speed=1; public int cargo, cargoCapacity=10; }
public sealed class BizXAAASystems : MonoBehaviour {
 public int tick; public List<BizXWorldCell> cells=new(); public List<BizXNPC> npcs=new(); public List<BizXVehicle> vehicles=new(); public List<string> activeEvents=new(); public Dictionary<string,float> prices=new();
 public void TickOnce(){tick++; foreach(var n in npcs){n.food=Mathf.Max(0,n.food-.005f);n.rest=Mathf.Max(0,n.rest-.003f);n.state=n.safety<.25f?"flee":n.food<.25f?"seek_food":n.rest<.2f?"sleep":"work";}}
 public float Market(string good,float supply,float demand){float p=Mathf.Max(.01f,(demand+1)/(supply+1));prices[good]=p;return p;}
 public int ResolveAbility(int baseDamage,int defense,int roll){bool hit=roll+5>=defense;return hit?baseDamage*(roll==20?2:1):0;}
 public void TriggerWorldEvent(string id){if(!activeEvents.Contains(id))activeEvents.Add(id);}
}
}
