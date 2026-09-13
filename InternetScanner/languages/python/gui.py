"""Authorized-only native GUI for the Python scanner inspection API."""
from __future__ import annotations

import json
import tkinter as tk
from tkinter import messagebox, scrolledtext, ttk

from scanner import inspect


class ScannerGUI(tk.Tk):
    def __init__(self) -> None:
        super().__init__()
        self.title("BizX Internet Scanner — Python GUI")
        self.geometry("720x480")
        self.ip = tk.StringVar()
        self._build()

    def _build(self) -> None:
        frame = ttk.Frame(self, padding=16)
        frame.pack(fill="both", expand=True)
        ttk.Label(frame, text="Authorized target inspection", font=("TkDefaultFont", 16, "bold")).pack(anchor="w")
        ttk.Label(frame, text="Public targets must be present in the configured allowlist.").pack(anchor="w", pady=(0, 12))
        row = ttk.Frame(frame)
        row.pack(fill="x")
        ttk.Entry(row, textvariable=self.ip).pack(side="left", fill="x", expand=True)
        ttk.Button(row, text="Inspect", command=self.run).pack(side="left", padx=(8, 0))
        self.output = scrolledtext.ScrolledText(frame, height=18, wrap="word", state="disabled")
        self.output.pack(fill="both", expand=True, pady=(12, 0))

    def run(self) -> None:
        target = self.ip.get().strip()
        if not target:
            return
        try:
            result = inspect(target, {"authorizedOnly": True, "public": {"allowlistedTargets": []}})
            text = json.dumps(result, indent=2)
        except Exception as exc:
            text = f"Inspection blocked or failed: {exc}"
            messagebox.showwarning("Scanner", text)
        self.output.configure(state="normal")
        self.output.insert("end", text + "\n\n")
        self.output.configure(state="disabled")


if __name__ == "__main__":
    ScannerGUI().mainloop()
