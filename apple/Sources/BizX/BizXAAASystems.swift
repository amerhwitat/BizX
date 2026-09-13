import Foundation

public struct BizXWorldCell { public let id: String; public let seed: UInt64; public var biome: String; public var population: Int; public var weather: String; public var loaded: Bool }
public struct BizXNPC { public let id: String; public let faction: String; public var food: Double; public var rest: Double; public var safety: Double; public var state: String }
public struct BizXVehicle { public let id: String; public let owner: String; public var fuel: Double; public var durability: Double; public var cargo: Int; public let cargoCapacity: Int; public var speed: Double }

public final class BizXAAASystems {
    public private(set) var tick: UInt64 = 0
    public var cells: [String: BizXWorldCell] = [:]; public var npcs: [String: BizXNPC] = [:]
    public var prices: [String: Double] = [:]; public var events: [[String: Any]] = []
    private var rng: UInt64
    public init(seed: UInt64 = 1) { rng = seed }
    private func roll() -> Int { rng = rng &* 2862933555777941757 &+ 3037000493; return Int((rng >> 33) % 20) + 1 }
    public func addCell(_ c: BizXWorldCell) { cells[c.id] = c }; public func addNPC(_ n: BizXNPC) { npcs[n.id] = n }
    public func triggerEvent(id: String, kind: String, duration: Int, effects: [String: Any] = [:]) { events.append(["id":id,"kind":kind,"remaining":duration,"effects":effects]) }
    public func tickOnce() { tick += 1; for id in npcs.keys { var n=npcs[id]!; n.food=max(0,n.food-0.005); n.rest=max(0,n.rest-0.003); n.state=n.safety<0.25 ? "flee" : n.food<0.25 ? "seek_food" : n.rest<0.2 ? "sleep" : "work"; npcs[id]=n }; for i in events.indices { events[i]["remaining"]=(events[i]["remaining"] as! Int)-1 }; events.removeAll{ ($0["remaining"] as! Int) <= 0 } }
    @discardableResult public func market(good: String, supply: Double, demand: Double) -> Double { let p=max(0.01,(demand+1)/(supply+1)); prices[good]=p; return p }
    public func resolveAbility(baseDamage: Int, defense: Int) -> [String: Any] { let r=roll(); let hit=r+5>=defense; return ["hit":hit,"critical":r==20,"damage":hit ? baseDamage*(r==20 ? 2:1):0] }
}
