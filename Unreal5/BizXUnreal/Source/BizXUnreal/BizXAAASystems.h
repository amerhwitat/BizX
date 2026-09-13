#pragma once
#include "CoreMinimal.h"
#include "BizXAAASystems.generated.h"

USTRUCT(BlueprintType) struct FBizXWorldCell { GENERATED_BODY() UPROPERTY(BlueprintReadWrite) FString Id; UPROPERTY(BlueprintReadWrite) int64 Seed=1; UPROPERTY(BlueprintReadWrite) FString Biome="plains"; UPROPERTY(BlueprintReadWrite) int32 Population=0; UPROPERTY(BlueprintReadWrite) FString Weather="clear"; UPROPERTY(BlueprintReadWrite) bool Loaded=false; };
USTRUCT(BlueprintType) struct FBizXNPCState { GENERATED_BODY() UPROPERTY(BlueprintReadWrite) FString Id; UPROPERTY(BlueprintReadWrite) FString Faction; UPROPERTY(BlueprintReadWrite) float Food=1.f; UPROPERTY(BlueprintReadWrite) float Rest=1.f; UPROPERTY(BlueprintReadWrite) float Safety=1.f; UPROPERTY(BlueprintReadWrite) FString State="idle"; };

UCLASS(BlueprintType) class BIZXUNREAL_API UBizXAAASystems : public UObject {
 GENERATED_BODY()
 public:
 UPROPERTY(BlueprintReadOnly) int64 Tick=0; UPROPERTY(BlueprintReadWrite) TArray<FBizXWorldCell> Cells; UPROPERTY(BlueprintReadWrite) TArray<FBizXNPCState> NPCs; UPROPERTY(BlueprintReadWrite) TMap<FString,float> Prices; UPROPERTY(BlueprintReadWrite) TArray<FString> ActiveEvents;
 UFUNCTION(BlueprintCallable) void TickOnce();
 UFUNCTION(BlueprintCallable) float Market(const FString& Good,float Supply,float Demand);
 UFUNCTION(BlueprintCallable) int32 ResolveAbility(int32 BaseDamage,int32 Defense,int32 Roll) const;
 UFUNCTION(BlueprintCallable) void TriggerWorldEvent(const FString& EventId);
};
