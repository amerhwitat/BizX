# Containerized version

Build and run the repository container with Docker Compose:

```bash
docker compose build
docker compose up
```

The compose file keeps persistent application data and logs in named volumes. Native source files remain unchanged and the container is an isolated runtime layer.

For interactive diagnostics:

```bash
docker compose run --rm bizx-app bash
```

The image is intentionally non-root. GUI-oriented components should use their existing headless/service or CLI entry points inside the container; native desktop execution remains available outside the container.
