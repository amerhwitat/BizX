# Three.js BizXtreme Integration

BizXtreme now has a browser-first Three.js companion implementation in the BizXtreme repository. The implementation mirrors the shared game vocabulary: original gameplay remains primary, with missions, events, inventory, marketplace and wallet features as supporting systems.

The Three.js client uses ES modules and Vite. WebGL is the compatibility baseline; WebGPU can be added behind capability detection. The blockchain layer remains provider/adapter based and must not expose seed phrases or private keys to game servers.

Shared content should be treated as data contracts so Unity C#, Three.js and future native clients can consume the same story, event and item definitions.
