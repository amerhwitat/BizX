import { createUnifiedBizX } from './index.js';
import { startGame } from '../game/launcher.js';

export function launch(argv = process.argv.slice(2)) {
  const runtime = createUnifiedBizX();
  const mode = argv[0] ?? 'default';
  const game = startGame({ mode });
  return { ...runtime.health(), game, manifest: runtime.manifest() };
}

export function main(argv = process.argv.slice(2)) {
  const result = launch(argv);
  console.log(JSON.stringify(result, null, 2));
  return result;
}

if (import.meta.url === `file://${process.argv[1]}`) main();
