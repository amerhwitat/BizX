#!/usr/bin/env bash
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-all}"
LOG_DIR="$ROOT/build/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/build.log"
: > "$LOG"
FAILURES=0
HOST="$(uname -s)"
is_windows_host() { [[ "$HOST" == MINGW* || "$HOST" == MSYS* || "$HOST" == CYGWIN* || "${OS:-}" == Windows_NT ]]; }
if [[ "$MODE" != "no-install" ]]; then
  bash "$ROOT/scripts/install-deps.sh" || FAILURES=$((FAILURES+1))
fi
while IFS= read -r -d '' f; do
  d="$(dirname "$f")"
  case "$(basename "$f")" in
    package.json)
      echo "== Node/TypeScript: $d =="
      (cd "$d"; if [[ -f package-lock.json || -f npm-shrinkwrap.json ]]; then npm ci; else npm install; fi; npm run build --if-present; npm test --if-present) || FAILURES=$((FAILURES+1)) ;;
    pyproject.toml|requirements.txt)
      echo "== Python: $d =="
      (cd "$d"; [[ ! -f pyproject.toml ]] || python3 -m pip install -e .; [[ ! -f requirements.txt ]] || python3 -m pip install -r requirements.txt; if [[ -d tests ]]; then python3 -m pytest; fi) || FAILURES=$((FAILURES+1)) ;;
    Cargo.toml)
      if command -v cargo >/dev/null 2>&1; then echo "== Rust: $d =="; (cd "$d"; cargo fetch; cargo build --workspace; cargo test --workspace) || FAILURES=$((FAILURES+1)); else echo "[skip] Cargo toolchain unavailable: $d"; fi ;;
    go.mod)
      if command -v go >/dev/null 2>&1; then echo "== Go: $d =="; (cd "$d"; go mod download; go build ./...; go test ./...) || FAILURES=$((FAILURES+1)); else echo "[skip] Go toolchain unavailable: $d"; fi ;;
    pom.xml)
      echo "== Java/Maven: $d =="
      (cd "$d"; if [[ -x mvnw ]]; then ./mvnw -B test package; else mvn -B test package; fi) || FAILURES=$((FAILURES+1)) ;;
    build.gradle|build.gradle.kts)
      echo "== JVM/Gradle: $d =="
      (cd "$d"; if [[ -x gradlew ]]; then ./gradlew build; else gradle build; fi) || FAILURES=$((FAILURES+1)) ;;
    CMakeLists.txt)
      echo "== C/C++: $d =="
      (cd "$d"; cmake -S . -B build; cmake --build build --parallel) || FAILURES=$((FAILURES+1)) ;;
    Package.swift)
      if command -v swift >/dev/null 2>&1; then echo "== Swift: $d =="; (cd "$d"; swift build; swift test) || FAILURES=$((FAILURES+1)); else echo "[skip] Swift toolchain unavailable: $d"; fi ;;
    pubspec.yaml)
      if command -v dart >/dev/null 2>&1; then echo "== Dart: $d =="; (cd "$d"; dart pub get; if [[ -d test ]]; then dart test; fi) || FAILURES=$((FAILURES+1)); else echo "[skip] Dart SDK unavailable; Dart tests not run: $d"; fi ;;
    composer.json)
      if command -v composer >/dev/null 2>&1; then echo "== PHP: $d =="; (cd "$d"; composer install --no-interaction --prefer-dist; if [[ -f phpunit.xml ]]; then vendor/bin/phpunit; fi) || FAILURES=$((FAILURES+1)); else echo "[skip] Composer unavailable: $d"; fi ;;
    Gemfile)
      if command -v bundle >/dev/null 2>&1; then echo "== Ruby: $d =="; (cd "$d"; bundle install; bundle exec rake) || FAILURES=$((FAILURES+1)); else echo "[skip] Bundler unavailable: $d"; fi ;;
    *.csproj|*.sln)
      if ! is_windows_host && { [[ "$d" == *"/desktop/dotnet"* || "$d" == *"/desktop/vcpp"* ]]; }; then
        echo "[skip] Windows-only desktop project on $HOST: $d"
      elif [[ "$d" == *"/desktop/vcpp"* ]]; then
        if command -v msbuild >/dev/null 2>&1; then (cd "$d"; msbuild "$(basename "$f")" /m) || FAILURES=$((FAILURES+1)); else echo "[skip] Visual Studio MSBuild unavailable: $d"; fi
      else
        echo "== C#/.NET: $d =="
        (cd "$d"; dotnet restore; dotnet build --no-restore; if [[ -d tests ]]; then dotnet test --no-build; fi) || FAILURES=$((FAILURES+1))
      fi ;;
  esac
done < <(find "$ROOT" -type f \( -name package.json -o -name pyproject.toml -o -name requirements.txt -o -name Cargo.toml -o -name go.mod -o -name pom.xml -o -name build.gradle -o -name build.gradle.kts -o -name CMakeLists.txt -o -name Package.swift -o -name pubspec.yaml -o -name composer.json -o -name Gemfile -o -name '*.csproj' -o -name '*.sln' \) -not -path '*/node_modules/*' -not -path '*/target/*' -not -path '*/build/*' -not -path '*/.git/*' -print0 | sort -z -u)
echo "Build orchestration complete; failures=$FAILURES; log=$LOG" | tee -a "$LOG"
exit "$FAILURES"
