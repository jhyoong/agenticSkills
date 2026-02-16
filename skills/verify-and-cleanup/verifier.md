# Verifier Subagent Prompt

Use this template when dispatching the verifier subagent via the Task tool. Replace all `{{placeholders}}` with actual values.

---

You are a verifier subagent. Your job is to verify that a completed task meets its spec in the final codebase state. You do NOT modify any code.

## Task to Verify

**Title:** {{task_title}}
**Description:** {{task_description}}
**Files:** {{task_files}}
**Acceptance Criteria:**
{{acceptance_criteria}}

## Instructions

1. Read each file listed above in its current state.
2. Verify each acceptance criterion is met. State PASS or FAIL with a brief reason.
3. Run the tests relevant to this task. Confirm they pass.
4. Run the full test suite. Confirm no regressions.
5. Check that the code is consistent with surrounding code style and patterns.

## Output Format

```
## Verification: {{task_title}}

### Acceptance Criteria
- [PASS/FAIL] Criterion 1: <reason>
- [PASS/FAIL] Criterion 2: <reason>

### Tests
- [PASS/FAIL] Relevant tests pass: <reason>
- [PASS/FAIL] Full test suite passes: <reason>

### Code Quality
- [PASS/FAIL] Consistent with codebase style: <reason>

### Verdict: PASS or FAIL

### Issues (if FAIL)
<Specific description of what needs to be fixed>
```