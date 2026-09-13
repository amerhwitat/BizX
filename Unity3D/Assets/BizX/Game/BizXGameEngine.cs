using System.Collections.Generic;
using UnityEngine;

namespace BizX.Game {
    [System.Serializable] public sealed class BizXGameState {
        public string scene = "prologue.ledger"; public int hp = 100, xp = 0, credits = 500;
        public Dictionary<string,int> inventory = new(); public HashSet<string> flags = new();
        public Dictionary<string,int> factionRep = new() { ["civic"] = 0, ["traders"] = 0, ["iron"] = 0 };
        public Dictionary<string,string> quests = new();
    }
    public sealed class BizXGameEngine : MonoBehaviour {
        public BizXGameState State { get; } = new();
        public void GrantItem(string item, int count = 1) => State.inventory[item] = State.inventory.TryGetValue(item, out var n) ? n + count : count;
        public void Choose(string nextScene, int credits = 0, int xp = 0, string flag = null, string quest = null) {
            State.scene = nextScene; State.credits += credits; State.xp += xp;
            if (!string.IsNullOrEmpty(flag)) State.flags.Add(flag); if (!string.IsNullOrEmpty(quest)) State.quests[quest] = "active";
        }
        public void AdjustFaction(string faction, int delta) { var n = State.factionRep.TryGetValue(faction, out var value) ? value : 0; State.factionRep[faction] = Mathf.Clamp(n + delta, -100, 100); }
        public int CombatDamage(int attack, int defense, int damage) { var roll = Random.Range(1, 21); return roll + attack >= defense ? damage * (roll == 20 ? 2 : 1) : 0; }
    }
}
