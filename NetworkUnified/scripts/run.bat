@echo off
setlocal
set "ROOT=%~dp0.."
if "%NETWORK_API_IMPL%"=="" set "NETWORK_API_IMPL=python"
if /I "%NETWORK_API_IMPL%"=="python" python "%ROOT%\python\app.py" & goto :eof
if /I "%NETWORK_API_IMPL%"=="node" node "%ROOT%\node\app.js" & goto :eof
if /I "%NETWORK_API_IMPL%"=="typescript" npx --yes tsx "%ROOT%\typescript\app.ts" & goto :eof
if /I "%NETWORK_API_IMPL%"=="go" go run "%ROOT%\go\main.go" & goto :eof
if /I "%NETWORK_API_IMPL%"=="rust" cargo run --manifest-path "%ROOT%\rust\Cargo.toml" & goto :eof
if /I "%NETWORK_API_IMPL%"=="java" javac "%ROOT%\java\Main.java" -d "%ROOT%\java\out" && java -cp "%ROOT%\java\out" Main & goto :eof
if /I "%NETWORK_API_IMPL%"=="csharp" dotnet run --project "%ROOT%\csharp" & goto :eof
if /I "%NETWORK_API_IMPL%"=="cpp" c++ -std=c++17 "%ROOT%\cpp\main.cpp" -o "%ROOT%\cpp\network-api.exe" && "%ROOT%\cpp\network-api.exe" & goto :eof
if /I "%NETWORK_API_IMPL%"=="dart" dart run "%ROOT%\dart\bin\main.dart" & goto :eof
if /I "%NETWORK_API_IMPL%"=="kotlin" kotlinc "%ROOT%\kotlin\Main.kt" -include-runtime -d "%ROOT%\kotlin\network-api.jar" && java -jar "%ROOT%\kotlin\network-api.jar" & goto :eof
if /I "%NETWORK_API_IMPL%"=="swift" swift "%ROOT%\swift\main.swift" & goto :eof
if /I "%NETWORK_API_IMPL%"=="php" php "%ROOT%\php\main.php" & goto :eof
if /I "%NETWORK_API_IMPL%"=="ruby" ruby "%ROOT%\ruby\main.rb" & goto :eof
echo Unknown NETWORK_API_IMPL=%NETWORK_API_IMPL%
exit /b 2
