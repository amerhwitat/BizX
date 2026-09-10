from bizx.core import BizXCore

class BizXApi:
    def __init__(self, core=None):
        self.core = core or BizXCore()

    def health(self):
        return self.core.health()
