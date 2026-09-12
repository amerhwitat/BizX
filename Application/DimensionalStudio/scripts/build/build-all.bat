@echo off
setlocal
set ROOT=%~dp0..\..
cmake -S "%ROOT%" -B "%ROOT%\build\native" -DCMAKE_BUILD_TYPE=Release
if errorlevel 1 exit /b %errorlevel%
cmake --build "%ROOT%\build\native" --config Release
if errorlevel 1 exit /b %errorlevel%
if exist "%ROOT%\web\package.json" (
  pushd "%ROOT%\web"
  where npm >nul 2>nul && npm install && npm run build
  popd
)
echo Dimensional Studio build completed.
