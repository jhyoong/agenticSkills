---
name: create-plan
description: Creates structured implementation plans for subagent-driven development. Use when the user asks to plan a feature, write a plan, create an implementation plan, or prepare tasks for subagent execution. Plans are saved to .claude/plans/.
---

# Create Plan

Create implementation plans optimized for execution by the `execute-plan-with-subagents` skill.

## Plan Location

Save plans to `.claude/plans/<plan-name>.md`. Create the directory if it doesn't exist.

Derive `<plan-name>` from the feature or task being planned. Use kebab-case (e.g., `add-user-auth.md`).

## Plan Format

Every plan MUST follow this structure exactly:

```markdown
# Plan: <Title>

## Summary
One paragraph describing the goal and scope.

## Branch Name
<kebab-case-name matching the plan file name>

## Tasks

### Task 1: <Short Title>
**Files:** <list of files to create or modify>
**Description:** What this task accomplishes.
**Acceptance Criteria:**
- Criterion 1
- Criterion 2

### Task 2: <Short Title>
...

## Notes
Any additional context, constraints, or dependencies between tasks.
```

## Rules

1. Each task MUST be small and independently completable (2-10 minutes of agent work).
2. Each task MUST list the exact files it touches.
3. Each task MUST have concrete acceptance criteria that a reviewer can verify.
4. Tasks MUST be ordered so dependencies are resolved sequentially — earlier tasks before later ones.
5. Do NOT include test-writing as separate tasks. The developer subagent follows TDD and writes tests as part of each task.
6. Keep the plan under 10 tasks. If the scope is larger, split into multiple plans.

## Workflow

1. Discuss the feature/change with the user to understand scope.
2. Explore the codebase to understand existing structure and patterns.
3. Draft the plan following the format above.
4. Present the plan to the user for review.
5. Incorporate feedback until the user approves.
6. Save the approved plan to `.claude/plans/<plan-name>.md`.
7. Tell the user: "Plan saved. Use `execute-plan-with-subagents` to begin execution. Tasks will be tracked with TodoWrite."