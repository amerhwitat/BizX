$ErrorActionPreference='Stop'
Set-Location (Join-Path $PSScriptRoot '..')
& .\.venv\Scripts\pyinstaller.exe --noconfirm --clean --windowed --name BizX bizx\__main__.py
