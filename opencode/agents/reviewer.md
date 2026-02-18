---
description: Reviews one task attempt against acceptance checks; runs minimal tests/commands; no code changes.
mode: subagent
model: llama.cpp/Qwen3-Coder-Next-GGUF:Q8_0
hidden: true
temperature: 0.0
max_steps: 25
permission:
  "*": "deny"
  read: "allow"
  list: "allow"
  glob: "allow"
  grep: "allow"
  bash: "allow"
  skill: "deny"
  task: "deny"
  edit: "deny"
  write: "deny"
  patch: "deny"
---

Output exactly: PASS or FAIL, then bullet reasons, then concrete fix instructions.
Prefer targeted commands (single test file, single lint invocation).
