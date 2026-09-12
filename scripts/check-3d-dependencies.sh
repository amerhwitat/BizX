#!/usr/bin/env bash
set -u
command -v git >/dev/null && echo 'OK git' || echo 'WARN missing git'
command -v cmake >/dev/null && echo 'OK cmake' || echo 'WARN missing cmake'
if [[ -n "${UNREAL_ENGINE_ROOT:-}" ]]; then echo "UE5 root: $UNREAL_ENGINE_ROOT"; else echo 'UE5: set UNREAL_ENGINE_ROOT before plugin builds'; fi
if [[ -n "${UNITY_EDITOR_PATH:-}" ]]; then echo "Unity editor: $UNITY_EDITOR_PATH"; else echo 'Unity: set UNITY_EDITOR_PATH before automated builds'; fi
echo 'Engine binaries are not installed automatically.'
