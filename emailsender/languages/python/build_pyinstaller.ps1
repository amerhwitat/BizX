$ErrorActionPreference='Stop'
Set-Location $PSScriptRoot
python -m pip install -r requirements-dev.txt
python -m PyInstaller --noconfirm --clean --onefile emailsender_relay.py
