package io.amerhwitat.bizx.game

data class WorldCell(val id:String,val seed:Long,val biome:String,var population:Int=0,var weather:String="clear",var loaded:Boolean=false)
data class Npc(val id:String,val faction:String,var food:Double=1.0,var rest:Double=1.0,var safety:Double=1.0,var state:String="idle")
data class Vehicle(val id:String,val owner:String,var fuel:Double=100.0,var durability:Double=100.0,var cargo:Int=0,val cargoCapacity:Int=10,var speed:Double=1.0)

class AAASystems(seed:Long=1L) {
    private var state=seed; var tick:Long=0; val cells=mutableMapOf<String,WorldCell>(); val npcs=mutableMapOf<String,Npc>(); val prices=mutableMapOf<String,Double>(); val events=mutableListOf<MutableMap<String,Any>>(); val abilities=mutableMapOf<String,Map<String,Any>>()
    private fun rand():Int { state = (state*6364136223846793005L + 1442695040888963407L); return ((state ushr 33) and Int.MAX_VALUE.toLong()).toInt()%20+1 }
    fun addCell(c:WorldCell)=cells.set(c.id,c); fun addNpc(n:Npc)=npcs.set(n.id,n)
    fun registerAbility(id:String,resource:Double,cooldown:Int,effects:Map<String,Any>) { abilities[id]=mapOf("resource" to resource,"cooldown" to cooldown,"effects" to effects) }
    fun triggerEvent(id:String,kind:String,duration:Int,effects:Map<String,Any>) { events += mutableMapOf("id" to id,"kind" to kind,"remaining" to duration,"effects" to effects) }
    fun tickOnce(){ tick++; npcs.values.forEach{it.food=(it.food-.005).coerceAtLeast(0.0);it.rest=(it.rest-.003).coerceAtLeast(0.0);it.state=when{it.safety<.25->"flee";it.food<.25->"seek_food";it.rest<.2->"sleep";else->"work"}};events.forEach{it["remaining"]=(it["remaining"] as Int)-1};events.removeAll{it["remaining"] as Int<=0} }
    fun market(good:String,supply:Double,demand:Double):Double { val p=maxOf(.01,(demand+1)/(supply+1));prices[good]=p;return p }
    fun resolveAbility(id:String,baseDamage:Int,defense:Int=0):Map<String,Any>{val r=rand();val hit=r+5>=defense;return mapOf("hit" to hit,"critical" to (r==20),"damage" to if(hit) baseDamage*if(r==20)2 else 1 else 0,"effects" to (abilities[id]?.get("effects") ?: emptyMap<String,Any>()))}
}
