import SwiftUI

public struct BizXAppleApp: Sendable {
    public init() {}
    public let schemaVersion = 1
    public let capabilities = ["authenticated-chat", "voice", "camera", "conversation-sync"]
}

@main
struct BizXAppleMain: App {
    var body: some Scene { WindowGroup { Text("BizX Apple") } }
}
