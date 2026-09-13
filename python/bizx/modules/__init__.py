"""Python-native adapters for BizX feature trees consolidated into one runtime."""
from __future__ import annotations

from dataclasses import dataclass, field
import hashlib
import ipaddress
import json
import socket
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


@dataclass
class NetworkService:
    """Non-destructive client/server and lobby primitives."""
    peers: dict[str, dict[str, Any]] = field(default_factory=dict)

    def join(self, peer_id: str, metadata: dict[str, Any] | None = None) -> dict[str, Any]:
        record = {"id": peer_id, "metadata": dict(metadata or {}), "online": True}
        self.peers[peer_id] = record
        return dict(record)

    def leave(self, peer_id: str) -> bool:
        return self.peers.pop(peer_id, None) is not None

    def presence(self) -> list[dict[str, Any]]:
        return [dict(value) for value in self.peers.values()]


class NetworkUnifiedService(NetworkService):
    """NetworkUnified Python API: messages, scope classification and guarded checks."""

    def __init__(self, allowlist: set[str] | None = None) -> None:
        super().__init__()
        self.allowlist = set(allowlist or ())

    @staticmethod
    def classify(target: str) -> str:
        address = ipaddress.ip_address(target)
        if address.is_private or address.is_loopback or address.is_link_local:
            return "local/intranet"
        return "public"

    def authorize(self, target: str) -> bool:
        return self.classify(target) != "public" or target in self.allowlist

    @staticmethod
    def interfaces() -> dict[str, Any]:
        addresses: set[str] = set()
        try:
            addresses.update(info[4][0] for info in socket.getaddrinfo(socket.gethostname(), None))
        except OSError:
            pass
        return {"hostname": socket.gethostname(), "addresses": sorted(addresses)}

    def tcp_check(self, target: str, port: int, timeout: float = 1.0) -> dict[str, Any]:
        if not self.authorize(target):
            return {"target": target, "port": port, "reachable": False, "error": "public_target_not_allowlisted"}
        timeout = min(max(float(timeout), 0.05), 3.0)
        try:
            with socket.create_connection((target, int(port)), timeout=timeout):
                return {"target": target, "port": int(port), "reachable": True}
        except OSError as exc:
            return {"target": target, "port": int(port), "reachable": False, "error": type(exc).__name__}

    @staticmethod
    def encode_message(channel: str, payload: dict[str, Any]) -> bytes:
        envelope = {"version": 1, "channel": channel, "payload": payload}
        return json.dumps(envelope, sort_keys=True, separators=(",", ":")).encode("utf-8")

    @staticmethod
    def decode_message(data: bytes | str) -> dict[str, Any]:
        if isinstance(data, bytes):
            data = data.decode("utf-8")
        value = json.loads(data)
        if value.get("version") != 1 or not isinstance(value.get("payload"), dict):
            raise ValueError("unsupported network message")
        return value

    def route(self, channel: str, payload: dict[str, Any]) -> dict[str, Any]:
        return {"channel": channel, "bytes": len(self.encode_message(channel, payload)), "delivered": len(self.peers)}


@dataclass(frozen=True)
class Vec3:
    x: float
    y: float
    z: float


class Scene3D:
    """Dependency-free 3D scene graph and perspective projection core."""

    def __init__(self) -> None:
        self.nodes: dict[str, Vec3] = {}
        self.camera = Vec3(0.0, 0.0, 5.0)
        self.focal_length = 1.0

    def add_node(self, name: str, position: tuple[float, float, float]) -> Vec3:
        node = Vec3(*map(float, position))
        self.nodes[name] = node
        return node

    def project(self, position: tuple[float, float, float], width: int = 800, height: int = 600) -> tuple[float, float]:
        x, y, z = map(float, position)
        depth = self.camera.z - z
        if depth <= 0:
            raise ValueError("point is behind the camera")
        scale = self.focal_length / depth
        return (round(width / 2 + x * scale * width / 2, 6), round(height / 2 - y * scale * height / 2, 6))

    def snapshot(self) -> dict[str, Any]:
        return {"nodes": {name: [v.x, v.y, v.z] for name, v in self.nodes.items()}, "camera": [self.camera.x, self.camera.y, self.camera.z]}


class RenderingService:
    """Renderer-independent capability model for rendering/AssetSource."""

    def __init__(self) -> None:
        self.backend = "python-software"
        self.features = {"scene": True, "perspective": True, "asset_sources": True, "gpu_backend": False}

    def capabilities(self) -> dict[str, Any]:
        return {"backend": self.backend, "features": dict(self.features)}

    def checksum(self, payload: bytes) -> str:
        return hashlib.sha256(payload).hexdigest()


@dataclass(frozen=True)
class AssetRecord:
    asset_id: str
    name: str
    uri: str
    license: str = "unknown"
    free: bool = True


