# Mobile, launcher, saves and P2P

BizX now has Kotlin Multiplatform and Flutter mobile boundaries. Flutter's official Casual Games Toolkit provides open-source multiplatform 2D templates, while Flame supplies a modular Flutter game engine for mobile, desktop and web. Kotlin Multiplatform supports shared Android/iOS logic and Compose Multiplatform UI.

The mobile starting menu selects 2D/3D/4D games, wallet setup, backups, snapshots, saved progress, hall of fame and peer presence. Wallet backups are manifests/hooks only: private keys and recovery phrases must remain in platform secure storage or a user-controlled wallet provider and must never enter logs, screenshots, save files or P2P traffic.

Peer browsing/presence is opt-in and privacy-preserving. The application does not persist raw IP addresses or infer exact locations for display. Optional coarse self-selected region labels may be shared. Connection state can be shown while the app is running.

SDK bootstrap scripts: `mobile/scripts/setup-mobile.ps1` and `.sh`.

References:
- Flutter Games: https://flutter.dev/games
- Flutter Games Toolkit: https://docs.flutter.dev/resources/games-toolkit
- Flame: https://github.com/flame-engine/flame
- Kotlin Multiplatform: https://kotlinlang.org/docs/multiplatform.html
- Android KMP guidance: https://developer.android.com/kotlin/multiplatform
