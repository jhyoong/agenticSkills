---
description: Basic implementation agent used after planning
mode: primary
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
