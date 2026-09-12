#pragma once
#include <array>
#include <cstddef>
#include <numeric>

namespace ds {

struct DimensionTensor128 {
    std::array<double, 128> value{};

    double &operator[](std::size_t i) { return value.at(i); }
    const double &operator[](std::size_t i) const { return value.at(i); }

    double dot(const DimensionTensor128 &other) const {
        return std::inner_product(value.begin(), value.end(), other.value.begin(), 0.0);
    }
};

// Eight domains x sixteen axes. Axes are computational/modeling features,
// not assumptions that all dimensions are physical spatial coordinates.
enum class Domain : std::size_t {
    Geometry = 0,
    Temporal = 1,
    Perspective = 2,
    EnergyLight = 3,
    Events = 4,
    ObjectsMaterials = 5,
    Information = 6,
    Cognition = 7
};

constexpr std::size_t domainOffset(Domain d) {
    return static_cast<std::size_t>(d) * 16;
}

}
