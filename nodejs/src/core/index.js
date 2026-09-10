export class BizXCore {
  constructor(options = {}) {
    this.name = options.name ?? 'BizX';
    this.version = options.version ?? '1.0.0';
  }

  health() {
    return { name: this.name, version: this.version, status: 'ok', runtime: 'node' };
  }
}
