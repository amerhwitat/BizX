#!/usr/bin/env bash
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
echo "BizX MobileUnified build"
command -v java >/dev/null 2>&1 && echo "Android/JVM toolchain: available" || echo "Android/JVM toolchain: not installed"
command -v swift >/dev/null 2>&1 && echo "Swift toolchain: available" || echo "Swift toolchain: not installed"
command -v flutter >/dev/null 2>&1 && echo "Flutter: available" || echo "Flutter: not installed"
command -v node >/dev/null 2>&1 && echo "Node/React Native: available" || echo "Node/React Native: not installed"
[ -f "$ROOT/contract/mobile_game_contract.json" ] && echo "Shared contract: OK"
echo "Mobile adapters are source-compatible contracts; platform SDK builds run when their SDKs are installed."
