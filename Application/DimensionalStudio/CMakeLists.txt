cmake_minimum_required(VERSION 3.20)
project(DimensionalStudio VERSION 0.1.0 LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_library(ds_core STATIC
  core/geometry/nurbs/NurbsCurve.cpp
)
target_include_directories(ds_core PUBLIC core/include)

add_executable(ds_smoke tools/smoke.cpp)
target_link_libraries(ds_smoke PRIVATE ds_core)
target_include_directories(ds_smoke PRIVATE core/include)

option(DS_BUILD_OPENGL "Build native OpenGL viewer" OFF)
if(DS_BUILD_OPENGL)
  add_subdirectory(desktop/cpp)
endif()
