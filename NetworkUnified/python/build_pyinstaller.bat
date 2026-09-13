@echo off
setlocal
cd /d "%~dp0"
python -m pip install -r requirements-dev.txt
python -m PyInstaller --noconfirm --clean --onefile --name BizX-NetworkUnified app.py
