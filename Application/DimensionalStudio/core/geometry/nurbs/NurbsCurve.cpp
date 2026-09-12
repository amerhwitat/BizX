#include "ds/Geometry.hpp"
#include <algorithm>
#include <cmath>

namespace ds {

static double basis(int i, int p, double u, const std::vector<double>& knots) {
    if (p == 0) {
        const bool inSpan = (u >= knots.at(i) && u < knots.at(i + 1));
        const bool last = (u == knots.back() && i + 2 == static_cast<int>(knots.size()));
        return (inSpan || last) ? 1.0 : 0.0;
    }
    double left = 0.0, right = 0.0;
    const double d1 = knots.at(i + p) - knots.at(i);
    const double d2 = knots.at(i + p + 1) - knots.at(i + 1);
    if (d1 > 0.0) left = (u - knots.at(i)) / d1 * basis(i, p - 1, u, knots);
    if (d2 > 0.0) right = (knots.at(i + p + 1) - u) / d2 * basis(i + 1, p - 1, u, knots);
    return left + right;
}

Vec3 NurbsCurve::evaluate(double u) const {
    if (controlPoints.empty() || knots.size() < controlPoints.size() + degree + 1)
        return {};
    const bool weighted = weights.size() == controlPoints.size();
    Vec3 numerator{};
    double denominator = 0.0;
    for (std::size_t i = 0; i < controlPoints.size(); ++i) {
        const double w = weighted ? weights[i] : 1.0;
        const double b = basis(static_cast<int>(i), degree, u, knots) * w;
        numerator.x += controlPoints[i].x * b;
        numerator.y += controlPoints[i].y * b;
        numerator.z += controlPoints[i].z * b;
        denominator += b;
    }
    if (std::abs(denominator) < 1e-12) return {};
    return {numerator.x / denominator, numerator.y / denominator, numerator.z / denominator};
}

}
