"""Single Python entry point for starting BizX and Tycoon mode."""

from .api import BizXApi
from .game.tycoon import TycoonGame


def main(mode: str = "default") -> int:
    api = BizXApi()
    print("BizX game starting")
    print(api.health())
    if mode.lower() == "tycoon":
        game = TycoonGame(cash=10_000)
        print(f"BizX Tycoon ready: cash={game.cash}")
    return 0


if __name__ == "__main__":
    import sys
    raise SystemExit(main(sys.argv[1] if len(sys.argv) > 1 else "default"))
