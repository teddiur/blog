# Graph Report - blog  (2026-10-01)

## Corpus Check
- Corpus is ~3,753 words - fits in a single context window. You may not need a graph.

## Summary
- 92 nodes · 97 edges · 16 communities (8 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 4,500 input · 2,000 output

## Community Hubs (Navigation)
- Content Management
- Main Navigation
- Development Dependencies
- TypeScript Configuration
- Redux State Logic
- Game of Life Feature
- Package Dependencies
- Project Scripts
- Immutability Concepts
- Blog README
- React-Redux Intro
- React-Redux Library
- Selector Hook

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 7 edges
2. `scripts` - 6 edges
3. `GameOfLife()` - 5 edges
4. `Store` - 4 edges
5. `Reducer` - 4 edges
6. `run()` - 3 edges
7. `@astrojs/react` - 2 edges
8. `astro` - 2 edges
9. `react` - 2 edges
10. `getInitialState()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (16 total, 8 thin omitted)

### Community 0 - "Content Management"
Cohesion: 0.18
Nodes (3): collections, postCollections, tags

### Community 1 - "Main Navigation"
Cohesion: 0.17
Nodes (3): skills, counter, display

### Community 2 - "Development Dependencies"
Cohesion: 0.20
Nodes (9): name, type, version, astro, @astrojs/react, react, react-dom, @types/react (+1 more)

### Community 3 - "TypeScript Configuration"
Cohesion: 0.20
Nodes (9): astro/tsconfigs/base, compilerOptions, allowJs, baseUrl, jsx, jsxImportSource, paths, strictNullChecks (+1 more)

### Community 4 - "Redux State Logic"
Cohesion: 0.25
Nodes (7): Action, Context Provider, Dispatch, Provider, Reducer, Selector, Store

### Community 5 - "Game of Life Feature"
Cohesion: 0.36
Nodes (6): GameOfLife(), gameStateEnum, getInitialState(), getNumberOfAliveSurrondingCells(), random(), run()

### Community 6 - "Package Dependencies"
Cohesion: 0.29
Nodes (7): dependencies, astro, @astrojs/react, react, react-dom, @types/react, @types/react-dom

### Community 8 - "Project Scripts"
Cohesion: 0.33
Nodes (6): scripts, astro, build, dev, preview, start

## Knowledge Gaps
- **39 isolated node(s):** `name`, `type`, `version`, `dev`, `start` (+34 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 56 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Development Dependencies` to `Game of Life Feature`?**
  _High betweenness centrality (0.236) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Package Dependencies` to `Development Dependencies`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `scripts` connect `Project Scripts` to `Development Dependencies`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _39 weakly-connected nodes found - possible documentation gaps or missing edges._