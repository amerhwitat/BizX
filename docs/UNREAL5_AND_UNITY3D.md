# BizX Unreal 5 and Unity 3D integration

BizX now exposes a native C++ Unreal Engine 5 plugin boundary under `Unreal5/BizXUnreal/` and a Unity-compatible C# data boundary under `Unity3D/`.

## Portable assets

`3D/assets/` contains engine-neutral OBJ content. The intended interchange formats are OBJ, glTF/glb and FBX where licensing/tooling permits. Unreal also supports FBX and glTF import workflows; Datasmith is available for supported scene/design formats. See Epic documentation: https://dev.epicgames.com/documentation/en-us/unreal-engine/fbx-content-pipeline and https://dev.epicgames.com/documentation/en-us/unreal-engine/importing-datasmith-content-into-unreal-engine.

Unity packages can use UPM (`Unity3D/package.json`) and ordinary Assets folders. Unity supports `.unitypackage` and UPM package distribution; UPM is preferred for versioned/dependency-managed integration. See https://docs.unity.com/en-us/asset-store/publishing/introduction.

## Build

For Unreal, copy or link `Unreal5/BizXUnreal` into a UE5 project's `Plugins/` directory, regenerate project files, and build the target with the matching UE5 toolchain.

For Unity, add `Unity3D/` as a local package or copy its Assets content into a Unity project. The repository does not commit generated Unity Library/Temp folders or proprietary engine binaries.

## Coordinate/asset boundary

The engine-neutral object contract stores identifier, position, Euler rotation, scale and JSON metadata. Engine adapters are responsible for coordinate-system, unit and material conversion. Unreal's documented world unit is centimeters; imported assets must therefore preserve declared source units and convert explicitly.

## Citations and licensing

Epic Games documentation is referenced for engine interoperability and import workflows. Unity documentation is referenced for package/import workflows. Third-party assets and engine SDKs retain their original licenses; this repository contains only original integration code and small demonstrative geometry.
