package io.amerhwitat.bizx.catalog;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public final class CatalogService {
    private final Map<String, String> entries = new ConcurrentHashMap<>();
    public void register(String id, String description) { entries.put(id, description); }
    public String find(String id) { return entries.get(id); }
    public int size() { return entries.size(); }
}
