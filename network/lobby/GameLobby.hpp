#pragma once
#include <algorithm>
#include <cstdint>
#include <deque>
#include <string>
#include <vector>

namespace bizx::network {

enum class PlayerState { Queued, Invited, Ready, Playing, Disconnected, Eliminated };

enum class ChannelKind { Game, Chat, Voice };

struct LobbyPlayer {
  std::string player_id;
  std::string display_name;
  int priority = 0;
  PlayerState state = PlayerState::Queued;
  std::uint64_t joined_at = 0;
};

struct LobbyConfig {
  std::string game_id;
  std::size_t seats = 2;
  bool allow_voice = true;
  bool allow_chat = true;
  std::uint32_t disconnect_timeout_seconds = 15;
};

class GameLobby {
 public:
  explicit GameLobby(LobbyConfig config) : config_(std::move(config)) {}

  void invite(LobbyPlayer player) { player.state = PlayerState::Invited; players_.push_back(std::move(player)); }
  void enqueue(LobbyPlayer player) { player.state = PlayerState::Queued; queue_.push_back(std::move(player)); }

  void set_priority(const std::string& player_id, int priority) {
    for (auto& p : queue_) if (p.player_id == player_id) p.priority = priority;
    std::stable_sort(queue_.begin(), queue_.end(), [](const auto& a, const auto& b) { return a.priority > b.priority; });
  }

  bool admit_next() {
    if (active_count() >= config_.seats || queue_.empty()) return false;
    auto p = queue_.front(); queue_.pop_front(); p.state = PlayerState::Playing; players_.push_back(std::move(p)); return true;
  }

  bool mark_disconnected(const std::string& player_id) {
    for (auto& p : players_) if (p.player_id == player_id && p.state == PlayerState::Playing) { p.state = PlayerState::Disconnected; return true; }
    return false;
  }

  bool forfeit_disconnected(const std::string& player_id) {
    for (auto& p : players_) if (p.player_id == player_id && p.state == PlayerState::Disconnected) { p.state = PlayerState::Eliminated; return true; }
    return false;
  }

  void start_next_round() {
    for (auto& p : players_) if (p.state == PlayerState::Eliminated || p.state == PlayerState::Disconnected) p.state = PlayerState::Queued;
    players_.erase(std::remove_if(players_.begin(), players_.end(), [](const auto& p) { return p.state == PlayerState::Queued; }), players_.end());
    while (active_count() < config_.seats && !queue_.empty()) admit_next();
  }

  std::size_t active_count() const {
    return static_cast<std::size_t>(std::count_if(players_.begin(), players_.end(), [](const auto& p) { return p.state == PlayerState::Playing || p.state == PlayerState::Ready; }));
  }
  const std::vector<LobbyPlayer>& players() const { return players_; }
  const std::deque<LobbyPlayer>& queue() const { return queue_; }
  const LobbyConfig& config() const { return config_; }

 private:
  LobbyConfig config_;
  std::vector<LobbyPlayer> players_;
  std::deque<LobbyPlayer> queue_;
};

} // namespace bizx::network
