[CmdletBinding()]
param([ValidateSet('all','no-install','clean')][string]$Mode='all')
$ErrorActionPreference='Stop'
$Root = Split-Path -Parent $PSScriptRoot
$LogDir = Join-Path $Root 'build\logs'
New-Item -ItemType Directory -Force $LogDir | Out-Null
$Log = Join-Path $LogDir 'build-powershell.log'
function Invoke-Step([string]$Name,[string]$Command,[string[]]$Arguments=@(),[string]$WorkingDirectory=$Root){
  Write-Host "== $Name =="
  Push-Location $WorkingDirectory
  try { & $Command @Arguments; if ($LASTEXITCODE -ne 0) { throw "$Name failed with exit code $LASTEXITCODE" } } finally { Pop-Location }
}
if($Mode -ne 'no-install'){ & (Join-Path $PSScriptRoot 'install-deps.ps1') }
$files = Get-ChildItem -Path $Root -Recurse -File | Where-Object { $_.FullName -notmatch '\\(\.git|node_modules|target|build|bin|obj|\.venv)\\' }
$dirs = $files | Where-Object { $_.Name -in @('package.json','pyproject.toml','Cargo.toml','go.mod','pom.xml','build.gradle','build.gradle.kts','CMakeLists.txt') } | Select-Object -ExpandProperty DirectoryName -Unique
foreach($d in $dirs){
  if(Test-Path (Join-Path $d 'package.json')) { if(Test-Path (Join-Path $d 'package-lock.json')){Invoke-Step 'npm ci' 'npm' @('ci') $d}else{Invoke-Step 'npm install' 'npm' @('install') $d}; Invoke-Step 'npm build' 'npm' @('run','build','--if-present') $d; Invoke-Step 'npm test' 'npm' @('test','--if-present') $d }
  if(Test-Path (Join-Path $d 'pyproject.toml')) { Invoke-Step 'pip install' 'python' @('-m','pip','install','-e','.') $d; if(Get-Command pytest -ErrorAction SilentlyContinue){ Invoke-Step 'pytest' 'python' @('-m','pytest') $d } }
  if(Test-Path (Join-Path $d 'requirements.txt')) { Invoke-Step 'pip requirements' 'python' @('-m','pip','install','-r','requirements.txt') $d }
  if(Test-Path (Join-Path $d 'Cargo.toml')) { Invoke-Step 'cargo fetch' 'cargo' @('fetch') $d; Invoke-Step 'cargo build' 'cargo' @('build','--workspace') $d; Invoke-Step 'cargo test' 'cargo' @('test','--workspace') $d }
  if(Test-Path (Join-Path $d 'go.mod')) { Invoke-Step 'go mod download' 'go' @('mod','download') $d; Invoke-Step 'go build' 'go' @('build','./...') $d; Invoke-Step 'go test' 'go' @('test','./...') $d }
  if(Test-Path (Join-Path $d 'pom.xml')) { $mvn = if(Test-Path (Join-Path $d 'mvnw.cmd')){Join-Path $d 'mvnw.cmd'}else{'mvn'}; Invoke-Step 'Maven package' $mvn @('-B','test','package') $d }
  if((Test-Path (Join-Path $d 'build.gradle')) -or (Test-Path (Join-Path $d 'build.gradle.kts'))) { $g = if(Test-Path (Join-Path $d 'gradlew.bat')){Join-Path $d 'gradlew.bat'}else{'gradle'}; Invoke-Step 'Gradle build' $g @('build') $d }
  if(Test-Path (Join-Path $d 'CMakeLists.txt')) { $b=Join-Path $d 'build'; Invoke-Step 'CMake configure' 'cmake' @('-S',$d,'-B',$b) $Root; Invoke-Step 'CMake build' 'cmake' @('--build',$b,'--parallel') $Root }
}
Get-ChildItem $LogDir | Out-Null
"Build orchestration complete: $(Get-Date -Format o)" | Tee-Object -FilePath $Log -Append
