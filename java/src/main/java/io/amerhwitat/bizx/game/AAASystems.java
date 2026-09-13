package io.amerhwitat.bizx.game;

import java.util.*;

/** Engine-neutral systemic simulation: world cells, NPC needs, events, economy and abilities. */
public final class AAASystems {
    public record WorldCell(String id,long seed,String biome,int population,String weather,boolean loaded) {}
    public record NPC(String id,String faction,double food,double rest,double safety,String state) {}
    public record Vehicle(String id,String owner,double fuel,double durability,int cargoCapacity,int cargo,double speed) {}
    private final Random rng; private long tick;
    private final Map<String,WorldCell> cells=new HashMap<>(); private final Map<String,NPC> npcs=new HashMap<>();
    private final Map<String,Double> prices=new HashMap<>(); private final List<Map<String,Object>> events=new ArrayList<>();
    private final Map<String,Map<String,Object>> abilities=new HashMap<>();
    public AAASystems(long seed){rng=new Random(seed);}
    public void addCell(WorldCell c){cells.put(c.id(),c);} public void addNpc(NPC n){npcs.put(n.id(),n);}
    public void registerAbility(String id,double resource,int cooldown,Map<String,Object> effects){abilities.put(id,Map.of("resource",resource,"cooldown",cooldown,"effects",effects));}
    public void triggerEvent(String id,String kind,int duration,Map<String,Object> effects){events.add(new HashMap<>(Map.of("id",id,"kind",kind,"remaining",duration,"effects",effects)));}
    public void tick(){tick++; npcs.replaceAll((id,n)->new NPC(n.id(),n.faction(),Math.max(0,n.food()-.005),Math.max(0,n.rest()-.003),n.safety(),n.safety()<.25?"flee":n.food()<.25?"seek_food":n.rest()<.2?"sleep":"work")); events.forEach(e->e.put("remaining",((int)e.get("remaining"))-1)); events.removeIf(e->(int)e.get("remaining")<=0);}
    public double market(String good,double supply,double demand){double p=Math.max(.01,(demand+1)/(supply+1));prices.put(good,p);return p;}
    public Map<String,Object> resolveAbility(String id,int baseDamage,int defense){int roll=rng.nextInt(20)+1;boolean hit=roll+5>=defense;return Map.of("hit",hit,"critical",roll==20,"damage",hit?baseDamage*(roll==20?2:1):0,"effects",abilities.getOrDefault(id,Map.of()).getOrDefault("effects",Map.of()));}
    public long tickCount(){return tick;} public Map<String,Double> prices(){return Map.copyOf(prices);}
}
