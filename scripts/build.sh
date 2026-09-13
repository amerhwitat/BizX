#!/usr/bin/env bash
set -Eeuo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-all}"
LOG_DIR="${ROOT}/build/logs"
mkdir -p "$LOG_DIR"
exec > >(tee -a "$LOG_DIR/build.log") 2>&1

run(){ echo "[build] $*"; "$@"; }

build_node(){ local d="$1"; [[ -f "$d/package.json" ]] || return 0; echo "== Node: $d =="; (cd "$d"; [[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || npm install; npm run build --if-present; npm test --if-present); }
build_python(){ local d="$1"; [[ -f "$d/pyproject.toml" || -f "$d/requirements.txt" || -f "$d/setup.py" ]] || return 0; echo "== Python: $d =="; (cd "$d"; python -m pip install --upgrade pip; if [[ -f pyproject.toml ]]; then python -m pip install -e .; fi; [[ -f requirements.txt ]] && python -m pip install -r requirements.txt; [[ -f pyproject.toml ]] && python -m pytest || true); }
build_rust(){ local d="$1"; [[ -f "$d/Cargo.toml" ]] || return 0; echo "== Rust: $d =="; (cd "$d"; cargo fetch; cargo build --workspace; cargo test --workspace); }
build_go(){ local d="$1"; [[ -f "$d/go.mod" ]] || return 0; echo "== Go: $d =="; (cd "$d"; go mod download; go build ./...; go test ./...); }
build_java(){ local d="$1"; echo "== JVM: $d =="; if [[ -f "$d/mvnw" ]]; then (cd "$d"; ./mvnw -B test package); elif [[ -f "$d/pom.xml" ]]; then (cd "$d"; mvn -B test package); elif [[ -f "$d/gradlew" ]]; then (cd "$d"; ./gradlew build); elif [[ -f "$d/build.gradle" || -f "$d/build.gradle.kts" ]]; then (cd "$d"; gradle build); fi; }
build_dotnet(){ local d="$1"; [[ -f "$d/*.sln" || -f "$d/*.csproj" ]] 2>/dev/null || return 0; echo "== .NET: $d =="; (cd "$d"; dotnet restore; dotnet build --no-restore; dotnet test --no-build || true); }
build_cmake(){ local d="$1"; [[ -f "$d/CMakeLists.txt" ]] || return 0; echo "== C/C++: $d =="; (cd "$d"; if [[ -f CMakePresets.json ]]; then cmake --preset default 2>/dev/null || cmake -S . -B build; else cmake -S . -B build; fi; cmake --build build --parallel); }

if [[ "$MODE" != "no-install" ]]; then "$ROOT/scripts/install-deps.sh"; fi
mapfile -t dirs < <(find "$ROOT" -type f \( -name package.json -o -name pyproject.toml -o -name Cargo.toml -o -name go.mod -o -name pom.xml -o -name build.gradle -o -name build.gradle.kts -o -name CMakeLists.txt \) -not -path '*/node_modules/*' -not -path '*/build/*' -not -path '*/.git/*' -printf '%h\n' | sort -u)
for d in "${dirs[@]}"; do
  [[ -f "$d/package.json" ]] && build_node "$d"
  [[ -f "$d/pyproject.toml" || -f "$d/requirements.txt" || -f "$d/setup.py" ]] && build_python "$d"
  [[ -f "$d/Cargo.toml" ]] && build_rust "$d"
  [[ -f "$d/go.mod" ]] && build_go "$d"
  [[ -f "$d/pom.xml" || -f "$d/build.gradle" || -f "$d/build.gradle.kts" || -f "$d/gradlew" ]] && build_java "$d"
  [[ -f "$d/CMakeLists.txt" ]] && build_cmake "$d"
done
echo "Build orchestration complete. Logs: $LOG_DIR/build.log"
