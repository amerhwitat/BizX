from dataclasses import dataclass

@dataclass(frozen=True)
class RelayPolicy:
    authorized: bool = True
    open_relay: bool = False
    spoof_from: bool = False
    privacy_mode: bool = False

    def validate(self):
        if self.open_relay or self.spoof_from:
            raise ValueError('open relays and From spoofing are disabled')
        if not self.authorized:
            raise ValueError('relay authorization is required')
        return True
