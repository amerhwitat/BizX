package io.amerhwitat.dimensionalstudio;

import java.util.Arrays;

public final class Scene {
    private final double[] tensor128 = new double[128];
    private double time;

    public double getTime() { return time; }
    public void setTime(double value) { time = value; }
    public double[] tensor128() { return Arrays.copyOf(tensor128, tensor128.length); }
    public void setTensor128(double[] values) {
        if (values.length != 128) throw new IllegalArgumentException("tensor must contain 128 values");
        System.arraycopy(values, 0, tensor128, 0, 128);
    }
}
