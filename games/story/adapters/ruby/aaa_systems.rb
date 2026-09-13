module BizX; module Game
  class AaaSystems
    attr_reader :tick,:npcs,:prices
    def initialize; @tick=0; @npcs=[]; @prices={}; end
    def tick_once; @tick+=1; @npcs.each{|n| n[:food]=[0,n[:food]-.005].max;n[:rest]=[0,n[:rest]-.003].max;n[:state]=n[:safety]<.25 ? 'flee' : n[:food]<.25 ? 'seek_food' : n[:rest]<.2 ? 'sleep' : 'work'}; end
    def market(good,supply,demand); @prices[good]=[.01,(demand+1.0)/(supply+1.0)].max; end
    def resolve_ability(base,defense,roll); roll+5<defense ? 0 : base*(roll==20 ? 2 : 1); end
  end
end; end
