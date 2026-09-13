import { createHash } from 'node:crypto';
import { request } from 'node:https';

export const FEATURE_FAMILIES = Object.freeze([
  'game', 'NetworkUnified', 'UnifiedGame/launcher/python', 'InternetScanner',
  'AssetBrowser', 'crypto', 'web', '3D', 'game-assets', 'game-store',
  'network', 'rendering', 'scripts'
]);

export class Vector3 {
  constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
}

export class PerspectiveCamera {
  constructor({ fov = 60, near = 0.1, far = 1000 } = {}) { this.fov = fov; this.near = near; this.far = far; }
  project(point, width = 1280, height = 720) {
    const z = Math.max(this.near, point.z);
    const scale = 1 / Math.tan((this.fov * Math.PI) / 360);
    return { x: width / 2 + point.x * scale / z * width / 2, y: height / 2 - point.y * scale / z * height / 2, z };
  }
}

export class AssetCatalog {
  constructor(entries = []) { this.entries = new Map(entries.map((e) => [e.id, e])); }
  add(entry) { if (!entry?.id) throw new Error('asset id required'); this.entries.set(entry.id, entry); return entry; }
  get(id) { return this.entries.get(id); }
  list() { return [...this.entries.values()]; }
}

export class GameStore {
  constructor(products = []) { this.products = new Map(products.map((p) => [p.id, p])); }
  list() { return [...this.products.values()]; }
  get(id) { return this.products.get(id); }
}

export class NetworkUnified {
  constructor({ allowHosts = [] } = {}) { this.allowHosts = new Set(allowHosts); }
  classifyHost(hostname) {
    const privateHost = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(hostname);
    return privateHost ? 'private_or_local' : 'public_or_unclassified';
  }
  isAllowed(hostname) { return this.allowHosts.size === 0 || this.allowHosts.has(hostname); }
}

export class InternetScanner {
  constructor(network = new NetworkUnified()) { this.network = network; }
  inspectTarget(hostname) { return { hostname, classification: this.network.classifyHost(hostname), authorized: this.network.isAllowed(hostname) }; }
}

export class AssetBrowser {
  async fetchMetadata(url, { timeoutMs = 5000 } = {}) {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') throw new Error('AssetBrowser requires HTTPS');
    return new Promise((resolve, reject) => {
      const req = request(parsed, { method: 'HEAD', timeout: timeoutMs }, (res) => resolve({ url, statusCode: res.statusCode, contentType: res.headers['content-type'] ?? null }));
      req.on('timeout', () => req.destroy(new Error('request timeout')));
      req.on('error', reject); req.end();
    });
  }
}

export class CryptoService {
  hash(data, algorithm = 'sha256') { return createHash(algorithm).update(String(data)).digest('hex'); }
  createTransactionIntent({ chain, asset, to, amount, mode = 'testnet' }) {
    if (!chain || !asset || !to || amount == null) throw new Error('chain, asset, to and amount are required');
    return Object.freeze({ chain, asset, to, amount: String(amount), mode, signed: false });
  }
}

export class WebService {
  routes() { return ['/', '/health', '/api/game', '/api/assets', '/api/store', '/api/network', '/api/crypto']; }
}

export class RenderingService {
  capabilities() { return { renderer: 'node-reference', sceneGraph: true, perspective3D: true, gpu: false }; }
}

export class ScriptService {
  commands() { return ['start', 'test', 'lint', 'manifest', 'health']; }
}

export class UnifiedBizXRuntime {
  constructor(options = {}) {
    this.features = FEATURE_FAMILIES;
    this.network = new NetworkUnified(options.network);
    this.scanner = new InternetScanner(this.network);
    this.assets = new AssetCatalog(options.assets);
    this.assetBrowser = new AssetBrowser();
    this.store = new GameStore(options.products);
    this.crypto = new CryptoService();
    this.web = new WebService();
    this.rendering = new RenderingService();
    this.scripts = new ScriptService();
    this.camera = new PerspectiveCamera(options.camera);
  }
  manifest() { return { runtime: 'nodejs/javascript', features: this.features, modules: Object.fromEntries(this.features.map((f) => [f, 'integrated'])) }; }
  health() { return { status: 'ok', runtime: 'nodejs/javascript', featureCount: this.features.length, features: this.features }; }
}

export function createUnifiedBizX(options = {}) { return new UnifiedBizXRuntime(options); }
