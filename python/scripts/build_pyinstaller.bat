@echo off
setlocal
cd /d "%~dp0.."
call .venv\Scripts\activate.bat
pyinstaller --noconfirm --clean --windowed --name BizX bizx\gui.py
