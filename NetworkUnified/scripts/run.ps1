param([string]$Implementation=$env:NETWORK_API_IMPL)
$root=Split-Path $PSScriptRoot -Parent
if([string]::IsNullOrWhiteSpace($Implementation)){$Implementation='python'}
switch($Implementation){
 'python'{python "$root/python/app.py"}
 'node'{node "$root/node/app.js"}
 'typescript'{npx --yes tsx "$root/typescript/app.ts"}
 'go'{go run "$root/go/main.go"}
 'rust'{cargo run --manifest-path "$root/rust/Cargo.toml"}
 'java'{New-Item -ItemType Directory -Force "$root/java/out"|Out-Null;javac "$root/java/Main.java" -d "$root/java/out";java -cp "$root/java/out" Main}
 'csharp'{dotnet run --project "$root/csharp"}
 'cpp'{c++ -std=c++17 "$root/cpp/main.cpp" -o "$root/cpp/network-api.exe";& "$root/cpp/network-api.exe"}
 'dart'{dart run "$root/dart/bin/main.dart"}
 'kotlin'{kotlinc "$root/kotlin/Main.kt" -include-runtime -d "$root/kotlin/network-api.jar";java -jar "$root/kotlin/network-api.jar"}
 'swift'{swift "$root/swift/main.swift"}
 'php'{php "$root/php/main.php"}
 'ruby'{ruby "$root/ruby/main.rb"}
 default{throw "Unknown NETWORK_API_IMPL: $Implementation"}
}
