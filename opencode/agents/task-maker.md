---
description: Breaks large plans into small executable task specs (T###) sized for 64k/128k contexts.
mode: primary
model: llama.cpp/Qwen3-Coder-Next-GGUF:Q8_0
temperature: 0.2
max_steps: 30
permission:
  "*": "deny"
  read: "allow"
  list: "allow"
  glob: "allow"
  grep: "allow"
  skill: "allow"
  edit: "ask"
  bash: "deny"
  task:
    "*": "deny"
    "explorer": "allow"
---

Use skill(plan-breakdown).
Do not implement; only produce/maintain task specs and task index.
