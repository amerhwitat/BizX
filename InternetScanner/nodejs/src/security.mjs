const SERVICE_MAP = new Map([[22,'ssh'],[25,'smtp'],[53,'dns'],[80,'http'],[110,'pop3'],[143,'imap'],[443,'https'],[3306,'mysql'],[5432,'postgresql'],[6379,'redis'],[8080,'http-alt']]);
export function identifyService(finding, evidence='') { const service=SERVICE_MAP.get(finding.port) ?? 'unknown'; const text=String(evidence); const version=(text.match(/(?:OpenSSH|Apache|nginx|BIND|Microsoft-IIS)[\s\/-]*([0-9][\w.\-]*)/i)?.[1]) ?? null; return {service,version,evidence:text ? [text] : [],confidence:text ? 'medium' : 'low'}; }
export function vulnerabilityFinding(service, cves=[]) { if (!service?.version) return {state:'LIKELY_VULN',confidence:'low',cves}; return {state:'LIKELY_VULN',confidence:'medium',cves,reason:'version/CPE correlation requires vendor applicability confirmation'}; }

export function parseNmapXml(xml) {
  const hosts=[];
  const blocks=String(xml).match(/<host\b[\s\S]*?<\/host>/gi)??[];
  for(const block of blocks){
    const addr=block.match(/<address[^>]+addr="([^"]+)"/i)?.[1]; if(!addr)continue;
    const ports=[];
    for(const match of block.matchAll(/<port\b([^>]*)>[\s\S]*?<state\b[^>]*state="([^"]+)"[^>]*>[\s\S]*?<\/port>/gi)){
      const attrs=match[1]; const port=Number(attrs.match(/portid="(\d+)"/i)?.[1]); const protocol=attrs.match(/protocol="(tcp|udp)"/i)?.[1];
      if(Number.isInteger(port)&&protocol)ports.push({port,protocol,state:match[2]});
    }
    hosts.push({ip:addr,scope:'local/intranet',authorized:true,openPorts:ports,observedAt:new Date().toISOString()});
  }
  return {schema:1,hosts};
}
