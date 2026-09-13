package io.amerhwitat.bizx.mobile

import io.amerhwitat.bizx.unified.UnifiedBizXRuntime

/** Android/mobile entry facade; UI and renderer adapters are platform-owned. */
object BizXMobileApp {
    val runtime = UnifiedBizXRuntime()
    @JvmStatic fun main(args: Array<String>) {
        println(runtime.health())
    }
}
