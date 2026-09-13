class RelayPolicy
  attr_reader :authorized, :open_relay, :spoof_from, :privacy_mode
  def initialize(authorized: true, open_relay: false, spoof_from: false, privacy_mode: false)
    @authorized, @open_relay, @spoof_from, @privacy_mode = authorized, open_relay, spoof_from, privacy_mode
  end
  def validate!
    raise 'Open relays and From spoofing are disabled' if open_relay || spoof_from
    raise 'Relay authorization is required' unless authorized
    true
  end
end
