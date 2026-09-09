# Performance & Concurrency Policy

Use bounded concurrency for independent I/O and background work; isolate shared state, cap workers, avoid oversubscription, and retain deterministic test execution. Benchmark real workloads before changing concurrency defaults.
