#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cmake -S "$ROOT" -B "$ROOT/build/native" -DCMAKE_BUILD_TYPE=Release
cmake --build "$ROOT/build/native" --config Release
if command -v npm >/dev/null 2>&1 && [[ -f "$ROOT/web/package.json" ]]; then
  (cd "$ROOT/web" && npm install && npm run build)
fi
echo 'Dimensional Studio build completed.'
