module BizX
  class ChessStrategy
    attr_reader :turn, :resources
    def initialize
      @turn = 0
      @resources = { 'gold' => 100, 'food' => 100, 'science' => 0 }
    end
    def tick(resource, amount)
      @resources[resource] = (@resources[resource] || 0) + amount
      @turn += 1
    end
    def uci(fen, command = 'go movetime 100')
      { protocol: 'UCI', fen: fen, command: command, adapter: 'external-engine' }
    end
  end
end
