package chessstrategy

type ChessStrategy struct { Turn uint64; Resources map[string]int64 }
func New() *ChessStrategy { return &ChessStrategy{Resources: map[string]int64{"gold":100,"food":100,"science":0}} }
func (s *ChessStrategy) Tick(resource string, amount int64) uint64 { s.Resources[resource] += amount; s.Turn++; return s.Turn }
type UCIRequest struct { Protocol string `json:"protocol"`; FEN string `json:"fen"`; Command string `json:"command"` }
func (s *ChessStrategy) UCI(fen, command string) UCIRequest { if command=="" { command="go movetime 100" }; return UCIRequest{"UCI",fen,command} }
