#!/usr/bin/env python3
"""Universal repository build runner with live progress output.

Detects Python, Java, Node/web, CMake/Make, .NET and SQL assets and runs
only the targets that actually exist. Use --dry-run to inspect commands.
"""
from __future__ import annotations
import argparse, hashlib, json, os, platform, shlex, shutil, subprocess, sys, time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "build" / "artifacts"


def log(stage: str, msg: str) -> None:
    now = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{now}] [{stage.upper():10}] {msg}", flush=True)


def tool(name: str) -> str | None:
    return shutil.which(name)


def run(cmd, cwd=ROOT, dry=False, env=None):
    text = " ".join(shlex.quote(str(x)) for x in cmd)
    log("command", text)
    if dry:
        return 0
    started = time.monotonic()
    p = subprocess.Popen([str(x) for x in cmd], cwd=str(cwd), env=env,
                         stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                         text=True, bufsize=1)
    assert p.stdout is not None
    for line in p.stdout:
        print(line.rstrip(), flush=True)
    rc = p.wait()
    log("result", f"exit={rc} elapsed={time.monotonic()-started:.2f}s")
    return rc


def files(*names):
    return [ROOT / n for n in names if (ROOT / n).exists()]


def detect():
    py = list(ROOT.rglob("*.py"))
    java = list(ROOT.rglob("*.java"))
    pkg = ROOT / "package.json"
    cmake = ROOT / "CMakeLists.txt"
    dotnet = list(ROOT.rglob("*.sln")) + list(ROOT.rglob("*.csproj"))
    sql = list(ROOT.rglob("*.sql"))
    return {
        "python": bool(py), "java": bool(java or (ROOT/"pom.xml").exists() or (ROOT/"build.gradle").exists()),
        "node": pkg.exists(), "cmake": cmake.exists(), "dotnet": bool(dotnet), "sql": bool(sql),
        "web": pkg.exists() and any((ROOT/x).exists() for x in ["next.config.js","next.config.mjs","vite.config.js","angular.json","vue.config.js"]),
    }


def install_python(dry=False):
    req = next(iter([p for p in [ROOT/"requirements.txt", ROOT/"requirements-dev.txt"] if p.exists()]), None)
    if req and tool("python"):
        log("dependency", f"Python requirements: {req.relative_to(ROOT)}")
        return run([sys.executable, "-m", "pip", "install", "-r", str(req)], dry=dry)
    return 0


def build_python(args, dry=False):
    if not tool("python"):
        log("skip", "Python interpreter not found")
        return 0
    install_python(dry)
    entries = []
    for p in ROOT.rglob("*.py"):
        if any(part in {".git", "build", "dist", ".venv", "venv", "__pycache__"} for part in p.parts):
            continue
        if p.name not in {"__init__.py", "setup.py"}:
            entries.append(p)
    if not entries:
        log("skip", "No Python entry scripts detected")
        return 0
    selected = [Path(args.python)] if args.python else entries[:1]
    for src in selected:
        if not src.is_absolute(): src = ROOT / src
        name = src.stem.replace(" ", "_")
        cmd = [sys.executable, "-m", "PyInstaller", "--noconfirm", "--clean", "--name", name,
               "--distpath", str(DIST / "python"), "--workpath", str(ROOT/"build"/"pyinstaller"), str(src)]
        if args.onefile: cmd.insert(4, "--onefile")
        if not tool("python"):
            continue
        if run(cmd, dry=dry) != 0: return 1
    return 0


def build_java(dry=False):
    if (ROOT/"pom.xml").exists() and tool("mvn"):
        return run(["mvn", "-B", "test", "package"], dry=dry)
    if (ROOT/"gradlew").exists():
        return run([str(ROOT/"gradlew"), "build"], dry=dry)
    if (ROOT/"build.gradle").exists() and tool("gradle"):
        return run(["gradle", "build"], dry=dry)
    sources = [p for p in ROOT.rglob("*.java") if ".git" not in p.parts and "build" not in p.parts]
    if not sources or not tool("javac"):
        log("skip", "No runnable Java build system detected")
        return 0
    out = ROOT/"build"/"java-classes"; out.mkdir(parents=True, exist_ok=True)
    return run(["javac", "-d", str(out), *map(str, sources)], dry=dry)


def build_node(dry=False):
    if not (ROOT/"package.json").exists():
        log("skip", "No package.json")
        return 0
    manager = "pnpm" if (ROOT/"pnpm-lock.yaml").exists() and tool("pnpm") else "yarn" if (ROOT/"yarn.lock").exists() and tool("yarn") else "npm"
    if not tool(manager):
        log("skip", f"Node package manager {manager} not found")
        return 0
    install = [manager, "install"] if manager != "npm" else ["npm", "ci"] if (ROOT/"package-lock.json").exists() else ["npm", "install"]
    if run(install, dry=dry) != 0: return 1
    return run([manager, "run", "build"], dry=dry) if manager != "npm" else run(["npm", "run", "build"], dry=dry)


def build_native(dry=False):
    if (ROOT/"CMakeLists.txt").exists() and tool("cmake"):
        b = ROOT/"build"/"cmake"; b.mkdir(parents=True, exist_ok=True)
        if run(["cmake", "-S", str(ROOT), "-B", str(b), "-DCMAKE_BUILD_TYPE=Release"], dry=dry) != 0: return 1
        if run(["cmake", "--build", str(b), "--config", "Release", "--parallel"], dry=dry) != 0: return 1
        return run(["ctest", "--test-dir", str(b), "--output-on-failure"], dry=dry) if tool("ctest") else 0
    if (ROOT/"Makefile").exists() and tool("make"):
        return run(["make", "-j"], dry=dry)
    if (ROOT/"*.sln").exists() and tool("dotnet"):
        return run(["dotnet", "build", "--configuration", "Release"], dry=dry)
    return 0


def run_sql(dry=False):
    scripts = sorted(p for p in ROOT.rglob("*.sql") if ".git" not in p.parts and "build" not in p.parts)
    if not scripts:
        log("skip", "No SQL scripts")
        return 0
    log("database", f"Discovered {len(scripts)} SQL scripts")
    log("database", "Validation mode: set NLP_DB_* variables and use native clients for execution")
    for s in scripts:
        log("database", str(s.relative_to(ROOT)))
    return 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--python", help="specific Python entry script")
    ap.add_argument("--onefile", action="store_true")
    ap.add_argument("--only", choices=["all","python","java","node","native","sql"], default="all")
    args = ap.parse_args()
    DIST.mkdir(parents=True, exist_ok=True)
    log("build", f"repo={ROOT.name} os={platform.system()} arch={platform.machine()}")
    caps = detect(); log("detect", json.dumps(caps, sort_keys=True))
    started = time.monotonic()
    tasks = {
        "python": lambda: build_python(args, args.dry_run),
        "java": lambda: build_java(args.dry_run),
        "node": lambda: build_node(args.dry_run),
        "native": lambda: build_native(args.dry_run),
        "sql": lambda: run_sql(args.dry_run),
    }
    order = [args.only] if args.only != "all" else ["python","java","node","native","sql"]
    for name in order:
        if name != "all" and not caps.get(name, True):
            log("skip", f"{name}: capability not detected")
            continue
        log("stage", name)
        if tasks[name]() != 0:
            log("build", f"FAILED stage={name}"); return 1
    log("build", f"DONE elapsed={time.monotonic()-started:.2f}s artifacts={DIST}")
    return 0

if __name__ == "__main__": raise SystemExit(main())
