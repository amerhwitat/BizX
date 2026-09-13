class BizXChessStrategy {
  int turn = 0;
  final Map<String, int> resources = {'gold': 100, 'food': 100, 'science': 0};
  int tick(String resource, int amount) { resources[resource] = (resources[resource] ?? 0) + amount; return ++turn; }
  Map<String, String> uci(String fen, {String command = 'go movetime 100'}) => {'protocol': 'UCI', 'fen': fen, 'command': command, 'adapter': 'external-engine'};
}
