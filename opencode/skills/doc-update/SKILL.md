---
name: doc-update
description: Update repo documentation to reflect code changes with minimal diffs and LLM-friendly structure.
---

Input requirements
- Source: code changes from task results or task specs (T### files)
- Scope: only docs impacted by the changes

Output format guidance
- Deliver: (1) proposed file list, (2) patch content per file
- Keep patches small and reviewable; avoid sweeping rewrites

Core rules
- Update: "How to run", "Architecture", "Key modules", "Common workflows", "Context map"
- Add/refresh sections that describe modified code paths
- Link to code files by path; never paste large code excerpts
- Keep docs navigable and searchable

What to avoid
- sweeping rewrites of entire docs
- duplicating information already present elsewhere
- editing docs unrelated to the current task scope
- using markdown constructs that reduce LLM readability (e.g., deeply nested lists, excessive inline code)