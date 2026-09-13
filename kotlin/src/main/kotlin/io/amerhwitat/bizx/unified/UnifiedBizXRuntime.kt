package io.amerhwitat.bizx.unified

import java.net.InetAddress
import java.security.MessageDigest

data class Vec3(val x: Double, val y: Double, val z: Double)
data class NetworkResult(val target: String, val allowed: Boolean, val classification: String)

/** Shared Kotlin/JVM + Android feature facade. */
class UnifiedBizXRuntime {
    val modules = listOf("game","network","network_unified","launcher","internet_scanner","asset_browser","crypto","web","3d","game_assets","game_store","rendering","scripts")
    fun health() = mapOf("status" to "ok", "implementation" to "kotlin", "modules" to modules)
    fun project(p: Vec3, width: Double = 800.0, height: Double = 600.0, cameraZ: Double = 5.0): Vec3 {
        val z = p.z - cameraZ
        require(z < 0) { "point is behind camera" }
        val s = 1.0 / -z
        return Vec3(width/2 + p.x*s*width/2, height/2 - p.y*s*height/2, -z)
    }
    fun authorize(host: String, publicAllowlist: Set<String> = emptySet()): NetworkResult {
        val ip = InetAddress.getByName(host)
        val local = ip.isAnyLocalAddress || ip.isLoopbackAddress || ip.isLinkLocalAddress || ip.isSiteLocalAddress
        return NetworkResult(host, local || publicAllowlist.contains(ip.hostAddress), if (local) "local/intranet" else "public")
    }
    fun sha256(data: ByteArray) = MessageDigest.getInstance("SHA-256").digest(data)
    fun cryptoIntent(provider: String, currency: String, amountMinor: Long): String {
        require(provider.isNotBlank()); require(amountMinor >= 0)
        return "$provider:$currency:$amountMinor:UNSIGNED"
    }
}
