#pragma once
#include <string>
#include <unordered_map>
#include <vector>
#include <algorithm>
namespace bizx::game { struct Npc{std::string id,faction,state="idle"; double food=1,rest=1,safety=1;}; class AaaSystems{public:int64_t tick=0;std::vector<Npc> npcs;std::unordered_map<std::string,double> prices;void tick_once(){++tick;for(auto&n:npcs){n.food=std::max(0.0,n.food-.005);n.rest=std::max(0.0,n.rest-.003);n.state=n.safety<.25?"flee":n.food<.25?"seek_food":n.rest<.2?"sleep":"work";}}double market(const std::string&g,double s,double d){double p=std::max(.01,(d+1)/(s+1));prices[g]=p;return p;}int resolve_ability(int base,int defense,int roll)const{return roll+5<defense?0:base*(roll==20?2:1);}};}
