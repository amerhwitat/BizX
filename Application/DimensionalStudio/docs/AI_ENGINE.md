# Local RNN / ONNX Learning Engine

The AI layer learns patterns from user-authorized scene features rather than silently uploading source assets.

## Feature sources

- polygon/NURBS topology and geometry statistics
- texture/color/material statistics
- world-map and terrain descriptors
- FK/IK animation curves
- motion-graphics timelines
- camera/object tracking trajectories
- 128D multidimensional metadata

## Pipeline

`asset -> feature extractor -> sequence window -> RNN/sequence model -> embedding/prediction -> similarity/recommendation`

The reference implementation is deterministic NumPy code for prototyping. Production models can be trained with the user's selected framework and exported to ONNX. Native and browser inference use an ONNX boundary so the same model can be deployed across C++, Python/Java services and the browser.

Training is explicit and local-first. Dataset manifests should contain source checksums, feature schema, model version, license/provenance and user consent state.
