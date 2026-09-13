package cryptowallet

type Wallet struct { Coin, Address string; WatchOnly bool }
var SupportedCoins = []string{"BTC","BCH","LTC","DOGE","ETH","ETC","SOL","ADA","XRP","DOT","AVAX"}
type Transaction struct { State, Coin, From, To, Amount string }
func (w Wallet) Transaction(to, amount string) Transaction { return Transaction{"awaiting_confirmation",w.Coin,w.Address,to,amount} }
