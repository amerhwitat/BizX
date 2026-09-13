package io.amerhwitat.emailsender

data class RelayPolicy(val authorized: Boolean = true, val openRelay: Boolean = false, val spoofFrom: Boolean = false, val privacyMode: Boolean = false) {
    fun validate() {
        require(!openRelay && !spoofFrom) { "Open relays and From spoofing are disabled" }
        require(authorized) { "Relay authorization is required" }
    }
}
