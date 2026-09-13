class RelayPolicy {
  final bool authorized, openRelay, spoofFrom, privacyMode;
  const RelayPolicy({this.authorized = true, this.openRelay = false, this.spoofFrom = false, this.privacyMode = false});
  void validate() {
    if (openRelay || spoofFrom) throw StateError('Open relays and From spoofing are disabled');
    if (!authorized) throw StateError('Relay authorization is required');
  }
}
