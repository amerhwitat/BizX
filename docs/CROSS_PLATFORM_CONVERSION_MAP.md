# BizX Cross-Platform Conversion Map

The unified implementations expose equivalent feature contracts across Java, Kotlin/mobile, Apple/mobile and Web. Source-specific engines remain intact; conversion targets provide native adapters and a common runtime surface.

| Source family | Java | Kotlin/mobile | Apple/mobile | Web |
|---|---|---|---|---|
| game | unified runtime | shared Kotlin runtime | Swift runtime | browser runtime |
| NetworkUnified/network | JVM networking | Kotlin networking | URLSession/network adapters | Fetch/WebSocket |
| launcher | GameLauncher | Kotlin main/activity | Swift app entry | web bootstrap |
| InternetScanner | authorization boundary | authorization boundary | authorization boundary | browser-limited diagnostics |
| AssetBrowser | HTTPS | HTTPS | URLSession | fetch |
| crypto | JCA | Kotlin/JCA | CryptoKit boundary | Web Crypto |
| 3D/rendering | renderer-neutral | mobile renderer adapter | Metal-ready adapter | WebGL/WebGPU adapter |
| game-assets/store | catalog contracts | shared models | Swift models | JSON/IndexedDB-compatible models |
| scripts | command descriptors | command descriptors | command descriptors | web task descriptors |

Security and licensing policies remain shared across all targets.
