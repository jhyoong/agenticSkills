#!/bin/bash
set -euo pipefail

# Require plan file path as argument
if [ -z "${1:-}" ]; then
    echo "ERROR: Plan file path required as argument"
    exit 1
fi

PLAN_FILE="$1"

# Verify plan file exists
if [ ! -f "$PLAN_FILE" ]; then
    echo "ERROR: Plan file not found: $PLAN_FILE"
    exit 1
fi

# Extract plan name from file path (remove directory and extension)
PLAN_NAME=$(basename "$PLAN_FILE" | sed 's/\.[^.]*$//')
# Sanitize: lowercase, replace spaces/underscores with hyphens, remove special chars
PLAN_NAME=$(echo "$PLAN_NAME" | tr '[:upper:]' '[:lower:]' | tr '_ ' '--' | sed 's/[^a-z0-9-]//g')

echo "Checking git status..."

# Check if in git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "ERROR: Not in a git repository"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# Check for uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "Uncommitted changes detected"
    
    # If on main/master, stash and create new branch
    if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "master" ]]; then
        echo "Stashing changes and creating feature branch..."
        git stash push -m "Auto-stash before plan execution: $PLAN_NAME"
        BRANCH_NAME="feature/$PLAN_NAME"
        git checkout -b "$BRANCH_NAME"
        git stash pop
        echo "Created and switched to: $BRANCH_NAME"
    else
        echo "WARNING: Uncommitted changes on branch: $CURRENT_BRANCH"
        echo "Continue with current branch? (Requires user confirmation)"
        exit 2
    fi
elif [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "master" ]]; then
    # Clean main/master, create new branch
    BRANCH_NAME="feature/$PLAN_NAME"
    git checkout -b "$BRANCH_NAME"
    echo "Created and switched to: $BRANCH_NAME"
else
    echo "Clean branch ready: $CURRENT_BRANCH"
fi

echo "✅ Git environment ready for execution"
