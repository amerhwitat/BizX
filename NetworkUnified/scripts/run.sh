#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
case "${NETWORK_API_IMPL:-python}" in
 python) exec python3 "$ROOT/python/app.py";;
 node) exec node "$ROOT/node/app.js";;
 typescript) command -v tsx >/dev/null && exec tsx "$ROOT/typescript/app.ts" || { command -v npx >/dev/null || exit 1; exec npx --yes tsx "$ROOT/typescript/app.ts"; };;
 go) exec go run "$ROOT/go/main.go";;
 rust) exec cargo run --manifest-path "$ROOT/rust/Cargo.toml";;
 java) javac "$ROOT/java/Main.java" -d "$ROOT/java/out"; exec java -cp "$ROOT/java/out" Main;;
 csharp) exec dotnet run --project "$ROOT/csharp";;
 cpp) c++ -std=c++17 "$ROOT/cpp/main.cpp" -o "$ROOT/cpp/network-api"; exec "$ROOT/cpp/network-api";;
 dart) exec dart run "$ROOT/dart/bin/main.dart";;
 kotlin) kotlinc "$ROOT/kotlin/Main.kt" -include-runtime -d "$ROOT/kotlin/network-api.jar"; exec java -jar "$ROOT/kotlin/network-api.jar";;
 swift) exec swift "$ROOT/swift/main.swift";;
 php) exec php "$ROOT/php/main.php";;
 ruby) exec ruby "$ROOT/ruby/main.rb";;
 *) echo "Unknown NETWORK_API_IMPL"; exit 2;; esac
