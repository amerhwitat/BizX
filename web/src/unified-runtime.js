export const MODULES = ['game','network','network_unified','launcher','internet_scanner','asset_browser','crypto','web','3d','game_assets','game_store','rendering','scripts'];

export class UnifiedBizXRuntime {
  health() { return { status:'ok', implementation:'web', modules:[...MODULES] }; }
  project({x,y,z}, width=800, height=600, cameraZ=5) {
    const dz=z-cameraZ; if (dz>=0) throw new Error('point is behind camera');
    const s=1/-dz; return {x:width/2+x*s*width/2,y:height/2-y*s*height/2,z:-dz};
  }
  async sha256(data) {
    const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    return crypto.subtle.digest('SHA-256', bytes);
  }
  cryptoIntent(provider,currency,amountMinor) {
    if(!provider || amountMinor < 0) throw new Error('invalid provider or amount');
    return `${provider}:${currency}:${amountMinor}:UNSIGNED`;
  }
}

export function createBizXApp() { return new UnifiedBizXRuntime(); }
