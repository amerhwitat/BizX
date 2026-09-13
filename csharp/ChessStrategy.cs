namespace BizX.Games;

public sealed class ChessStrategy {
    public long Turn { get; private set; }
    public Dictionary<string,long> Resources { get; } = new() {{"gold",100},{"food",100},{"science",0}};
    public long Tick(string resource, long amount) { Resources[resource] = Resources.GetValueOrDefault(resource) + amount; return ++Turn; }
    public object Uci(string fen, string command = "go movetime 100") => new { Protocol="UCI", Fen=fen, Command=command, Adapter="external-engine" };
}
