package io.amerhwitat.emailsender;

public record RelayPolicy(boolean authorized, boolean openRelay, boolean spoofFrom, boolean privacyMode) {
    public void validate() {
        if (openRelay || spoofFrom) throw new IllegalArgumentException("open relays and From spoofing are disabled");
        if (!authorized) throw new IllegalArgumentException("relay authorization is required");
    }
}
