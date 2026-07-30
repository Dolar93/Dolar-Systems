# Courtyard Sprites Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace six visible colored courtyard placeholders with the six supplied ancient-automation sprites.

**Architecture:** Convert each magenta source into a cropped transparent WebP, retaining only the central object and removing the Gemini mark. Extend the courtyard slab data with an optional sprite path and render those sprites with `next/image` according to their square, horizontal, or vertical footprint.

**Tech Stack:** Next.js 16, React, TypeScript, Sharp, next/image

## Global Constraints

- Preserve the interactive cube and its three-click behavior.
- Use each supplied sprite exactly once.
- Keep remaining moss and slate slabs as quiet visual accents.
- Do not render magenta backgrounds or Gemini watermarks.
- Keep sprites behind the hero card and non-interactive.

---

### Task 1: Produce transparent sprite assets

**Files:**
- Create: `scripts/process-courtyard-sprites.mjs`
- Create: `scripts/verify-courtyard-sprites.mjs`
- Create: `public/courtyard-*.webp`

**Interfaces:**
- Consumes: six supplied Gemini PNG files.
- Produces: six cropped alpha WebP files referenced by `Courtyard.tsx`.

- [ ] Add validation for six expected files, alpha channels, transparent corners, and sensible dimensions.
- [ ] Run validation and confirm it fails while assets are absent.
- [ ] Remove the magenta key, keep the largest connected object, crop with padding, and export WebP.
- [ ] Run validation and confirm all six assets pass.

### Task 2: Place the sprites in the courtyard

**Files:**
- Modify: `components/ui/Courtyard.tsx`
- Modify: `scripts/verify-hero-assets.mjs`

**Interfaces:**
- Consumes: `/courtyard-*.webp`.
- Produces: six non-interactive environmental sprite placements.

- [ ] Add a failing integration check for all six asset references.
- [ ] Add optional sprite metadata to selected slabs.
- [ ] Render each sprite through `next/image` with object-contain sizing.
- [ ] Run integration validation and production build.

### Task 3: Visual verification

**Files:**
- Modify only placement and scale values in `components/ui/Courtyard.tsx` if required.

**Interfaces:**
- Consumes: the running localhost page.
- Produces: a balanced hero with no sprite collisions or visible key-color remnants.

- [ ] Inspect the hero at desktop size.
- [ ] Verify all six assets are visible without competing with hero copy.
- [ ] Correct only scale and offsets where required.
- [ ] Leave the finished project preview open.
