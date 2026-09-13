import { main } from './unified';

const session = main();
const root = document.querySelector<HTMLElement>('#bizx-app');
if (root) {
  root.textContent = `BizX Web — ${session.status} — ${session.mode}`;
}
