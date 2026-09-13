@echo off
setlocal
cd /d "%~dp0.."
python -m venv .venv 2>nul
call .venv\Scripts\activate.bat
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pip install pyinstaller
