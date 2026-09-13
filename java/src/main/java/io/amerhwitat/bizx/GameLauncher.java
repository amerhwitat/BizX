package io.amerhwitat.bizx;

/** Single Java entry point for the unified BizX application/game runtime. */
public final class GameLauncher {
    private GameLauncher() {}
    public static void main(String[] args) {
        String mode = args.length == 0 ? "default" : args[0];
        var runtime = new UnifiedBizXRuntime();
        var session = runtime.startGame(mode);
        System.out.printf("BizX Java game starting (%s)%n", session.mode());
    }
}
