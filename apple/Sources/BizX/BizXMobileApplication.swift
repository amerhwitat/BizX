import Foundation

public struct BizXMobileApplication {
    public let runtime = UnifiedBizXRuntime()
    public init() {}
    public func start() { print(runtime.health()) }
}
