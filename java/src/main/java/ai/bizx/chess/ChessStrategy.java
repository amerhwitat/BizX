package ai.bizx.chess;

import java.util.HashMap;
import java.util.Map;

public final class ChessStrategy {
    private long turn;
    private final Map<String, Long> resources = new HashMap<>(Map.of("gold",100L,"food",100L,"science",0L));
    public long strategyTick(String resource, long amount) { resources.merge(resource, amount, Long::sum); return ++turn; }
    public Map<String,Object> uci(String fen, String command) {
        return Map.of("protocol","UCI","fen",fen,"command",command == null ? "go movetime 100" : command,"adapter","external-engine");
    }
    public long turn() { return turn; }
    public Map<String,Long> resources() { return Map.copyOf(resources); }
}
