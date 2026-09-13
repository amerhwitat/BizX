"""Small authenticated-by-application peer/client-server text chat transport.

Transport only: callers provide an application-level token. Messages use
length-prefixed UTF-8 JSON over TCP. Intended for LAN/private deployments;
no public discovery or unsolicited connections are performed.
"""
from __future__ import annotations
import json, socket, struct
from dataclasses import dataclass

MAX_MESSAGE = 64 * 1024

def _send(sock: socket.socket, payload: dict) -> None:
    raw = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode()
    if len(raw) > MAX_MESSAGE: raise ValueError("message too large")
    sock.sendall(struct.pack("!I", len(raw)) + raw)

def _recv(sock: socket.socket) -> dict:
    head = _read(sock, 4)
    size = struct.unpack("!I", head)[0]
    if size > MAX_MESSAGE: raise ValueError("message too large")
    return json.loads(_read(sock, size).decode())

def _read(sock: socket.socket, size: int) -> bytes:
    out = bytearray()
    while len(out) < size:
        chunk = sock.recv(size-len(out))
        if not chunk: raise ConnectionError("peer disconnected")
        out.extend(chunk)
    return bytes(out)

@dataclass
class ChatPeer:
    host: str
    port: int
    token: str
    timeout: float = 5.0

    def send(self, sender: str, text: str) -> dict:
        if not text.strip(): raise ValueError("empty message")
        with socket.create_connection((self.host, self.port), self.timeout) as sock:
            _send(sock, {"type":"hello", "token":self.token})
            ack = _recv(sock)
            if ack.get("type") != "ok": raise PermissionError("chat authentication failed")
            _send(sock, {"type":"chat", "sender":sender, "text":text[:MAX_MESSAGE]})
            return _recv(sock)

class ChatServer:
    def __init__(self, host: str, port: int, token: str): self.address=(host,port); self.token=token
    def serve_once(self, handler):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:
            server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1); server.bind(self.address); server.listen(8)
            conn, _ = server.accept()
            with conn:
                hello=_recv(conn)
                if hello.get("token") != self.token: _send(conn,{"type":"error","error":"unauthorized"}); return
                _send(conn,{"type":"ok"}); msg=_recv(conn); handler(msg); _send(conn,{"type":"delivered"})
