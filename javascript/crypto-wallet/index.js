export const COINS = ['BTC','BCH','LTC','DOGE','ETH','ETC','SOL','ADA','XRP','DOT','AVAX'];
export class Wallet { constructor(coin,address,watchOnly=true){ if(!COINS.includes(coin)) throw new Error('unsupported coin'); Object.assign(this,{coin,address,watchOnly}); } transaction(to,amount){ return {state:'awaiting_confirmation',coin:this.coin,from:this.address,to,amount}; } }
export const endpoint=(host,port,transport='HTTPS')=>({host,port,transport});
