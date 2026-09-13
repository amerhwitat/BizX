import { validateProject, redactSecrets } from './model.mjs';
export function exportProject(project) { validateProject(project); return JSON.stringify(redactSecrets(project),null,2); }
export function importProject(text) { const project=JSON.parse(text); return validateProject(project); }
export function exportCsv(project) { validateProject(project); const rows=['ip,scope,protocol,port,state,service,version']; for(const h of project.hosts) for(const p of h.openPorts??[]) rows.push([h.ip,h.scope,p.protocol,p.port,p.state,p.service??'',p.version??''].map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')); return rows.join('\n')+'\n'; }
export function reportMarkdown(project) { validateProject(project); const lines=['# InternetScanner Report','','| IP | Scope | Ports |','|---|---|---|']; for(const h of project.hosts) lines.push(`| ${h.ip} | ${h.scope} | ${(h.openPorts??[]).map(p=>`${p.port}/${p.protocol} ${p.state}`).join('<br>')} |`); return lines.join('\n'); }
