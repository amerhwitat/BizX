#[derive(Clone,Debug)]
pub struct Wallet { pub coin: String, pub address: String, pub watch_only: bool }
pub const SUPPORTED_COINS: [&str;11] = ["BTC","BCH","LTC","DOGE","ETH","ETC","SOL","ADA","XRP","DOT","AVAX"];
impl Wallet { pub fn transaction(&self,to:&str,amount:&str)->serde_json::Value { serde_json::json!({"state":"awaiting_confirmation","coin":self.coin,"from":self.address,"to":to,"amount":amount}) } }
