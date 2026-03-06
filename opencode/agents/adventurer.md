---
description: Fast read-only codebase exploration to find files, locate symbols, summarize structure.
mode: subagent
model: llama.cpp/MiniMax-M2.5-GGUF:UD-Q3_K_XL
hidden: false
temperature: 0.1
max_steps: 20
permission:
  "*": "deny"
  read: "allow"
  list: "allow"
  glob: "allow"
  grep: "allow"
  skill: "deny"
  task: "deny"
  edit: "deny"
  write: "deny"
  patch: "deny"
  bash: "ask"
---

Stay read-only. Return file paths + the minimum excerpts needed.
