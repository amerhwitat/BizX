from __future__ import annotations

import argparse
import json
from typing import Any

from .api import BizXApi
from .catalog import CatalogService
from .game.progression import ProgressionProfile
from .game.tycoon import TycoonGame
from .monetization import MonetizationEngine
from .payments import PaymentService
from .wallet import WalletProvider
from .modules import (
    AssetBrowserService,
    CryptoService,
    EmailService,
    GameAssetService,
    GameLauncherService,
    GameStoreService,
    InternetScanner,
    MobileState,
    NetworkService,
    NetworkUnifiedService,
    RenderingService,
    Scene3D,
    ScriptInventory,
    WebService,
)


class BizXRuntime:
    """Single Python application facade for BizX's consolidated feature tree."""

    def __init__(self) -> None:
        self.api = BizXApi()
        self.modules: dict[str, Any] = {
            "game": {"progression": ProgressionProfile, "tycoon": TycoonGame},
            "network": NetworkService(),
            "network_unified": NetworkUnifiedService(),
            "scanner": InternetScanner(),
            "render3d": Scene3D(),
            "rendering": RenderingService(),
            "game_assets": GameAssetService(),
            "game_store": GameStoreService(),
            "launcher": GameLauncherService(),
            "web": WebService(),
            "scripts": ScriptInventory(),
            "assets": AssetBrowserService(),
            "crypto": CryptoService(),
            "email": EmailService(),
            "mobile": MobileState(),
            "wallet": WalletProvider,
            "catalog": CatalogService,
            "payments": PaymentService,
            "monetization": MonetizationEngine,
        }

    def health(self) -> dict[str, Any]:
        return {
            "status": "ok",
            "implementation": "python",
            "modules": sorted(self.modules),
            "api": self.api.health(),
        }

    def start(self, mode: str = "default") -> int:
        print("BizX unified Python runtime starting")
        print(json.dumps(self.health(), indent=2, default=str))
        if mode.lower() == "tycoon":
            game = TycoonGame(cash=10_000)
            print(f"Tycoon ready: cash={game.cash}")
        return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="BizX unified Python runtime")
    parser.add_argument("mode", nargs="?", default="default", choices=("default", "tycoon"))
    parser.add_argument("--health", action="store_true")
    parser.add_argument("--gui", action="store_true", help="open the native Tkinter control panel")
    args = parser.parse_args(argv)
    if args.gui:
        from .gui import main as gui_main
        gui_main()
        return 0
    runtime = BizXRuntime()
    if args.health:
        print(json.dumps(runtime.health(), indent=2, default=str))
        return 0
    return runtime.start(args.mode)


if __name__ == "__main__":
    raise SystemExit(main())
