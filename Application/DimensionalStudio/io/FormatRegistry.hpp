#pragma once
#include <string>
#include <vector>

namespace ds::io {
struct FormatInfo {
    std::string extension;
    std::string mime;
    bool importable{false};
    bool exportable{false};
    bool animation{false};
    bool materials{false};
    bool openStandard{false};
};

inline const std::vector<FormatInfo>& formats() {
    static const std::vector<FormatInfo> table = {
        {"d4s","application/json",true,true,true,true,true},
        {"gltf","model/gltf+json",true,true,true,true,true},
        {"glb","model/gltf-binary",true,true,true,true,true},
        {"usd","model/vnd.usd",true,true,true,true,true},
        {"usda","model/vnd.usd",true,true,true,true,true},
        {"usdc","model/vnd.usd",true,true,true,true,true},
        {"usdz","model/vnd.usdz+zip",true,true,true,true,true},
        {"obj","model/obj",true,true,false,true,true},
        {"stl","model/stl",true,true,false,false,true},
        {"ply","application/x-ply",true,true,false,true,true},
        {"abc","application/alembic",true,true,true,true,true},
        {"bvh","application/bvh",true,true,true,false,true},
        {"dae","model/vnd.collada+xml",true,true,true,true,true},
        {"fbx","application/octet-stream",true,true,true,true,false},
        {"svg","image/svg+xml",true,true,false,false,true},
        {"png","image/png",true,true,false,false,true},
        {"jpg","image/jpeg",true,true,false,false,true},
        {"jpeg","image/jpeg",true,true,false,false,true},
        {"exr","image/x-exr",true,true,false,true,true},
        {"webp","image/webp",true,true,false,true,true},
        {"mp4","video/mp4",true,true,true,false,true},
        {"webm","video/webm",true,true,true,false,true}
    };
    return table;
}
}
