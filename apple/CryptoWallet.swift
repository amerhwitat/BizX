import Foundation
public struct BizXWallet {
    public static let supportedCoins = ["BTC","BCH","LTC","DOGE","ETH","ETC","SOL","ADA","XRP","DOT","AVAX"]
    public let coin: String; public let address: String; public let watchOnly: Bool
    public init(coin: String, address: String, watchOnly: Bool = true) { precondition(Self.supportedCoins.contains(coin)); self.coin=coin; self.address=address; self.watchOnly=watchOnly }
    public func transaction(to: String, amount: String) -> [String:String] { ["state":"awaiting_confirmation","coin":coin,"from":address,"to":to,"amount":amount] }
}
