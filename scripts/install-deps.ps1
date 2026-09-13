[CmdletBinding()]
param([switch]$InstallToolchains)
$ErrorActionPreference='Stop'
$Root=Split-Path -Parent $PSScriptRoot
function Has($x){ return $null -ne (Get-Command $x -ErrorAction SilentlyContinue) }
'node','npm','python','cargo','go','java','mvn','gradle','dotnet','cmake' | ForEach-Object { if(-not (Has $_)){ Write-Warning "Missing tool: $_" } }
$files=Get-ChildItem $Root -Recurse -File | Where-Object {$_.FullName -notmatch '\\(\.git|node_modules|target|build|bin|obj|\.venv)\\'}
foreach($f in $files){
  $d=$f.DirectoryName
  switch($f.Name){
    'package.json' { if(Test-Path (Join-Path $d 'package-lock.json')){Push-Location $d; npm ci; Pop-Location}else{Push-Location $d; npm install; Pop-Location} }
    'requirements.txt' { Push-Location $d; python -m pip install -r requirements.txt; Pop-Location }
    'pyproject.toml' { Push-Location $d; python -m pip install -e .; Pop-Location }
    'Cargo.toml' { Push-Location $d; cargo fetch; Pop-Location }
    'go.mod' { Push-Location $d; go mod download; Pop-Location }
    'pom.xml' { Push-Location $d; if(Test-Path mvnw.cmd){cmd /c mvnw.cmd -B dependency:go-offline}else{mvn -B dependency:go-offline}; Pop-Location }
    '*.csproj' { Push-Location $d; dotnet restore; Pop-Location }
    '*.sln' { Push-Location $d; dotnet restore; Pop-Location }
  }
}
if($InstallToolchains){ Write-Warning 'Automatic OS-level toolchain installation is intentionally opt-in. Use your managed package manager (winget/choco/apt/brew) and rerun this script.' }
Write-Host 'Dependency bootstrap complete.'
