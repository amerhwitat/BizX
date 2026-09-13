module BizX
  class CryptoWallet
    COINS = %w[BTC BCH LTC DOGE ETH ETC SOL ADA XRP DOT AVAX].freeze
    attr_reader :coin, :address, :watch_only
    def initialize(coin, address, watch_only: true)
      raise ArgumentError, 'unsupported coin' unless COINS.include?(coin)
      @coin, @address, @watch_only = coin, address, watch_only
    end
    def transaction(to, amount)
      { state: 'awaiting_confirmation', coin: @coin, from: @address, to: to, amount: amount }
    end
  end
end
