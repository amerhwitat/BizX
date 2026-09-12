#pragma once

#include "CoreMinimal.h"
#include "UObject/Object.h"
#include "BizXWorldData.generated.h"

USTRUCT(BlueprintType)
struct FBizXWorldObject
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite) FString Id;
    UPROPERTY(EditAnywhere, BlueprintReadWrite) FVector Location = FVector::ZeroVector;
    UPROPERTY(EditAnywhere, BlueprintReadWrite) FRotator Rotation = FRotator::ZeroRotator;
    UPROPERTY(EditAnywhere, BlueprintReadWrite) FVector Scale = FVector::OneVector;
    UPROPERTY(EditAnywhere, BlueprintReadWrite) FString MetadataJson;
};

UCLASS(BlueprintType)
class BIZXUNREAL_API UBizXWorldData : public UObject
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite) TArray<FBizXWorldObject> Objects;

    UFUNCTION(BlueprintCallable)
    int32 FindObjectIndex(const FString& ObjectId) const;
};
