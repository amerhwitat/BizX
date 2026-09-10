class CatalogService:
    def __init__(self):
        self._entries = {}

    def register(self, item_id, description):
        self._entries[item_id] = description

    def find(self, item_id):
        return self._entries.get(item_id)

    def __len__(self):
        return len(self._entries)
