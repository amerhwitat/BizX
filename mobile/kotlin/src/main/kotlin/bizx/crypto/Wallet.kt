package bizx.crypto

data class Wallet(val coin: String, val address: String, val watchOnly: Boolean = true) {
    companion object { val supportedCoins = setOf("BTC","BCH","LTC","DOGE","ETH","ETC","SOL","ADA","XRP","DOT","AVAX") }
    init { require(coin in supportedCoins) }
    fun transaction(to: String, amount: String) = mapOf("state" to "awaiting_confirmation", "coin" to coin, "from" to address, "to" to to, "amount" to amount)
}
