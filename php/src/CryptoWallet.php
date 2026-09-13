<?php
namespace BizX;
final class CryptoWallet {
    public const COINS = ['BTC','BCH','LTC','DOGE','ETH','ETC','SOL','ADA','XRP','DOT','AVAX'];
    public function __construct(public string $coin, public string $address, public bool $watchOnly = true) { if (!in_array($coin,self::COINS,true)) throw new \InvalidArgumentException('unsupported coin'); }
    public function transaction(string $to,string $amount): array { return ['state'=>'awaiting_confirmation','coin'=>$this->coin,'from'=>$this->address,'to'=>$to,'amount'=>$amount]; }
}
