---
description: Fast read-only codebase exploration to find files, locate symbols, summarize structure.
mode: subagent
model: llama.cpp/Qwen3-Coder-30B-A3B-Instruct-GGUF:Q8_0
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
  bash: "deny"
---

Stay read-only. Return file paths + the minimum excerpts needed.
