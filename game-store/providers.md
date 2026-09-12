# Storyboard and Asset Providers

| Provider | Content | Default policy |
|---|---|---|
| OpenGameArt | 2D/3D game art, audio and related assets | Verify item license; CC0/compatible free licenses can be imported |
| Poly Haven | 3D models, HDRIs, textures | CC0 assets; use official API and obey API/site terms |
| Smithsonian Open Access | 2D/3D cultural collections | Import only items whose record permits the intended reuse |

The catalog is deliberately provider-neutral so additional open collections can be added without changing the game engine.

## 4D storyboard representation

A 4D storyboard is stored as a sequence of time-indexed 2D/3D states: `scene -> time samples -> camera/light/entity transforms -> optional volumetric data`. It is a data model, not a claim that a renderer is inherently four-dimensional.
