"""Backward-compatible launcher delegating to the unified BizX Python runtime."""

from .unified import BizXRuntime


def main(mode: str = "default") -> int:
    return BizXRuntime().start(mode)


if __name__ == "__main__":
    import sys
    raise SystemExit(main(sys.argv[1] if len(sys.argv) > 1 else "default"))
