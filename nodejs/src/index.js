import { BizXCore } from './core/index.js';
export { BizXCore } from './core/index.js';
export { WalletProvider, createWalletProvider } from './wallet/index.js';

export function createBizX(options = {}) {
  return new BizXCore(options);
}
