class BizXCore:
    def __init__(self, name="BizX", version="1.0.0"):
        self.name = name
        self.version = version

    def health(self):
        return {"name": self.name, "version": self.version, "status": "ok", "runtime": "python"}
