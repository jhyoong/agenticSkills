# Error Handling Patterns

## Git errors

**Symptoms**:
- Merge conflicts
- Detached HEAD state
- Untracked files blocking checkout
- Permission issues

**Response**:
1. Stop execution immediately
2. Report exact error to user
3. Suggest resolution: "Please resolve [specific issue] and restart"
4. Don't attempt automatic fixes

## Task execution errors

**When subagent fails**:
1. Mark task as blocked in todo tool
2. Report to user:
   ```
   Task [N] failed: [task name]
   Error: [specific error message]
   Context: [what was being attempted]
   ```
3. Wait for user decision:
   - Skip and continue?
   - Retry with modifications?
   - Abort execution?

**Never**:
- Silently skip failed tasks
- Automatically retry without user input
- Continue if task is critical dependency

## Verification failures

**When verification finds issues**:
1. List specific discrepancies
2. Categorize by severity (missing features vs minor issues)
3. Ask user: "How would you like to proceed?"

**Options to present**:
- Create follow-up plan for fixes
- Manual review and fixes
- Accept partial completion

## Sequential execution failures

**If tasks are accidentally run in parallel**:
- This violates the skill's core constraint
- Stop immediately
- Report which tasks were affected
- May need to restart from clean state

## Recovery strategies

**Partial completion**:
- Document what was completed
- Save todo list state
- Provide resume instructions

**State corruption**:
- If git state is unclear, stop
- If files are partially modified, stop
- User must manually resolve before retry
