from __future__ import annotations
import cv2
import numpy as np


def track_points(previous_gray: np.ndarray, current_gray: np.ndarray, points: np.ndarray):
    prev = np.asarray(points, dtype=np.float32).reshape(-1, 1, 2)
    nxt, status, error = cv2.calcOpticalFlowPyrLK(previous_gray, current_gray, prev, None)
    if nxt is None or status is None:
        return np.empty((0, 2), dtype=np.float32), np.empty((0,), dtype=bool), None
    mask = status.reshape(-1).astype(bool)
    return nxt.reshape(-1, 2), mask, error.reshape(-1)
