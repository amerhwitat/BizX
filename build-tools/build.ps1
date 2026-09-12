$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Write-Host "[BUILD] BizX universal PowerShell runner"
$py = Get-Command python -ErrorAction SilentlyContinue
if (-not $py) { throw 'Python 3 is required for the universal runner.' }
& $py.Source (Join-Path $root 'build-tools/build.py') @args
exit $LASTEXITCODE
