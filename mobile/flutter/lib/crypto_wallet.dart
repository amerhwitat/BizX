class BizXWallet {
  static const supportedCoins = ['BTC','BCH','LTC','DOGE','ETH','ETC','SOL','ADA','XRP','DOT','AVAX'];
  final String coin, address; final bool watchOnly;
  BizXWallet(this.coin, this.address, {this.watchOnly = true}) : assert(supportedCoins.contains(coin));
  Map<String,String> transaction(String to, String amount) => {'state':'awaiting_confirmation','coin':coin,'from':address,'to':to,'amount':amount};
}
