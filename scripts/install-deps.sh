#!/usr/bin/env bash
set -Eeuo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PIP_DISABLE_PIP_VERSION_CHECK=1

echo "[deps] Scanning native project manifests..."
command -v node >/dev/null 2>&1 || echo "[deps] Node.js missing"
command -v python3 >/dev/null 2>&1 || echo "[deps] Python 3 missing"
command -v cargo >/dev/null 2>&1 || echo "[deps] Rust/Cargo missing"
command -v go >/dev/null 2>&1 || echo "[deps] Go missing"
command -v java >/dev/null 2>&1 || echo "[deps] Java missing"
command -v dotnet >/dev/null 2>&1 || echo "[deps] .NET missing"
command -v cmake >/dev/null 2>&1 || echo "[deps] CMake missing"

while IFS= read -r -d '' f; do d="$(dirname "$f")"; echo "[deps] npm: $d"; (cd "$d"; if [[ -f package-lock.json || -f npm-shrinkwrap.json ]]; then npm ci; else npm install; fi); done < <(find "$ROOT" -type f -name package.json -not -path '*/node_modules/*' -print0)
while IFS= read -r -d '' f; do d="$(dirname "$f")"; echo "[deps] Python: $d"; (cd "$d"; [[ -f requirements.txt ]] && python3 -m pip install -r requirements.txt || true; [[ -f pyproject.toml ]] && python3 -m pip install -e . || true); done < <(find "$ROOT" -type f \( -name requirements.txt -o -name pyproject.toml \) -not -path '*/.venv/*' -print0)
while IFS= read -r -d '' f; do d="$(dirname "$f")"; echo "[deps] Cargo: $d"; (cd "$d"; cargo fetch); done < <(find "$ROOT" -type f -name Cargo.toml -not -path '*/target/*' -print0)
while IFS= read -r -d '' f; do d="$(dirname "$f")"; echo "[deps] Go: $d"; (cd "$d"; go mod download); done < <(find "$ROOT" -type f -name go.mod -not -path '*/vendor/*' -print0)
while IFS= read -r -d '' f; do d="$(dirname "$f")"; echo "[deps] Maven: $d"; (cd "$d"; [[ -x mvnw ]] && ./mvnw -B dependency:go-offline || mvn -B dependency:go-offline); done < <(find "$ROOT" -type f -name pom.xml -not -path '*/target/*' -print0)
while IFS= read -r -d '' f; do d="$(dirname "$f")"; echo "[deps] .NET: $d"; (cd "$d"; dotnet restore); done < <(find "$ROOT" -type f \( -name '*.csproj' -o -name '*.sln' \) -not -path '*/bin/*' -not -path '*/obj/*' -print0)
echo "[deps] Dependency bootstrap complete. Missing toolchains are reported above; no system package manager is invoked automatically."
