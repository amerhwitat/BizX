package io.amerhwitat.bizx;

import io.amerhwitat.bizx.wallet.WalletProvider;
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

class WalletProviderTest {
    @Test void forwardsRequest() {
        WalletProvider wallet = new WalletProvider(r -> r.method().equals("eth_chainId") ? "0x1" : null);
        assertEquals("0x1", wallet.request("eth_chainId", List.of()));
    }
}
