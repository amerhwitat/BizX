#pragma once
#include <cstdint>
#include <string>
#include <vector>

namespace bizx::crypto {

enum class NetworkKind { Utxo, Evm, Solana, Ton, Other };
enum class IntentKind { Balance, Receive, Send, Buy, Sell, Swap, Exchange, SweepPlan };

struct CoinDescriptor {
    std::string chain_id;
    std::string asset_id;
    std::string symbol;
    std::string name;
    uint32_t decimals{0};
    NetworkKind network{NetworkKind::Other};
    bool supports_send{false};
    bool supports_receive{false};
    bool supports_swap{false};
    bool supports_balance{true};
};

struct WalletAccount {
    std::string chain_id;
    std::string address;
    bool watch_only{true};
};

struct Balance {
    CoinDescriptor coin;
    std::string raw_amount;
    std::string display_amount;
    std::string fiat_value;
};

struct TransactionIntent {
    IntentKind kind{IntentKind::Balance};
    std::string chain_id;
    std::string asset_id;
    std::string from;
    std::string to;
    std::string amount;
    std::string memo;
    std::string quote_id;
    bool requires_user_confirmation{true};
};

class IChainAdapter {
public:
    virtual ~IChainAdapter() = default;
    virtual const char* chain_id() const = 0;
    virtual std::vector<Balance> balances(const WalletAccount&) = 0;
    virtual std::string receive_address(const WalletAccount&) = 0;
    virtual TransactionIntent build_send(const WalletAccount&, const std::string&, const std::string&, const std::string&) = 0;
};

class ICryptoGateway {
public:
    virtual ~ICryptoGateway() = default;
    virtual std::vector<CoinDescriptor> discover_assets() const = 0;
    virtual std::vector<Balance> scan_balances(const WalletAccount&) = 0;
    virtual TransactionIntent quote_swap(const std::string&, const std::string&, const std::string&) = 0;
    virtual TransactionIntent build_sweep_plan(const WalletAccount&) = 0;
};

} // namespace bizx::crypto
