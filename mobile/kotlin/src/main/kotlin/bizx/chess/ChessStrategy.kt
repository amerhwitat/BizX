package bizx.chess

data class StrategyState(var turn: Long = 0, val resources: MutableMap<String, Long> = mutableMapOf("gold" to 100, "food" to 100, "science" to 0))

class ChessStrategy {
    val state = StrategyState()
    fun tick(resource: String, amount: Long) = state.resources.merge(resource, amount, Long::plus).let { ++state.turn }
    fun uci(fen: String, command: String = "go movetime 100") = mapOf("protocol" to "UCI", "fen" to fen, "command" to command, "adapter" to "external-engine")
}
