# Linux Commands Source Integration

This repository follows the Chimera II OS Linux-command integration profile.

Reference upstream families include GNU Coreutils, util-linux, iproute2/net-tools, sudo, POSIX shells, and Toybox. Upstream source is referenced or vendored only with its original license/SPDX metadata preserved; Chimera-specific behavior is implemented through adapters.

Performance policy: use bounded parallelism, asynchronous I/O, batching, and zero-copy paths only where semantics remain unchanged. Provide deterministic single-threaded fallbacks.

Chimera has two integration targets: native standalone userland and Aurora Web UI command/terminal interfaces. The canonical registry and acquisition workflow are maintained in `amerhwitat/ChimeraIIOS`.
