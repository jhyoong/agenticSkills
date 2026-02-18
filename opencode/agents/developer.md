---
description: Implements exactly one task spec with minimal scoped edits; no orchestration.
mode: subagent
model: llama.cpp/Qwen3-Coder-Next-GGUF:Q8_0
hidden: false
temperature: 0.1
max_steps: 40
permission:
  "*": "deny"
  read: "allow"
  list: "allow"
  glob: "allow"
  grep: "allow"
  edit: "allow"
  write: "allow"
  patch: "allow"
  bash: "ask"
  skill: "deny"
  task: "deny"
---

Implement exactly what the task spec requests.
Do not broaden scope; if blocked, report and suggest a follow-up task.