class GameAssetService:
    """Manifest/catalog facade for game-assets and AssetBrowser."""

    def __init__(self, root: str | Path | None = None) -> None:
        self.root = Path(root) if root else Path.cwd()
        self._items = [
            AssetRecord("placeholder-cube", "Placeholder Cube", "builtin://cube", "CC0", True),
            AssetRecord("placeholder-ui", "Placeholder UI", "builtin://ui", "CC0", True),
        ]

    def catalog(self) -> list[dict[str, Any]]:
        return [item.__dict__.copy() for item in self._items]

    def register(self, item: AssetRecord) -> None:
        if not item.license:
            raise ValueError("asset license is required")
        self._items.append(item)

    def local_path(self, asset_id: str) -> Path:
        safe = "".join(ch for ch in asset_id if ch.isalnum() or ch in "-_ .").strip()
        if not safe:
            raise ValueError("invalid asset id")
        return self.root / "game-assets" / safe


@dataclass(frozen=True)
class StoreProduct:
    product_id: str
    title: str
    price: float
    currency: str = "USD"
    free: bool = False


class GameStoreService:
    """Local catalog/storyboard/card model; settlement stays provider-bound."""

    def __init__(self) -> None:
        self.products = [
            StoreProduct("starter-free", "Starter Pack", 0.0, "USD", True),
            StoreProduct("demo-asset", "Demo Asset", 1.0, "USD", False),
        ]

    def list_products(self) -> list[dict[str, Any]]:
        return [p.__dict__.copy() for p in self.products]

    def get(self, product_id: str) -> StoreProduct | None:
        return next((p for p in self.products if p.product_id == product_id), None)


class GameLauncherService:
    """Single entry-point command registry for UnifiedGame/launcher/python."""

    def commands(self) -> list[dict[str, str]]:
        return [
            {"name": "start", "description": "Start the unified game runtime"},
            {"name": "health", "description": "Inspect integrated modules"},
            {"name": "gui", "description": "Open the desktop control panel"},
            {"name": "assets", "description": "Browse the approved asset catalog"},
        ]

    def dispatch(self, command: str) -> dict[str, Any]:
        if command not in {item["name"] for item in self.commands()}:
            raise ValueError(f"unknown command: {command}")
        return {"command": command, "accepted": True}


class WebService:
    """Web/game-UI route registry without embedding a web server in core."""

    def routes(self) -> dict[str, str]:
        return {
            "/": "game-ui",
            "/health": "runtime-health",
            "/api/assets": "asset-catalog",
            "/api/store": "game-store",
            "/api/network": "network-presence",
        }

    @staticmethod
    def validate_https_url(url: str) -> bool:
        parsed = urlparse(url)
        return parsed.scheme == "https" and bool(parsed.netloc)


class ScriptInventory:
    """Safe inventory of repository build/install/check commands."""

    def inventory(self) -> list[dict[str, str]]:
        return [
            {"name": "build-python", "shell": "python", "entry": "-m bizx --health"},
            {"name": "test-python", "shell": "python", "entry": "-m pytest"},
            {"name": "build-pyinstaller", "shell": "python", "entry": "-m PyInstaller bizx/__main__.py"},
            {"name": "check-3d", "shell": "python", "entry": "-m bizx --health"},
        ]


class InternetScanner:
    """Authorization-aware scanner facade; no network traffic is emitted by default."""

    def __init__(self) -> None:
        self.authorized_targets: set[str] = set()

    def authorize(self, target: str) -> None:
        self.authorized_targets.add(target)

    def inspect_target(self, target: str) -> dict[str, Any]:
        return {"target": target, "authorized": target in self.authorized_targets, "active_scan": False}


class AssetBrowserService:
    """HTTPS-only asset discovery boundary; downloads require an explicit caller action."""

    def browse(self, url: str) -> dict[str, Any]:
        if not WebService.validate_https_url(url):
            raise ValueError("only HTTPS asset sources are accepted")
        return {"url": url, "download_required": True, "automatic_execution": False}


class CryptoService:
    """Minimal safe cryptographic facade used by the game layer."""

    def sha256(self, payload: bytes | str) -> str:
        data = payload.encode() if isinstance(payload, str) else payload
        return hashlib.sha256(data).hexdigest()

    def payment_intent(self, chain: str, asset: str, amount: str, destination: str) -> dict[str, str]:
        return {"chain": chain, "asset": asset, "amount": amount, "destination": destination, "mode": "provider-signing"}


class EmailService:
    def validate(self, address: str) -> bool:
        return "@" in address and "." in address.rsplit("@", 1)[-1]


@dataclass
class MobileState:
    connected: bool = False
    platform: str = "desktop"


__all__ = [
    "AssetBrowserService", "AssetRecord", "CryptoService", "EmailService", "GameAssetService",
    "GameLauncherService", "GameStoreService", "InternetScanner", "MobileState", "NetworkService",
    "NetworkUnifiedService", "RenderingService", "Scene3D", "ScriptInventory", "StoreProduct", "WebService", "Vec3",
]
