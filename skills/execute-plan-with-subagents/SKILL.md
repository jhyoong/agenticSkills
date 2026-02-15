---
name: execute-plan-with-subagents
description: Executes implementation plans created by create-plan using subagents. Use when the user says "execute plan", "run the plan", "start implementation", or references a plan file in .claude/plans/. Dispatches developer and reviewer subagents sequentially per task.
---

# Execute Plan With Subagents

Read a plan from `.claude/plans/` and execute it task-by-task using developer and reviewer subagents. Subagents run sequentially, never in parallel.

## Prerequisites

Before starting execution:

1. Invoke the `using-git-worktrees` skill to ensure you are in a safe, isolated workspace.
2. Read the plan file from `.claude/plans/<plan-name>.md`.
3. Create TodoWrite entries for every task in the plan.

## Execution Loop

For each task, repeat this cycle:

```
Developer subagent implements task
        ↓
Reviewer subagent reviews implementation
        ↓
  Pass? → Mark task complete, move to next task
  Fail? → Send feedback to developer subagent (max 3 attempts)
        ↓
  3 failures? → STOP. Report to user.
```

### Step 1: Dispatch Developer Subagent

Use the Task tool with the prompt from `prompts/developer.md`. Substitute the placeholders with actual values from the current task.

The developer subagent MUST use the `test-driven-development` skill.

### Step 2: Dispatch Reviewer Subagent

After the developer subagent completes, use the Task tool with the prompt from `prompts/reviewer.md`. Substitute placeholders with the task details and the files changed.

### Step 3: Handle Review Result

**If the reviewer passes:** Update the TodoWrite entry to complete. Proceed to the next task.

**If the reviewer fails:** Extract the reviewer's feedback. Re-dispatch the developer subagent with the original task PLUS the reviewer's feedback. Increment the attempt counter.

**If 3 attempts fail for a single task:** STOP execution immediately. Do NOT proceed to the next task. Output a failure report:

```
## Execution Stopped

**Failed Task:** <task title>
**Attempts:** 3
**Last Reviewer Feedback:** <feedback>
**Files Modified:** <list of files touched across all attempts>
**Completed Tasks:** <list of tasks that passed before this failure>
```

## After All Tasks Complete

When every task passes review:

1. Mark all TodoWrite entries complete.
2. Tell the user: "All tasks complete. Use `verify-and-cleanup` to do a final check before merging."

## Rules

- One task at a time, in order. Never skip or reorder tasks.
- Each subagent dispatch is a fresh Task call. Do not batch.
- Always pass the full task description and acceptance criteria to both subagents.
- The developer subagent must follow strict TDD (enforced by `test-driven-development` skill).
- The reviewer subagent only reviews — it does not modify code.