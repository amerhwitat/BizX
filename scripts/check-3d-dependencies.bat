@echo off
setlocal
where git >nul 2>&1 && echo OK git || echo WARN missing git
where cmake >nul 2>&1 && echo OK cmake || echo WARN missing cmake
if defined UNREAL_ENGINE_ROOT (echo UE5 root: %UNREAL_ENGINE_ROOT%) else echo UE5: set UNREAL_ENGINE_ROOT before plugin builds
if defined UNITY_EDITOR_PATH (echo Unity editor: %UNITY_EDITOR_PATH%) else echo Unity: set UNITY_EDITOR_PATH before automated builds
endlocal
