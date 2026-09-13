#pragma once
#include <string>
#include <unordered_set>
#include <arpa/inet.h>
namespace bizx::scanner {
inline std::string classify(const std::string& s){ in_addr a{}; if(inet_pton(AF_INET,s.c_str(),&a)!=1) return "public"; auto x=ntohl(a.s_addr); bool p=((x>>24)==10)||((x>>20)==0xAC1)||((x>>16)==0xC0A8); return p?"local/intranet":"public"; }
inline bool authorized(const std::string& s,const std::unordered_set<std::string>& allow){return classify(s)!="public"||allow.contains(s);}
}
