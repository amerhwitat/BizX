#pragma once
#include "CoreMinimal.h"
#include "GenreGameSystems.generated.h"

USTRUCT(BlueprintType)
struct FBizXVehicleState { GENERATED_BODY() UPROPERTY(EditAnywhere, BlueprintReadWrite) float Speed=0, Grip=1, Fuel=100, Durability=100, Heat=0; };
USTRUCT(BlueprintType)
struct FBizXFighterState { GENERATED_BODY() UPROPERTY(EditAnywhere, BlueprintReadWrite) int32 Health=100, Frame=0, Combo=0; UPROPERTY(EditAnywhere, BlueprintReadWrite) float Stamina=100, Meter=0; };

UCLASS(BlueprintType)
class BIZXUNREAL_API UGenreGameSystems : public UObject {
    GENERATED_BODY()
public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite) FBizXVehicleState Vehicle;
    UPROPERTY(EditAnywhere, BlueprintReadWrite) FBizXFighterState Fighter;
    UPROPERTY(EditAnywhere, BlueprintReadWrite) int32 Wanted=0;
    UFUNCTION(BlueprintCallable) void Drive(float Throttle, float Brake, float Steering, float Dt=1.f/60.f);
    UFUNCTION(BlueprintCallable) void SetWanted(int32 Delta);
    UFUNCTION(BlueprintCallable) int32 Attack(FName Action, bool Blocked=false);
};
