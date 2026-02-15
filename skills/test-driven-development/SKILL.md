---
name: test-driven-development
description: Enforces strict RED-GREEN-REFACTOR test-driven development. Use during any implementation task where code is being written or modified. Activated by developer subagents dispatched from execute-plan-with-subagents.
---

# Test-Driven Development

Strict TDD. No exceptions. Every code change follows RED → GREEN → REFACTOR.

## The Cycle

### RED: Write a Failing Test

1. Write a test that captures the next piece of behavior you need.
2. Run the test. It MUST fail.
3. If it passes, your test is wrong — it is not testing new behavior. Rewrite it.

### GREEN: Make It Pass

1. Write the minimal code to make the failing test pass.
2. Do not write more code than needed. No anticipatory design.
3. Run the test. It MUST pass.
4. Run the full test suite. All tests MUST pass.

### REFACTOR: Clean Up

1. Improve the code without changing behavior (rename, extract, simplify).
2. Run the full test suite after refactoring. All tests MUST still pass.
3. If refactoring is not needed, skip this step.

Then go back to RED for the next behavior.

## Rules

- NEVER write implementation code before writing a failing test.
- If you catch yourself writing code first, STOP. Delete the code. Write the test.
- One behavior per cycle. Do not batch multiple behaviors into one test.
- Tests must be meaningful. A test that cannot fail is not a test.
- If the project has no test infrastructure, set it up first before writing any implementation code.
- Commit after each completed GREEN or REFACTOR step. Small, frequent commits.

## When Tests Already Exist

If modifying existing code that already has tests:

1. Write a new test (or modify an existing one) that fails for the new behavior. (RED)
2. Make it pass. (GREEN)
3. Refactor. (REFACTOR)

Existing passing tests must remain passing throughout.