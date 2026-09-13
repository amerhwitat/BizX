$ErrorActionPreference='Stop'
$root=Join-Path $PSScriptRoot '..'
$dirs=@('python','AssetBrowser/python','InternetScanner/languages/python','NetworkUnified/python','emailsender/languages/python','marketplace/crypto/python')
foreach($d in $dirs){$p=Join-Path $root $d; if(Test-Path (Join-Path $p 'requirements.txt')){Write-Host "Installing $p"; python -m pip install -r (Join-Path $p 'requirements.txt')}}
