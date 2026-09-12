# Multidimensional Framework Integration

Dimensional Studio uses the Library-derived 128D model as a computational scene-description and learning layer.

## Domains

| Domain | Axes | Application role |
|---|---:|---|
| Physical Geometry | D1-D16 | coordinates, topology, curvature, mesh fidelity, local frames |
| Temporal Dynamics | D17-D32 | time, causality, sampling, memory horizon, temporal entropy |
| Perspective / Observer | D33-D48 | viewpoint, attention, bias, field of view, trust/calibration |
| Energy / Light | D49-D64 | spectrum, intensity, reflectance, emission, scattering |
| Events | D65-D80 | interactions, collision state, event duration, causal depth |
| Objects / Materials | D81-D96 | structure, material, roughness, composition, semantics |
| Information | D97-D112 | entropy, compression, confidence, uncertainty, information flow |
| Cognition / Semantics | D113-D128 | embeddings, attention, memory, abstraction, meaning |

The source material also describes D1-D4 as geometry/time, D5 as the perspective fork, D6-D8 as physical dynamics/material/events/objects, and higher ranges as information, cognition, collective and meta-modeling layers. Dimensional Studio treats these as modeling/compute axes rather than asserting that every axis is a physical dimension.

## Scene use

Each scene object may carry a 128-component feature tensor. Geometry and animation remain explicit structured data; tensor features are an additional projection used for search, similarity, visualization and learning.

A perspective projection can be represented as a learned weighting vector `W` and a selected axis set `S`, producing a view feature such as `perceived = sum(W[S] * T[S])`. This is a modeling operation for the application, not a claim about fundamental physics.
