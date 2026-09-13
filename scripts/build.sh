#!/usr/bin/env bash
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-all}"
LOG_DIR="${ROOT}/build/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/build.log"
: > "$LOG"
FAILURES=0
run(){ echo "[build] $*" | tee -a "$LOG"; "$@" >>"$LOG" 2>&1 || { echo "[FAIL] $*" | tee -a "$LOG"; FAILURES=$((FAILURES+1)); }; }

if [[ "$MODE" != "no-install" ]]; then run "$ROOT/scripts/install-deps.sh"; fi
while IFS= read -r -d '' f; do
  d="$(dirname "$f")"
  case "$(basename "$f")" in
    package.json) echo "== Node/TypeScript: $d =="; (cd "$d"; if [[ -f package-lock.json || -f npm-shrinkwrap.json ]]; then npm ci; else npm install; fi; npm run build --if-present; npm test --if-present) || FAILURES=$((FAILURES+1)) ;;
    pyproject.toml) echo "== Python: $d =="; (cd "$d"; python3 -m pip install -e .; python3 -m pytest) || FAILURES=$((FAILURES+1)) ;;
    Cargo.toml) echo "== Rust: $d =="; (cd "$d"; cargo fetch; cargo build --workspace; cargo test --workspace) || FAILURES=$((FAILURES+1)) ;;
    go.mod) echo "== Go: $d =="; (cd "$d"; go mod download; go build ./...; go test ./...) || FAILURES=$((FAILURES+1)) ;;
    pom.xml) echo "== Java/Maven: $d =="; (cd "$d"; if [[ -x mvnw ]]; then ./mvnw -B test package; else mvn -B test package; fi) || FAILURES=$((FAILURES+1)) ;;
    build.gradle|build.gradle.kts) echo "== Kotlin/Gradle: $d =="; (cd "$d"; if [[ -x gradlew ]]; then ./gradlew build; else gradle build; fi) || FAILURES=$((FAILURES+1)) ;;
    CMakeLists.txt) echo "== C/C++: $d =="; (cd "$d"; if [[ -f CMakePresets.json ]] && cmake --list-presets >/dev/null 2>&1; then cmake --preset default || cmake -S . -B build; else cmake -S . -B build; fi; cmake --build build --parallel) || FAILURES=$((FAILURES+1)) ;;
    Package.swift) echo "== Swift: $d =="; (cd "$d"; swift build; swift test) || FAILURES=$((FAILURES+1)) ;;
    pubspec.yaml) echo "== Dart: $d =="; (cd "$d"; dart pub get; dart test) || FAILURES=$((FAILURES+1)) ;;
    composer.json) echo "== PHP: $d =="; (cd "$d"; composer install --no-interaction --prefer-dist; [[ ! -f phpunit.xml ]] || vendor/bin/phpunit) || FAILURES=$((FAILURES+1)) ;;
    Gemfile) echo "== Ruby: $d =="; (cd "$d"; bundle install; bundle exec rake) || FAILURES=$((FAILURES+1)) ;;
  esac
done < <(find "$ROOT" -type f \( -name package.json -o -name pyproject.toml -o -name Cargo.toml -o -name go.mod -o -name pom.xml -o -name build.gradle -o -name build.gradle.kts -o -name CMakeLists.txt -o -name Package.swift -o -name pubspec.yaml -o -name composer.json -o -name Gemfile \) -not -path '*/node_modules/*' -not -path '*/target/*' -not -path '*/build/*' -not -path '*/.git/*' -print0 | sort -z -u)
echo "Build orchestration complete; failures=$FAILURES; log=$LOG"
exit "$FAILURES"
