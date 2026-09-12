#include "BizXWorldData.h"

int32 UBizXWorldData::FindObjectIndex(const FString& ObjectId) const
{
    for (int32 Index = 0; Index < Objects.Num(); ++Index)
    {
        if (Objects[Index].Id == ObjectId)
            return Index;
    }
    return INDEX_NONE;
}
