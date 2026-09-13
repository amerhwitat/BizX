#[derive(Clone,Debug)] pub struct WorldCell{pub id:String,pub seed:u64,pub biome:String,pub population:u32,pub weather:String,pub loaded:bool}
#[derive(Clone,Debug)] pub struct Npc{pub id:String,pub faction:String,pub food:f32,pub rest:f32,pub safety:f32,pub state:String}
pub struct AaaSystems{pub tick:u64,pub cells:Vec<WorldCell>,pub npcs:Vec<Npc>,pub prices:std::collections::HashMap<String,f32>}
impl AaaSystems{pub fn new()->Self{Self{tick:0,cells:vec![],npcs:vec![],prices:Default::default()}}
pub fn tick_once(&mut self){self.tick+=1;for n in &mut self.npcs{n.food=(n.food-.005).max(0.);n.rest=(n.rest-.003).max(0.);n.state=if n.safety<.25{"flee"}else if n.food<.25{"seek_food"}else if n.rest<.2{"sleep"}else{"work"}.into();}}
pub fn market(&mut self,good:&str,supply:f32,demand:f32)->f32{let p=((demand+1.)/(supply+1.)).max(.01);self.prices.insert(good.into(),p);p}
pub fn resolve_ability(&self,base:i32,defense:i32,roll:i32)->i32{if roll+5<defense{0}else if roll==20{base*2}else{base}}}
