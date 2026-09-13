export const PRODUCTS = Object.freeze({
  starter_pack: { type: 'consumable', price: 0.99 },
  builder_pack: { type: 'consumable', price: 4.99 },
  tycoon_premium: { type: 'non_consumable', price: 9.99 },
  vip_monthly: { type: 'subscription', price: 4.99, period: 'month' }
});
export const AD_PLACEMENTS = Object.freeze(['banner_home', 'interstitial_round_end', 'rewarded_double_income', 'rewarded_bonus_cash']);
export const PAYMENT_ROUTING = Object.freeze({
  ethereum: Object.freeze({ asset: 'ETH', recipient: '0x0B4fF3fc6AE19fAF9A0d2628a646ABD9636B1162' }),
  paypal: Object.freeze({ account: 'amer.hwaitat@gmail.com' }),
  defaultMethod: 'ethereum',
  fallbackMethod: 'paypal',
  requiresExplicitUserSelection: true
});
export class MonetizationEngine {
  constructor({ testMode = true } = {}) { this.testMode = testMode; this.events = []; this.entitlements = new Set(); }
  purchase(productId, provider = 'store') {
    const product = PRODUCTS[productId];
    if (!product) return { ok: false, reason: 'unknown-product' };
    this.events.push({ type: 'purchase', productId, provider, amount: product.price, testMode: this.testMode });
    if (product.type !== 'consumable') this.entitlements.add(productId);
    return {
      ok: true,
      productId,
      provider,
      amount: product.price,
      status: 'verification-required',
      paymentMethods: {
        ethereum: { ...PAYMENT_ROUTING.ethereum },
        paypal: { ...PAYMENT_ROUTING.paypal }
      },
      defaultPaymentMethod: PAYMENT_ROUTING.defaultMethod,
      fallbackPaymentMethod: PAYMENT_ROUTING.fallbackMethod,
      requiresExplicitUserSelection: PAYMENT_ROUTING.requiresExplicitUserSelection
    };
  }
  recordAdImpression(placement, provider) {
    if (!AD_PLACEMENTS.includes(placement)) return { ok: false, reason: 'unknown-placement' };
    this.events.push({ type: 'ad_impression', placement, provider, testMode: this.testMode });
    return { ok: true, placement, provider };
  }
  grantRewardedAd(placement, reward) {
    if (!placement.startsWith('rewarded_')) return { ok: false, reason: 'not-rewarded-placement' };
    this.events.push({ type: 'rewarded_ad', placement, reward, testMode: this.testMode });
    return { ok: true, reward };
  }
  snapshot() { return { testMode: this.testMode, entitlements: [...this.entitlements], events: [...this.events] }; }
}
