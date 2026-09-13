#include "BizXAAASystems.h"
void UBizXAAASystems::TickOnce(){ ++Tick; for(auto& N: NPCs){ N.Food=FMath::Max(0.f,N.Food-.005f); N.Rest=FMath::Max(0.f,N.Rest-.003f); N.State=N.Safety<.25f?TEXT("flee"):N.Food<.25f?TEXT("seek_food"):N.Rest<.2f?TEXT("sleep"):TEXT("work"); } }
float UBizXAAASystems::Market(const FString& Good,float Supply,float Demand){ const float P=FMath::Max(.01f,(Demand+1.f)/(Supply+1.f)); Prices.Add(Good,P); return P; }
int32 UBizXAAASystems::ResolveAbility(int32 BaseDamage,int32 Defense,int32 Roll) const { return Roll+5>=Defense ? BaseDamage*(Roll==20?2:1):0; }
void UBizXAAASystems::TriggerWorldEvent(const FString& EventId){ ActiveEvents.AddUnique(EventId); }
