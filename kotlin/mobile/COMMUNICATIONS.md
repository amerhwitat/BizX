# BizX Mobile Communications

The Kotlin mobile app now defines a shared conversation model for authenticated text synchronization and device media capability detection. Voice/video transport is designed around WebRTC; the Android dependency is `io.github.webrtc-sdk:android:150.7871.01`. Chat events carry conversation ID, sender ID, monotonic sequence and SHA-256 payload integrity. Runtime camera and microphone access must be requested only when the user starts the relevant feature.

BizX is the primary business application integration target. Conversation state is intentionally transport-neutral so it can synchronize with the existing authenticated Chimera P2P boundary.

Build from the portfolio builder in ChimeraIIOS/tools/mobile or run Gradle from this directory.
