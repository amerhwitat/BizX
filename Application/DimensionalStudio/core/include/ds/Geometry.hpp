#pragma once
#include <array>
#include <vector>

namespace ds {

struct Vec3 { double x{}, y{}, z{}; };
struct Vec2 { double x{}, y{}; };

struct PolygonMesh {
    std::vector<Vec3> vertices;
    std::vector<std::array<unsigned int, 3>> triangles;
};

struct NurbsCurve {
    int degree{3};
    std::vector<Vec3> controlPoints;
    std::vector<double> knots;
    std::vector<double> weights;

    Vec3 evaluate(double u) const;
};

struct NurbsSurface {
    int degreeU{3};
    int degreeV{3};
    std::vector<Vec3> controlPoints;
    std::vector<double> weights;
    std::vector<double> knotsU;
    std::vector<double> knotsV;
};

}
