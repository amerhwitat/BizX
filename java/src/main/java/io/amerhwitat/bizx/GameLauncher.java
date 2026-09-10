package io.amerhwitat.bizx;

import io.amerhwitat.bizx.api.BizXApi;

/** Single Java entry point for starting the BizX game/application. */
public final class GameLauncher {
    private GameLauncher() {}

    public static void main(String[] args) {
        BizXApi api = new BizXApi();
        System.out.println("BizX game starting");
        System.out.println(api.health());
    }
}
