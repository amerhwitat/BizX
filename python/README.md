# BizX Python

Python 3.10+ implementation of BizX business services and integration boundaries.

## Test

```bash
python -m unittest discover -s tests
```

## Package layout

- `bizx/core` — core health/runtime model
- `bizx/wallet` — wallet provider / JSON-RPC boundary
- `bizx/catalog` — catalog service
- `bizx/payments` — payment lifecycle model
- `bizx/api` — API boundary
- `bizx/cli` — command-line entry point
- `tests` — standard-library unit tests

Python source is isolated under this directory and does not mix with Node.js, browser JavaScript, TypeScript, Java, or native source.
