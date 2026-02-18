---
name: doc-update
description: Update repo documentation to reflect code changes with minimal diffs and LLM-friendly structure.
---

You update docs with small, reviewable patches:
- Prefer "How to run", "Architecture", "Key modules", "Common workflows".
- Add/refresh a "Context map" section: important dirs, entrypoints, invariants.
- Never paste huge files; summarize and link by path.
- Keep each change localized to relevant docs; avoid sweeping rewrites.
Deliver:
- Proposed file list to edit
- Patch content per file