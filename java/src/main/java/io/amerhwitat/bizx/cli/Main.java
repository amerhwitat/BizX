package io.amerhwitat.bizx.cli;

import io.amerhwitat.bizx.core.BizXCore;

public final class Main {
    private Main() {}
    public static void main(String[] args) { System.out.println(new BizXCore().health()); }
}
