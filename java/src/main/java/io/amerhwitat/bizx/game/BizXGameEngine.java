package io.amerhwitat.bizx.game;

import java.util.*;

/** Authoritative, engine-neutral game state for quests, factions and combat. */
public final class BizXGameEngine {
    public record State(String scene, int hp, int xp, int credits, Map<String,Integer> inventory,
                        Set<String> flags, Map<String,Integer> factionRep, Map<String,String> quests) {}
    private final Random rng;
    private String scene = "prologue.ledger";
    private int hp = 100, xp = 0, credits = 500;
    private final Map<String,Integer> inventory = new HashMap<>();
    private final Set<String> flags = new HashSet<>();
    private final Map<String,Integer> factionRep = new HashMap<>(Map.of("civic",0,"traders",0,"iron",0));
    private final Map<String,String> quests = new HashMap<>();

    public BizXGameEngine(long seed) { rng = new Random(seed); }
    public void grantItem(String item, int count) { inventory.merge(item, count, Integer::sum); }
    public void choose(String nextScene, int creditDelta, String flag, String quest) {
        scene = nextScene; credits += creditDelta; if (flag != null) flags.add(flag); if (quest != null) quests.put(quest, "active");
    }
    public void adjustFaction(String faction, int delta) { factionRep.compute(faction, (k,v) -> Math.max(-100, Math.min(100, (v == null ? 0 : v) + delta))); }
    public int[] skillCheck(int skill, int difficulty) { int roll = rng.nextInt(20) + 1; return new int[]{roll, roll + skill, difficulty}; }
    public int combatDamage(int attack, int defense, int damage) { int[] r = skillCheck(attack, defense); return r[1] >= defense ? damage * (r[0] == 20 ? 2 : 1) : 0; }
    public State snapshot() { return new State(scene,hp,xp,credits,Map.copyOf(inventory),Set.copyOf(flags),Map.copyOf(factionRep),Map.copyOf(quests)); }
}
