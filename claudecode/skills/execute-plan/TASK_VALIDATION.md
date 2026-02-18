# Task Validation Guidelines

## Extraction rules

When parsing the plan file:

**What counts as a task**:
- Independent, actionable work units
- Meaningful deliverables (features, integrations, refactors)
- Items requiring distinct implementation effort

**What doesn't count**:
- Setup steps (installing dependencies, configuring environment)
- Verification steps (handled by this skill's workflow)
- Documentation updates (unless primary deliverable)
- Micro-steps that take < 15 minutes

## Grouping guidelines

Combine tightly coupled work:
- ✅ "Implement user authentication (backend + frontend + tests)"
- ❌ "Create user model", "Add login endpoint", "Build login UI", "Write auth tests"

Balance granularity:
- Too granular: > 5 tasks from a small feature
- Too broad: One task that takes multiple days

## Task counting examples

**Example 1 - Correctly grouped (3 tasks)**:
```
1. Set up database schema and models
2. Implement API endpoints with validation
3. Build frontend interface with error handling
```

**Example 2 - Too granular (7 tasks, needs regrouping)**:
```
1. Create database migrations
2. Define models
3. Write POST endpoint
4. Write GET endpoint
5. Add input validation
6. Create React components
7. Add error states
```
→ Should be: "Backend API implementation" + "Frontend interface"

## The 5-task limit

**Why 5 tasks?**:
- Maintains focus and manageable scope
- Prevents context switching overhead
- Each subagent maintains clear context
- Reduces coordination complexity

**If plan exceeds 5 tasks**:
- Plan likely needs better scoping
- Break into multiple execution phases
- User should refine plan structure
