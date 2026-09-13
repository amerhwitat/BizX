export type GameSession = { mode: string; status: 'started'; runtime: 'web' };

/** Browser-safe feature parity facade. It never exposes privileged native socket scanning. */
export class UnifiedBizXRuntime {
  readonly features = [
    'game', 'NetworkUnified', 'launcher', 'InternetScanner', 'AssetBrowser',
    'crypto', 'web', '3D', 'game-assets', 'game-store', 'network', 'rendering', 'scripts'
  ] as const;

  startGame(mode = 'default'): GameSession {
    return { mode: mode || 'default', status: 'started', runtime: 'web' };
  }

  async sha256(value: string): Promise<string> {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

export function main(): GameSession {
  const runtime = new UnifiedBizXRuntime();
  const session = runtime.startGame();
  console.info(`BizX Web game starting (${session.mode})`);
  return session;
}
