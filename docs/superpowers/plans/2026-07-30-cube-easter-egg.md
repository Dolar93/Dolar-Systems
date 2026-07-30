# Cube Easter Egg Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a three-click interactive cube whose stable images progress from inactive to rune-lit to flaming, then ignite looping green fire behind the hero vines.

**Architecture:** Keep click progression in a pure state module and render the interaction in a focused client component. Use three cleaned cube keyframes for visual consistency, Framer Motion for the hop/state swap, a processed 4×2 black-background fire atlas for the looping VFX, and CSS/Framer Motion for the page-wide green illumination and third-click shockwave.

**Tech Stack:** Next.js 16.2 client components, React 19 state, Framer Motion 12, `next/image`, Sharp asset processing, Node assertions.

## Global Constraints

- Preserve the current stone, moss, slate, and water palette.
- Respect `prefers-reduced-motion`.
- The cube remains decorative on small screens and interactive from the `lg` breakpoint.
- Do not use the inconsistent generated cube atlas as full animation frames.
- Stable cube states come from the three supplied 2048×2048 images.
- Third-click fire uses the supplied 4×2 black-background atlas with screen blending.

---

### Task 1: Click-state model

**Files:**
- Create: `lib/cube-easter-egg.ts`
- Create: `scripts/test-cube-easter-egg.mjs`

**Interfaces:**
- Produces: `CubeStage`, `nextCubeStage(stage)`, `cubeImageForStage(stage)`, `isPageIgnited(stage)`.

- [ ] Write assertions for the sequence `0 → 1 → 2 → 3 → 3`, image mapping, and ignition state.
- [ ] Run the test and confirm it fails because the module does not exist.
- [ ] Add the minimal pure state module.
- [ ] Run the test and confirm all assertions pass.

### Task 2: Production image assets

**Files:**
- Create: `scripts/process-cube-easter-egg-assets.mjs`
- Create: `public/cube-off.webp`
- Create: `public/cube-runes.webp`
- Create: `public/cube-fire.webp`
- Create: `public/rune-fire-sheet.webp`

**Interfaces:**
- Consumes: the three cube keyframes and supplied 4×2 fire atlas.
- Produces: aligned 768×768 cube images with alpha and one optimized fire atlas.

- [ ] Add asset assertions for dimensions, alpha channels, and atlas aspect ratio.
- [ ] Run assertions and confirm they fail on missing outputs.
- [ ] Implement deterministic masking, watermark exclusion, alignment, and WebP encoding with Sharp.
- [ ] Run assertions and visually inspect every output.

### Task 3: Interactive cube and hero ignition

**Files:**
- Create: `components/ui/InteractiveAutomationCube.tsx`
- Modify: `components/ui/Courtyard.tsx`
- Modify: `components/sections/Hero.tsx`

**Interfaces:**
- `InteractiveAutomationCube` consumes `reduced` and `onIgnite`.
- `Courtyard` forwards `onIgnite`.
- `Hero` owns the page-ignited state and renders two synchronized fire layers plus the illumination overlay.

- [ ] Extend the validator to require the new component, three state assets, fire atlas, and removed legacy artifact reference.
- [ ] Run the validator and confirm the new requirements fail.
- [ ] Implement click locking, hop animation, apex image swap, third-click shockwave, keyboard semantics, and reduced-motion behavior.
- [ ] Render the fire atlas behind the top-right and bottom-left vines and animate the card-wide light spill.
- [ ] Run the validator and TypeScript checks.

### Task 4: Browser and production verification

**Files:**
- Modify only if visual verification identifies a concrete positioning issue.

- [ ] Run the full production build.
- [ ] Reload the local page and verify all four assets load without console errors.
- [ ] Click the cube three times and confirm the state sequence and third-click fire.
- [ ] Confirm further clicks do not restart or corrupt the active easter egg.
- [ ] Inspect the hero at the current desktop viewport and leave the finished preview open.
