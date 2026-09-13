#pragma once
#include <cstdint>
#include <string>
#include <unordered_map>
namespace bizx {
class ChessStrategy {
    std::uint64_t turn_{};
    std::unordered_map<std::string,std::int64_t> resources_{{"gold",100},{"food",100},{"science",0}};
public:
    std::uint64_t tick(const std::string& r, std::int64_t amount) { resources_[r] += amount; return ++turn_; }
    std::string uci(const std::string& fen, const std::string& command="go movetime 100") const { return "UCI|"+fen+"|"+command+"|external-engine"; }
    std::uint64_t turn() const { return turn_; }
};
}
