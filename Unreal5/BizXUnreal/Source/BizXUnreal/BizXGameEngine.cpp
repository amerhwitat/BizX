#include "BizXGameEngine.h"
#include "Math/UnrealMathUtility.h"

void UBIZXGameEngine::GrantItem(const FString& Item, int32 Count) { State.Inventory.FindOrAdd(Item) += Count; }
void UBIZXGameEngine::ChooseScene(const FString& Scene, int32 CreditsDelta, int32 XPDelta, const FString& Flag, const FString& Quest) {
    State.Scene = Scene; State.Credits += CreditsDelta; State.XP += XPDelta;
    if (!Flag.IsEmpty()) State.Flags.Add(Flag); if (!Quest.IsEmpty()) State.Quests.Add(Quest, TEXT("active"));
}
void UBIZXGameEngine::AdjustFaction(const FString& Faction, int32 Delta) { int32& Value = State.FactionRep.FindOrAdd(Faction); Value = FMath::Clamp(Value + Delta, -100, 100); }
int32 UBIZXGameEngine::CombatDamage(int32 Attack, int32 Defense, int32 Damage) const { const int32 Roll = FMath::RandRange(1,20); return Roll + Attack >= Defense ? Damage * (Roll == 20 ? 2 : 1) : 0; }
