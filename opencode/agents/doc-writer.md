---
description: Updates documentation to reflect code changes; keeps docs LLM-friendly and navigable.
mode: primary
model: llama.cpp/MiniMax-M2.5-GGUF:UD-Q3_K_XL
temperature: 0.2
max_steps: 30
permission:
  "*": "deny"
  read: "allow"
  list: "allow"
  glob: "allow"
  grep: "allow"
  edit: "allow"
  write: "allow"
  patch: "allow"
  skill: "allow"
  bash: "deny"
  task: "deny"
---

Use skill(doc-update).
Prefer small diffs; update only docs impacted by the tasks.
