import Foundation

public struct BizXGameState {
    public var scene = "prologue.ledger"
    public var hp = 100
    public var xp = 0
    public var credits = 500
    public var inventory: [String:Int] = [:]
    public var flags: Set<String> = []
    public var factionRep: [String:Int] = ["civic":0, "traders":0, "iron":0]
    public var quests: [String:String] = [:]
}

public final class BizXGameEngine {
    public private(set) var state = BizXGameState()
    private var generator: SystemRandomNumberGenerator
    public init() { generator = SystemRandomNumberGenerator() }
    public func grantItem(_ item: String, count: Int = 1) { state.inventory[item, default: 0] += count }
    public func choose(scene: String, credits: Int = 0, xp: Int = 0, flag: String? = nil, quest: String? = nil) {
        state.scene = scene; state.credits += credits; state.xp += xp
        if let flag { state.flags.insert(flag) }; if let quest { state.quests[quest] = "active" }
    }
    public func adjustFaction(_ faction: String, by delta: Int) { state.factionRep[faction] = min(100, max(-100, (state.factionRep[faction] ?? 0) + delta)) }
    public func skillCheck(skill: Int, difficulty: Int) -> (roll: Int, total: Int, success: Bool, critical: Bool) {
        let roll = Int.random(in: 1...20, using: &generator); return (roll, roll + skill, roll + skill >= difficulty, roll == 20)
    }
    public func combatRound(attack: Int, defense: Int, damage: Int) -> Int { let r = skillCheck(skill: attack, difficulty: defense); return r.success ? damage * (r.critical ? 2 : 1) : 0 }
}
