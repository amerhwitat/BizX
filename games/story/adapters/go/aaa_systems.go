package bizxgame

import "math/rand"

type WorldCell struct { ID string; Seed int64; Biome string; Population int; Weather string; Loaded bool }
type NPC struct { ID, Faction string; Food, Rest, Safety float64; State string }
type AAASystems struct { Tick int64; Cells map[string]WorldCell; NPCs map[string]*NPC; Prices map[string]float64; Events []string; RNG *rand.Rand }
func NewAAASystems(seed int64)*AAASystems{return &AAASystems{Cells:map[string]WorldCell{},NPCs:map[string]*NPC{},Prices:map[string]float64{},RNG:rand.New(rand.NewSource(seed))}}
func(s *AAASystems) AddCell(c WorldCell){s.Cells[c.ID]=c};func(s *AAASystems) AddNPC(n *NPC){s.NPCs[n.ID]=n}
func(s *AAASystems) TickOnce(){s.Tick++;for _,n:=range s.NPCs{n.Food=max(0,n.Food-.005);n.Rest=max(0,n.Rest-.003);if n.Safety<.25{n.State="flee"}else if n.Food<.25{n.State="seek_food"}else if n.Rest<.2{n.State="sleep"}else{n.State="work"}}}
func(s *AAASystems) Market(good string,supply,demand float64)float64{p:=max(.01,(demand+1)/(supply+1));s.Prices[good]=p;return p}
func(s *AAASystems) ResolveAbility(base,defense int)int{r:=s.RNG.Intn(20)+1;if r+5<defense{return 0};if r==20{return base*2};return base}
func max(a,b float64)float64{if a>b{return a};return b}
