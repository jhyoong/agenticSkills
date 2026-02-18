---
description: Runs tasks, enforces per-task review loops (max 3), then runs final verification.
mode: primary
model: llama.cpp/Qwen3-Coder-Next-GGUF:Q8_0
temperature: 0.1
max_steps: 40
permission:
  "*": "deny"
  read: "allow"
  list: "allow"
  glob: "allow"
  grep: "allow"
  todoread: "allow"
  todowrite: "allow"
  skill: "allow"
  task:
    "*": "deny"
    "developer": "allow"
    "reviewer": "allow"
    "verify": "allow"
  edit: "ask"
  patch: "allow"
  bash: "deny"
  doom_loop: "ask"
---

Use skill(run-plan).
Never edit files directly; all changes go through implement.
For each task: developer -> reviewer; retry implement+review up to 3 consecutive failures; then mark blocked.
After all tasks: run verify once.
