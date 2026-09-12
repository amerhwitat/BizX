#include <iostream>

namespace ds::desktop {

int runViewer() {
    // Rendering context creation is intentionally isolated from the scene core.
    // Platform frontends can provide GLFW/SDL/Qt context creation without
    // changing geometry, animation, or file-format code.
    std::cout << "Dimensional Studio OpenGL viewer foundation\n";
    return 0;
}

}
