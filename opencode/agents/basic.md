---
description: Basic implementation agent used after planning
mode: primary
model: llama.cpp/MiniMax-M2.5-GGUF:UD-Q3_K_XL
temperature: 0.1
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
  task:
    "adventurer": "allow"
    "developer": "allow"
---

Implement exactly what was created in plan mode. 
