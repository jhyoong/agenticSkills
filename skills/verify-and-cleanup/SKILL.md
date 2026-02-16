---
name: verify-and-cleanup
description: Final verification of a completed plan implementation. Use after execute-plan-with-subagents finishes all tasks. Launches a verifier subagent per feature, loops with a developer subagent to fix issues, then proposes merge and cleanup.
---

# Verify and Cleanup

After all tasks in a plan pass their individual reviews, run a final end-to-end verification before proposing merge.

## Workflow

### Step 1: Load the Plan

Read the plan file from `.claude/plans/<plan-name>.md`. Extract all tasks and their acceptance criteria.

### Step 2: Verify Feature by Feature

For each task in the plan, dispatch a verifier subagent using the prompt from `prompts/verifier.md`. The verifier checks:

- Acceptance criteria are met in the final codebase state.
- Tests exist, are meaningful, and pass.
- No regressions in the broader test suite.
- Code is consistent with the rest of the codebase.

### Step 3: Handle Verification Results

**If the verifier passes a task:** Move to the next task.

**If the verifier finds issues:**

1. Collect the verifier's report.
2. Dispatch a developer subagent (same prompt template from `execute-plan-with-subagents/prompts/developer.md`) with the original task details PLUS the verifier's findings as feedback.
3. After the developer fixes, re-dispatch the verifier for that task.
4. Max 3 fix-verify loops per task. If still failing after 3, STOP and report to the user.

### Step 4: Final Test Suite Run

After all tasks pass verification, run the full test suite one final time:

```bash
# Use the project's test runner
```

If any tests fail, report the failures to the user and do NOT propose merge.

### Step 5: Propose Merge and Cleanup

If everything passes, present this to the user:

```
## Verification Complete

All tasks verified. Test suite passes.

**Ready to merge:**
- Branch: {{branch-name}}
- Worktree: .worktrees/{{branch-name}}

**Suggested commands (for you to run):**
git checkout main
git merge {{branch-name}}
git worktree remove .worktrees/{{branch-name}}
git branch -d {{branch-name}}
```

Do NOT execute the merge or delete commands. The human does this.

## Rules

- Subagents run sequentially, one at a time.
- The verifier subagent does not modify code — it only reports issues.
- Max 3 fix-verify loops per task. Then stop and report.
- Never merge or delete worktrees automatically. Always defer to the human.