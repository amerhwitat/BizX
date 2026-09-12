package bizx.mobile

data class GameEntry(val id: String, val title: String, val dimensions: String, val assetPack: String)
data class PeerPresence(val peerId: String, val displayName: String, val connected: Boolean, val lastSeenEpochMs: Long, val locationLabel: String? = null)

data class WalletProfile(val providerId: String, val addressLabels: List<String>, val backupVersion: Int = 1)

data class SaveSnapshot(val slot: String, val gameId: String, val score: Long, val payloadHash: String, val createdEpochMs: Long)

class GamePlatform {
    private val games = listOf(
        GameEntry("story-2d", "2D Storyboard Adventure", "2D", "open-assets-2d"),
        GameEntry("world-3d", "3D World Builder", "3D", "open-assets-3d"),
        GameEntry("time-4d", "4D Timeline Quest", "4D", "open-assets-4d")
    )
    fun games(): List<GameEntry> = games
    fun save(snapshot: SaveSnapshot) = snapshot
    fun walletSetup(providerId: String, labels: List<String>) = WalletProfile(providerId, labels)
    fun backupManifest(wallet: WalletProfile, snapshots: List<SaveSnapshot>): Map<String, Any> = mapOf("walletProvider" to wallet.providerId, "backupVersion" to wallet.backupVersion, "snapshots" to snapshots)
}
