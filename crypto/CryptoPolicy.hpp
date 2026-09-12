#pragma once
#include "CryptoTypes.hpp"
#include <string>

namespace bizx::crypto {

struct CryptoPolicy {
    bool allow_live_networks{false};
    bool allow_external_signers{true};
    bool allow_buy_sell{false};
    bool allow_swap{false};
    bool allow_sweep_plans{true};

    bool permits(IntentKind kind) const {
        switch (kind) {
            case IntentKind::Balance:
            case IntentKind::Receive: return true;
            case IntentKind::Send: return allow_live_networks && allow_external_signers;
            case IntentKind::Buy:
            case IntentKind::Sell: return allow_live_networks && allow_buy_sell;
            case IntentKind::Swap:
            case IntentKind::Exchange: return allow_live_networks && allow_swap;
            case IntentKind::SweepPlan: return allow_sweep_plans;
        }
        return false;
    }
};

} // namespace bizx::crypto
