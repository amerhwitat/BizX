"""Unified Python package entry point.

Use ``python -m bizx`` for the headless runtime or ``python -m bizx --gui``
for the native GUI control panel.
"""

from .unified import main


if __name__ == "__main__":
    raise SystemExit(main())
