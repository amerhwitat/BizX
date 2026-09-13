#pragma once
#include <string>
#include <array>
namespace bizx { struct Wallet { std::string coin,address; bool watch_only{true}; static constexpr std::array<const char*,11> coins{"BTC","BCH","LTC","DOGE","ETH","ETC","SOL","ADA","XRP","DOT","AVAX"}; }; }
