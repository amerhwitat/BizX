#[derive(Clone, Copy, Debug)]
pub struct RelayPolicy { pub authorized: bool, pub open_relay: bool, pub spoof_from: bool, pub privacy_mode: bool }

impl RelayPolicy {
    pub fn validate(&self) -> Result<(), &'static str> {
        if self.open_relay || self.spoof_from { return Err("open relays and From spoofing are disabled"); }
        if !self.authorized { return Err("relay authorization is required"); }
        Ok(())
    }
}
