export type Coin = 'BTC'|'BCH'|'LTC'|'DOGE'|'ETH'|'ETC'|'SOL'|'ADA'|'XRP'|'DOT'|'AVAX';
export interface Transaction { state: 'awaiting_confirmation'; coin: Coin; from: string; to: string; amount: string; }
export class Wallet { constructor(public coin: Coin, public address: string, public watchOnly = true) {} transaction(to:string, amount:string):Transaction { return {state:'awaiting_confirmation',coin:this.coin,from:this.address,to,amount}; } }
export function endpoint(host:string,port:number,transport='HTTPS'){ return {host,port,transport}; }
