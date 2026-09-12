@echo off
setlocal
set ROOT=%~dp0..
where python >nul 2>&1
if errorlevel 1 (
  echo [DEPENDENCY] Python 3 not found. Install Python 3 and retry.
  exit /b 2
)
echo [BUILD] BizX universal CMD runner
python "%ROOT%build-tools\build.py" %*
exit /b %ERRORLEVEL%
