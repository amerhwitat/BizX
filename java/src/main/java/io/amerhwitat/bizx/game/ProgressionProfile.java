package io.amerhwitat.bizx.game;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

public final class ProgressionProfile {
    private final String name; private int level; private String status; private long score; private String updatedAt;
    public ProgressionProfile(String name) { this.name=(name==null||name.isBlank()?"Player":name).substring(0,Math.min(40,(name==null?"Player":name).length())); this.status="new"; }
    public Map<String,Object> update(int level,String status,long score) { this.level=Math.max(this.level,level); if(status!=null&&!status.isBlank())this.status=status; this.score=Math.max(this.score,score); this.updatedAt=Instant.now().toString(); return save(); }
    public Map<String,Object> save(){ Map<String,Object> m=new LinkedHashMap<>(); m.put("schema",1);m.put("name",name);m.put("level",level);m.put("status",status);m.put("score",score);m.put("updatedAt",updatedAt);return m; }
}
