@echo off
setlocal
set "ROOT=%~dp0"
where powershell.exe >nul 2>&1 || (echo PowerShell is required.& exit /b 1)
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%ROOT%scripts\build.ps1" %*
exit /b %ERRORLEVEL%
