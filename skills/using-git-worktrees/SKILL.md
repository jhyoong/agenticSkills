---
name: using-git-worktrees
description: Ensures work happens in an isolated git worktree, not on main or master. Use before starting plan execution with execute-plan-with-subagents. Creates worktrees in the .worktrees directory using the plan name as the branch name.
---

# Using Git Worktrees

Ensure all development happens in a safe, isolated workspace. Never on main or master.

## Safety Check

Before any implementation work, check the current branch:

```bash
git rev-parse --abbrev-ref HEAD
```

**If on `main` or `master`:** Do NOT proceed with any code changes. Create a worktree first (see below).

**If already on a feature branch inside a worktree:** Confirm the worktree path is under `.worktrees/`. If yes, you are safe — proceed with work.

## Creating a Worktree

When you need to create a new worktree:

1. Read the plan file to get the branch name from the `## Branch Name` section.
2. Ensure the `.worktrees` directory exists at the repository root.
3. Create the worktree and switch to it:

```bash
mkdir -p .worktrees
git worktree add .worktrees/{{branch-name}} -b {{branch-name}}
cd .worktrees/{{branch-name}}
```

4. Verify you are in the worktree:

```bash
git rev-parse --abbrev-ref HEAD  # should print {{branch-name}}
pwd                                # should be under .worktrees/
```

5. Run any project setup commands if needed (install dependencies, build, etc.).
6. Verify the test suite passes in the clean worktree before starting work.

## Rules

- NEVER make implementation changes on `main` or `master`. No exceptions.
- Always create worktrees under `.worktrees/` at the repository root.
- One worktree per plan. The branch name comes from the plan file.
- If a worktree for this plan already exists, `cd` into it instead of creating a new one.
- Add `.worktrees/` to `.gitignore` if not already there.