#include "GenreGameSystems.h"
#include "Math/UnrealMathUtility.h"

void UGenreGameSystems::Drive(float Throttle, float Brake, float Steering, float Dt) {
    Throttle=FMath::Clamp(Throttle,0.f,1.f); Brake=FMath::Clamp(Brake,0.f,1.f);
    Vehicle.Speed=FMath::Max(0.f,Vehicle.Speed+(Throttle*18.f-Brake*28.f)*Dt);
    Vehicle.Speed*=FMath::Max(0.f,1.f-FMath::Abs(Steering)*(1.f-Vehicle.Grip)*Dt);
    Vehicle.Fuel=FMath::Max(0.f,Vehicle.Fuel-Throttle*.02f);
}
void UGenreGameSystems::SetWanted(int32 Delta){ Wanted=FMath::Clamp(Wanted+Delta,0,5); }
int32 UGenreGameSystems::Attack(FName Action,bool Blocked){
    Fighter.Frame++;
    int32 Damage=0;
    if(Action==TEXT("light")) Damage=6; else if(Action==TEXT("heavy")) Damage=12; else if(Action==TEXT("special")) Damage=20;
    if(Damage>0) Fighter.Meter=FMath::Min(100.f,Fighter.Meter+Damage*.5f);
    const int32 FinalDamage=Blocked?FMath::Max(1,Damage/4):Damage;
    Fighter.Health=FMath::Max(0,Fighter.Health-FinalDamage);
    Fighter.Combo=Blocked?0:(Fighter.Combo+(Damage>0?1:0));
    return FinalDamage;
}
