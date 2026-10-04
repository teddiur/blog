# Graph Report - blog  (2026-10-04)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 140 nodes · 196 edges · 12 communities (10 shown, 2 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `98f27029`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BaseLayout.astro
- package.json
- useOCR.ts
- Redux
- ocr.tsx
- game-of-life.jsx
- Astro Starter Kit: Minimal
- dependencies
- compilerOptions
- scripts

## God Nodes (most connected - your core abstractions)
1. `Astro Starter Kit: Minimal` - 9 edges
2. `Redux` - 8 edges
3. `useOCR()` - 7 edges
4. `OCR()` - 6 edges
5. `react` - 6 edges
6. `compilerOptions` - 6 edges
7. `scripts` - 6 edges
8. `Home` - 6 edges
9. `OCRResult` - 5 edges
10. `processFile()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `OCRResultItemProps` --references--> `OCRResult`  [EXTRACTED]
  src/features/ocr/components/OCRResultItem.tsx → src/features/ocr/types.ts
- `OCR()` --calls--> `useOCR()`  [EXTRACTED]
  src/features/ocr/ocr.tsx → src/features/ocr/useOCR.ts
- `processFile()` --calls--> `pdfToImages()`  [EXTRACTED]
  src/features/ocr/logic.ts → src/features/ocr/utils/pdfConverter.ts
- `useOCR()` --calls--> `processFile()`  [EXTRACTED]
  src/features/ocr/useOCR.ts → src/features/ocr/logic.ts
- `useOCR()` --calls--> `pdfToImages()`  [EXTRACTED]
  src/features/ocr/useOCR.ts → src/features/ocr/utils/pdfConverter.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Project Commands** — README_dev_server, README_dist, README_astro_cli [EXTRACTED 1.00]
- **Project Structure** — README_src_pages, README_src_components, README_public, package [EXTRACTED 1.00]
- **Redux Core Architecture** — store, reducer, selector, dispatch, action [INFERRED 0.90]

## Communities (12 total, 2 thin omitted)

### Community 0 - "BaseLayout.astro"
Cohesion: 0.07
Nodes (8): GitHub SVG, LinkedIn SVG, collections, posts, skills, tags, counter, display

### Community 1 - "package.json"
Cohesion: 0.12
Nodes (16): allowScripts, tesseract.js@7.0.0, devDependencies, typescript, name, type, version, astro (+8 more)

### Community 2 - "useOCR.ts"
Cohesion: 0.28
Nodes (11): OCRResultItemProps, performOCRTesseract(), processFile(), ImageFile, OCRResult, ProcessingStatus, buildCurrentFile(), initialState (+3 more)

### Community 3 - "Redux"
Cohesion: 0.27
Nodes (14): Action, Action Creator, Dispatch, Props Drilling, React Redux, Reducer, Redux, Selector (+6 more)

### Community 4 - "ocr.tsx"
Cohesion: 0.27
Nodes (8): react, containerStyle, ImageUpload(), ImageUploadProps, OCRResultItem(), ProcessingStatus(), ProcessingStatusProps, OCR()

### Community 5 - "game-of-life.jsx"
Cohesion: 0.33
Nodes (7): GameOfLife(), gameStateEnum, getInitialState(), getNumberOfAliveSurrondingCells(), outsideGrid(), randomGrid(), run()

### Community 6 - "Astro Starter Kit: Minimal"
Cohesion: 0.20
Nodes (9): Astro CLI, Astro Starter Kit: Minimal, Local Dev Server, Astro Discord, dist directory, Astro Documentation, public directory, src/components directory (+1 more)

### Community 7 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, astro, @astrojs/react, npm, pdfjs-dist, react, react-dom, tesseract.js (+2 more)

### Community 8 - "compilerOptions"
Cohesion: 0.22
Nodes (8): astro/tsconfigs/base, compilerOptions, allowJs, jsx, jsxImportSource, paths, strictNullChecks, extends

### Community 9 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, astro, build, dev, preview, start

## Knowledge Gaps
- **53 isolated node(s):** `ImageUploadProps`, `ProcessingStatusProps`, `collections`, `posts`, `skills` (+48 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 67 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `ocr.tsx` to `package.json`, `useOCR.ts`, `game-of-life.jsx`?**
  _High betweenness centrality (0.267) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `Astro Starter Kit: Minimal` connect `Astro Starter Kit: Minimal` to `package.json`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `Redux` (e.g. with `Action` and `Dispatch`) actually correct?**
  _`Redux` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ImageUploadProps`, `ProcessingStatusProps`, `collections` to the rest of the system?**
  _53 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BaseLayout.astro` be split into smaller, more focused modules?**
  _Cohesion score 0.07258064516129033 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._