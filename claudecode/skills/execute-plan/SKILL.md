---
name: execute-plans
description: Execute development plans by managing git branches, creating task lists, running subagents for each task sequentially, and verifying completion. Use when starting implementation of a plan file.
---

# Execute Plans

Execute a development plan with git workflow management, task breakdown, sequential execution, and verification.

## Prerequisites

A plan file must exist with clearly defined tasks.

## Workflow

Copy and track progress:

```
- [ ] Git branch setup
- [ ] Task extraction and validation
- [ ] Sequential task execution
- [ ] Work verification
```

### Git branch setup

Create and run git branch management script with the plan file path:

```bash
bash scripts/git-branch-setup.sh <plan-file-path>
```
Branch naming: Script extracts the plan file name and creates feature/<plan-name> (e.g., auth-implementation.md → feature/auth-implementation)

If script exits with code 1 or 2: Stop and report error to user.

### Task extraction and validation

1. Read plan file and extract actionable tasks
2. Count tasks - see [TASK_VALIDATION.md](TASK_VALIDATION.md) for extraction rules
3. **If > 5 tasks**: Tell user "This plan contains [N] tasks, exceeding the 5-task limit. Break it down into smaller chunks" and **STOP**
4. **If ≤ 5 tasks**: Create todo list using todo tool

### Sequential task execution

**Execute ONE task at a time. Never run tasks in parallel.**

For each task:

1. Mark in-progress in todo tool
2. Launch subagent:
   ```
   Task: [task description]
   Context: Task [N] of [Total]
   
   Requirements:
   - Complete as specified in plan
   - Write clean, tested code
   - Document assumptions
   - Report completion summary
   ```
3. Wait for completion
4. Mark complete in todo tool
5. Move to next task

### Work verification

Launch verification subagent after all tasks complete:

```bash
# Review original plan file
# Check all deliverables exist
# Run tests if applicable
# Compare work against plan requirements
# Report discrepancies
```

Verification output should include:
- Completed vs planned checklist
- Test results
- Issues found

**If verification fails**: Report to user, don't auto-fix.

## Completion summary

```markdown
## Plan Execution Complete

**Branch**: [name]
**Tasks**: [N] of [N] complete
**Status**: [Success/Partial/Failed]

### Verification:
[Results summary]

### Next steps:
[Commit/PR recommendations]
```

## Additional documentation

- Task extraction rules: [TASK_VALIDATION.md](TASK_VALIDATION.md)
- Error handling patterns: [ERROR_HANDLING.md](ERROR_HANDLING.md)