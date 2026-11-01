# Autodesk Inventor Part Showcase

A learning log for Autodesk Inventor: from a 2D sketch to a 3D solid. Rotate each part, pull it apart, and read its geometry. Part 01 is my own model; Parts 02 and 03 are sample placeholders.

## What it does

- 2D sketch with dimensions, extruded into a 10 mm solid
- Five cut-outs removed from the plate outline
- 3D viewer with orbit controls (drag to rotate, scroll to zoom)
- Feature table, specs, and plain-language interpretation
- English / Indonesian UI

## Stack

React 19 · Vite 6 · Three.js · Inline SVG · Autodesk Inventor → STEP · Python (build-time geometry checks) · EN/ID i18n

## Run locally

```sh
npm install
npm run dev
npm run build
```

## Deploy

GitHub Pages via GitHub Actions.
