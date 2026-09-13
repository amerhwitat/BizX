from dataclasses import dataclass
from enum import Enum

class Coin(str, Enum):
    BTC='BTC'; BCH='BCH'; LTC='LTC'; DOGE='DOGE'; ETH='ETH'; ETC='ETC'; SOL='SOL'; ADA='ADA'; XRP='XRP'; DOT='DOT'; AVAX='AVAX'

@dataclass(frozen=True)
class Endpoint:
    host: str
    port: int
    transport: str = 'HTTPS'

@dataclass
class Wallet:
    coin: Coin
    address: str
    watch_only: bool = True

    def transaction(self, to: str, amount: str) -> dict:
        return {'state':'awaiting_confirmation','coin':self.coin.value,'from':self.address,'to':to,'amount':amount}

class Network:
    @staticmethod
    def endpoint(host: str, port: int, transport: str='HTTPS') -> Endpoint:
        if transport not in {'TCP','UDP','HTTP','HTTPS','WebSocket'}: raise ValueError('unsupported transport')
        return Endpoint(host, port, transport)
