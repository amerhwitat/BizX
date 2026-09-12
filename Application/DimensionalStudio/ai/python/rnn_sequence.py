from __future__ import annotations
from dataclasses import dataclass
import numpy as np

@dataclass
class RNNConfig:
    input_size: int = 128
    hidden_size: int = 128
    output_size: int = 128

class SequenceRNN:
    """Small NumPy reference RNN boundary used for deterministic prototypes.

    Production models can be exported/imported through ONNX without coupling the
    application to a single ML framework.
    """
    def __init__(self, config: RNNConfig = RNNConfig(), seed: int = 7):
        rng = np.random.default_rng(seed)
        self.cfg = config
        self.wx = rng.normal(0, 0.02, (config.hidden_size, config.input_size))
        self.wh = rng.normal(0, 0.02, (config.hidden_size, config.hidden_size))
        self.wo = rng.normal(0, 0.02, (config.output_size, config.hidden_size))

    def forward(self, sequence: np.ndarray) -> np.ndarray:
        x = np.asarray(sequence, dtype=np.float32)
        h = np.zeros(self.cfg.hidden_size, dtype=np.float32)
        for item in x:
            h = np.tanh(self.wx @ item + self.wh @ h)
        return self.wo @ h
