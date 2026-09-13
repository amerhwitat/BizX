namespace BizX.Crypto;
public sealed record Wallet(string Coin, string Address, bool WatchOnly = true) {
    public static readonly string[] SupportedCoins = ["BTC","BCH","LTC","DOGE","ETH","ETC","SOL","ADA","XRP","DOT","AVAX"];
    public object Transaction(string to, string amount) => new { State="awaiting_confirmation", Coin, From=Address, To=to, Amount=amount };
}
