package ai.bizx.crypto;

public record Wallet(String coin, String address, boolean watchOnly) {
    public static final String[] COINS = {"BTC","BCH","LTC","DOGE","ETH","ETC","SOL","ADA","XRP","DOT","AVAX"};
    public Wallet { if (!java.util.List.of(COINS).contains(coin)) throw new IllegalArgumentException("unsupported coin"); }
    public java.util.Map<String,String> transaction(String to, String amount) { return java.util.Map.of("state","awaiting_confirmation","coin",coin,"from",address,"to",to,"amount",amount); }
}
