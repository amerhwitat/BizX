#pragma once

#include <string>

namespace bizx::rendering {
struct AssetSource {
    std::string url;
    std::string license;
    std::string attribution;
    std::string format;
    std::string sha256;
    bool allows_download{false};
    bool allows_reuse{false};

    bool importable() const { return allows_download && allows_reuse && !url.empty(); }
};
}
