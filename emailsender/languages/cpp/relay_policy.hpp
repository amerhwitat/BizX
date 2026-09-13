#pragma once
#include <stdexcept>

namespace bizx::emailsender {
struct RelayPolicy {
    bool authorized{true}; bool openRelay{false}; bool spoofFrom{false}; bool privacyMode{false};
    void validate() const {
        if (openRelay || spoofFrom) throw std::runtime_error("open relays and From spoofing are disabled");
        if (!authorized) throw std::runtime_error("relay authorization is required");
    }
};
}
