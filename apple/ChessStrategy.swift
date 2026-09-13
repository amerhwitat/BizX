import Foundation

public struct BizXChessStrategy {
    public private(set) var turn: Int = 0
    public private(set) var resources: [String:Int] = ["gold":100,"food":100,"science":0]
    public mutating func tick(_ resource: String, _ amount: Int) -> Int { resources[resource, default: 0] += amount; turn += 1; return turn }
    public func uci(_ fen: String, command: String = "go movetime 100") -> [String:String] { ["protocol":"UCI","fen":fen,"command":command,"adapter":"external-engine"] }
}
