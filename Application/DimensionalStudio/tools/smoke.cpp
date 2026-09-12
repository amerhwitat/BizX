#include "ds/Geometry.hpp"
#include "ds/DimensionTensor.hpp"
#include "ds/color/ColorWheel.hpp"
#include <cassert>
#include <iostream>

int main() {
    ds::DimensionTensor128 tensor;
    tensor[0] = 1.0;
    tensor[1] = 2.0;
    assert(tensor.value.size() == 128);

    ds::NurbsCurve curve;
    curve.degree = 1;
    curve.controlPoints = {{0,0,0},{1,0,0}};
    curve.knots = {0,0,1,1};
    auto p = curve.evaluate(0.5);
    assert(p.x > 0.49 && p.x < 0.51);

    auto hsv = ds::color::rgbToHsv({1,0,0});
    assert(hsv.h >= 0 && hsv.h < 360);
    std::cout << "Dimensional Studio smoke test passed\n";
}
