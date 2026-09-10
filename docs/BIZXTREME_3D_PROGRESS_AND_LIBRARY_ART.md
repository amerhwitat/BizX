# BizXtreme 3D Progress and Library Art Integration

BizXtreme's shared commerce/content layer now has a documented visual contract for the Three.js game client: 3D progress bars, Aurora/Chimera art direction, and stable logical asset IDs across clients.

## Visual language

Use deep-space blue, Aurora cyan, violet, ice-white typography, glass panels, aurora ribbons, mountain silhouettes, glowing cores, and orbital rings. Progress states should be recognizable as spatial 3D HUD elements rather than flat HTML-only controls.

## Library references

The inspected user Library artwork includes `Aurora Wayland Desktop Showcase.png`, `Chimera II OS Aurora Showcase.png`, and `Aurora Wayland Glass Desktop.png`. Their visual motifs are used as the approved reference for game UI composition and runtime derivatives.

## Runtime contract

The Three.js client owns the current 3D progress implementation. Unity and future clients should consume the same logical progress tracks and asset IDs instead of inventing divergent values.

## Asset policy

The original Library images remain source artwork. Runtime builds should use appropriately sized/compressed derivatives and lazy loading. The project must not represent external artwork as scraped or universally licensed material without a verified license.
