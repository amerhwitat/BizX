"""Single Python entry point for starting the BizX game/application."""

from .api import BizXApi


def main() -> int:
    api = BizXApi()
    print("BizX game starting")
    print(api.health())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
