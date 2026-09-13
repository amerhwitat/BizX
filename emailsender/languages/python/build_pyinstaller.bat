@echo off
setlocal
cd /d "%~dp0"
python -m pip install -r requirements-dev.txt
python -m PyInstaller --noconfirm --clean --onefile emailsender_relay.py
