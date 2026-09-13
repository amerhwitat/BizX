import Foundation
import CryptoKit

public struct BizXVec3 { public let x, y, z: Double; public init(_ x: Double,_ y: Double,_ z: Double){self.x=x;self.y=y;self.z=z} }
public struct BizXNetworkResult { public let target: String; public let allowed: Bool; public let classification: String }

/// Swift/iOS/macOS feature-parity facade. Platform UI/rendering adapters remain native.
public final class UnifiedBizXRuntime {
    public let modules = ["game","network","network_unified","launcher","internet_scanner","asset_browser","crypto","web","3d","game_assets","game_store","rendering","scripts"]
    public init() {}
    public func health() -> [String: Any] { ["status":"ok", "implementation":"swift", "modules":modules] }
    public func project(_ p: BizXVec3, width: Double = 800, height: Double = 600, cameraZ: Double = 5) -> BizXVec3 {
        let z = p.z - cameraZ; precondition(z < 0, "point is behind camera")
        let s = 1 / -z
        return BizXVec3(width/2 + p.x*s*width/2, height/2 - p.y*s*height/2, -z)
    }
    public func sha256(_ data: Data) -> Data { Data(SHA256.hash(data: data)) }
    public func cryptoIntent(provider: String, currency: String, amountMinor: Int64) -> String {
        precondition(!provider.isEmpty && amountMinor >= 0)
        return "\(provider):\(currency):\(amountMinor):UNSIGNED"
    }
}
