export const COINS = Object.freeze(['BTC','BCH','LTC','DOGE','ETH','ETC','SOL','ADA','XRP','DOT','AVAX']);
export class Wallet {
  constructor(coin, address, watchOnly = true) { if (!COINS.includes(coin)) throw new Error('unsupported coin'); this.coin=coin; this.address=address; this.watchOnly=watchOnly; }
  transaction(to, amount) { return { state:'awaiting_confirmation', coin:this.coin, from:this.address, to, amount }; }
}
export function endpoint(host, port, transport='HTTPS') { if (!['TCP','UDP','HTTP','HTTPS','WebSocket'].includes(transport)) throw new Error('unsupported transport'); return {host,port,transport}; }
