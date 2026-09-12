$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$Build = Join-Path $Root 'build/native'
New-Item -ItemType Directory -Force $Build | Out-Null
cmake -S $Root -B $Build -DCMAKE_BUILD_TYPE=Release
cmake --build $Build --config Release
if (Test-Path (Join-Path $Root 'web/package.json')) {
  Push-Location (Join-Path $Root 'web')
  if (Get-Command npm -ErrorAction SilentlyContinue) { npm install; npm run build }
  Pop-Location
}
Write-Host 'Dimensional Studio build completed.'
