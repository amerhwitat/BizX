public struct RelayPolicy {
    public let authorized: Bool
    public let openRelay: Bool
    public let spoofFrom: Bool
    public let privacyMode: Bool
    public init(authorized: Bool = true, openRelay: Bool = false, spoofFrom: Bool = false, privacyMode: Bool = false) { self.authorized = authorized; self.openRelay = openRelay; self.spoofFrom = spoofFrom; self.privacyMode = privacyMode }
    public func validate() throws {
        if openRelay || spoofFrom { throw NSError(domain: "EmailSender", code: 1, userInfo: [NSLocalizedDescriptionKey: "Open relays and From spoofing are disabled"]) }
        if !authorized { throw NSError(domain: "EmailSender", code: 2, userInfo: [NSLocalizedDescriptionKey: "Relay authorization is required"]) }
    }
}
