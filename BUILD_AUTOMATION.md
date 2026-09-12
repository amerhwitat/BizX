# Universal Build Automation

Run from the repository root:

- Windows CMD: `build-tools\build.bat`
- PowerShell: `powershell -ExecutionPolicy Bypass -File build-tools\build.ps1`
- Linux/macOS: `./build-tools/build.sh`
- Dry run: append `--dry-run`
- Python packaging: `--only python --onefile`
- Java: `--only java`
- Node/web: `--only node`
- Native C/C++/CMake/Make/.NET: `--only native`
- SQL inventory/validation: `--only sql`

The runner detects project files rather than fabricating framework targets. It streams dependency, compile, link/package, test, database and completion stages. PyInstaller is invoked through the active Python interpreter, so Windows/Linux/macOS artifacts must be produced on their respective native runners.

Artifacts are written below `build/artifacts/` and should not be committed. Configure database credentials only through environment variables such as `NLP_DB_*`.
