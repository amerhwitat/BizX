# BizX AI Disciplines

BizX now exposes a common AI application layer covering ML, DL, RL, Symbolic AI, Computer Vision and NLP.

The subsystem is intentionally framework-neutral. Python integrations can use scikit-learn, PyTorch/TensorFlow/JAX, Gymnasium/Stable-Baselines3, SymPy, OpenCV/scikit-image and spaCy/Transformers. The application contract stores discipline, task, data kind, model/provider, metrics and provenance.

Cloud execution can be routed through the existing DevOps/IaC interfaces; model execution is never treated as permission to mutate infrastructure.
