import 'dart:io';
String classify(String ip){ final a=InternetAddress.tryParse(ip); if(a==null)return 'public'; if(a.isLoopback||a.isLinkLocal)return 'local/intranet'; final b=a.address.split('.').map(int.parse).toList(); if(b.length==4 && (b[0]==10||(b[0]==172&&b[1]>=16&&b[1]<=31)||(b[0]==192&&b[1]==168)))return 'local/intranet'; return 'public'; }
bool authorized(String ip,Set<String> allow)=>classify(ip)!='public'||allow.contains(ip);
