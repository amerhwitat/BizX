#pragma once
#include "CoreMinimal.h"
#include "BizXGameEngine.generated.h"

USTRUCT(BlueprintType)
struct FBizXGameState {
    GENERATED_BODY()
    UPROPERTY(BlueprintReadWrite) FString Scene = TEXT("prologue.ledger");
    UPROPERTY(BlueprintReadWrite) int32 HP = 100;
    UPROPERTY(BlueprintReadWrite) int32 XP = 0;
    UPROPERTY(BlueprintReadWrite) int32 Credits = 500;
    UPROPERTY(BlueprintReadWrite) TMap<FString,int32> Inventory;
    UPROPERTY(BlueprintReadWrite) TSet<FString> Flags;
    UPROPERTY(BlueprintReadWrite) TMap<FString,int32> FactionRep;
    UPROPERTY(BlueprintReadWrite) TMap<FString,FString> Quests;
};

UCLASS(Blueprintable)
class BIZXUNREAL_API UBIZXGameEngine : public UObject {
    GENERATED_BODY()
public:
    UPROPERTY(BlueprintReadWrite) FBizXGameState State;
    UFUNCTION(BlueprintCallable) void GrantItem(const FString& Item, int32 Count = 1);
    UFUNCTION(BlueprintCallable) void ChooseScene(const FString& Scene, int32 CreditsDelta = 0, int32 XPDelta = 0, const FString& Flag = TEXT(""), const FString& Quest = TEXT(""));
    UFUNCTION(BlueprintCallable) void AdjustFaction(const FString& Faction, int32 Delta);
    UFUNCTION(BlueprintCallable) int32 CombatDamage(int32 Attack, int32 Defense, int32 Damage) const;
};
