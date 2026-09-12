#pragma once
#include <array>
#include <cmath>
#include <string>
#include <vector>

namespace ds::color {
struct RGB { double r{}, g{}, b{}; };
struct HSV { double h{}, s{}, v{}; };

inline HSV rgbToHsv(RGB c) {
    const double mx = std::max({c.r,c.g,c.b});
    const double mn = std::min({c.r,c.g,c.b});
    const double d = mx - mn;
    HSV out{0.0, mx == 0.0 ? 0.0 : d / mx, mx};
    if (d == 0.0) return out;
    if (mx == c.r) out.h = 60.0 * std::fmod((c.g-c.b)/d, 6.0);
    else if (mx == c.g) out.h = 60.0 * ((c.b-c.r)/d + 2.0);
    else out.h = 60.0 * ((c.r-c.g)/d + 4.0);
    if (out.h < 0.0) out.h += 360.0;
    return out;
}

inline RGB hsvToRgb(HSV c) {
    const double C = c.v * c.s;
    const double X = C * (1.0 - std::abs(std::fmod(c.h / 60.0, 2.0) - 1.0));
    const double m = c.v - C;
    RGB p{};
    if (c.h < 60) p={C,X,0}; else if(c.h<120) p={X,C,0};
    else if(c.h<180) p={0,C,X}; else if(c.h<240) p={0,X,C};
    else if(c.h<300) p={X,0,C}; else p={C,0,X};
    return {p.r+m,p.g+m,p.b+m};
}

inline std::vector<HSV> harmony(HSV base, const std::string& relation) {
    std::vector<double> offsets;
    if (relation == "complementary") offsets={0,180};
    else if (relation == "analogous") offsets={-30,0,30};
    else if (relation == "triadic") offsets={0,120,240};
    else if (relation == "tetradic") offsets={0,90,180,270};
    else offsets={0};
    std::vector<HSV> out;
    for (double d: offsets) { HSV c=base; c.h=std::fmod(base.h+d+3600.0,360.0); out.push_back(c); }
    return out;
}
}
