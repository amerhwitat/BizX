$ErrorActionPreference = 'Stop'
Write-Host 'BizX 3D dependency check'
$tools = @('git','cmake')
foreach ($tool in $tools) {
  if (Get-Command $tool -ErrorAction SilentlyContinue) { Write-Host "OK  $tool" }
  else { Write-Warning "Missing optional/build tool: $tool" }
}
if ($env:UNREAL_ENGINE_ROOT) { Write-Host "UNREAL_ENGINE_ROOT=$env:UNREAL_ENGINE_ROOT" } else { Write-Host 'UE5: set UNREAL_ENGINE_ROOT when building the plugin.' }
if ($env:UNITY_EDITOR_PATH) { Write-Host "UNITY_EDITOR_PATH=$env:UNITY_EDITOR_PATH" } else { Write-Host 'Unity: set UNITY_EDITOR_PATH when batch-building Unity projects.' }
Write-Host 'No proprietary engine binaries are downloaded automatically.'
