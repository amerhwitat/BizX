package io.amerhwitat.bizx.game

import kotlin.random.Random

data class GameState(
    var scene: String = "prologue.ledger", var hp: Int = 100, var xp: Int = 0, var credits: Int = 500,
    val inventory: MutableMap<String, Int> = mutableMapOf(), val flags: MutableSet<String> = mutableSetOf(),
    val factionRep: MutableMap<String, Int> = mutableMapOf("civic" to 0, "traders" to 0, "iron" to 0),
    val quests: MutableMap<String, String> = mutableMapOf()
)

class BizXGameEngine(seed: Int = 1337) {
    private val rng = Random(seed); val state = GameState()
    fun grantItem(item: String, count: Int = 1) { state.inventory[item] = (state.inventory[item] ?: 0) + count }
    fun choose(nextScene: String, creditDelta: Int = 0, flag: String? = null, quest: String? = null) {
        state.scene = nextScene; state.credits += creditDelta; flag?.let { state.flags += it }; quest?.let { state.quests[it] = "active" }
    }
    fun adjustFaction(faction: String, delta: Int) { state.factionRep[faction] = ((state.factionRep[faction] ?: 0) + delta).coerceIn(-100, 100) }
    fun skillCheck(skill: Int, difficulty: Int): Triple<Int, Int, Int> { val roll = rng.nextInt(1, 21); return Triple(roll, roll + skill, difficulty) }
    fun combatDamage(attack: Int, defense: Int, damage: Int): Int { val (roll,total,_) = skillCheck(attack, defense); return if (total >= defense) damage * if (roll == 20) 2 else 1 else 0 }
}
