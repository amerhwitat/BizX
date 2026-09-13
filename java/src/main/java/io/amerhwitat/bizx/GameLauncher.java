package io.amerhwitat.bizx;

import io.amerhwitat.bizx.api.BizXApi;
import io.amerhwitat.bizx.game.TycoonGame;

/** Single Java entry point for starting BizX or its Tycoon mode. */
public final class GameLauncher {
    private GameLauncher() {}
    public static void main(String[] args) {
        BizXApi api = new BizXApi();
        System.out.println("BizX game starting");
        System.out.println(api.health());
        if (args.length > 0 && "tycoon".equalsIgnoreCase(args[0])) {
            TycoonGame game = new TycoonGame(10_000);
            System.out.println("BizX Tycoon ready: cash=" + game.cash());
        }
    }
}
