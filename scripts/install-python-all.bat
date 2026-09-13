@echo off
setlocal
set ROOT=%~dp0..
for %%D in ("%ROOT%\python" "%ROOT%\AssetBrowser\python" "%ROOT%\InternetScanner\languages\python" "%ROOT%\NetworkUnified\python" "%ROOT%\emailsender\languages\python" "%ROOT%\marketplace\crypto\python") do (
  if exist "%%~D\requirements.txt" (
    echo Installing %%~D
    python -m pip install -r "%%~D\requirements.txt"
  )
)
echo Python dependency pass complete.
