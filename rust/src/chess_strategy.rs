use std::collections::HashMap;

#[derive(Default)]
pub struct ChessStrategy { pub turn: u64, pub resources: HashMap<String,i64> }
impl ChessStrategy {
    pub fn new() -> Self { Self { turn: 0, resources: HashMap::from([("gold".into(),100),("food".into(),100),("science".into(),0)]) } }
    pub fn tick(&mut self, resource: &str, amount: i64) -> u64 { *self.resources.entry(resource.into()).or_default() += amount; self.turn += 1; self.turn }
    pub fn uci(&self, fen: &str, command: &str) -> (String,String,String) { ("UCI".into(), fen.into(), if command.is_empty() { "go movetime 100".into() } else { command.into() }) }
}
