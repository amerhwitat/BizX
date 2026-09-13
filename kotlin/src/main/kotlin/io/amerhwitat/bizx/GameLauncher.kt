package io.amerhwitat.bizx

object GameLauncher {
    @JvmStatic fun main(args: Array<String>) {
        val mode = args.firstOrNull() ?: "default"
        val session = UnifiedBizXRuntime().startGame(mode)
        println("BizX Kotlin game starting (${session.mode})")
    }
}
