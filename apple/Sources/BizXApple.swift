import Foundation

public struct BizXAppleApp: Sendable {
    public init() {}
    public let schemaVersion = 1
    public let capabilities = ["authenticated-chat", "voice", "camera", "conversation-sync"]
}
