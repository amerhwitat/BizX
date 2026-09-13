#!/usr/bin/env python3
"""Portable Python entry point replacing the repository's feature build helpers."""
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def run_test() -> int:
    return subprocess.call([sys.executable, "-m", "unittest", "discover", "-s", "tests", "-p", "test*.py"], cwd=ROOT)


def run_health() -> int:
    return subprocess.call([sys.executable, "-m", "bizx", "--health"], cwd=ROOT)


def main() -> int:
    parser = argparse.ArgumentParser(description="BizX unified Python build/runtime helper")
    parser.add_argument("command", choices=("health", "test"), default="health", nargs="?")
    args = parser.parse_args()
    return run_health() if args.command == "health" else run_test()


if __name__ == "__main__":
    raise SystemExit(main())
