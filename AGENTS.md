# AGENTS.md - Guidelines for Agentic Coding Agents

## Project Overview

This is a **skills repository** for Claude Code and OpenCode. It contains skill definitions and agent configurations that define how AI coding agents operate in other projects. This is NOT a traditional software project - there is no application code to build, lint, or test.

## Directory Structure

```
agenticSkills/
├── opencode/           # OpenCode-specific skills and agents
│   ├── skills/        # Skill definitions (SKILL.md files)
│   │   ├── doc-update/
│   │   ├── run-plan/
│   │   └── plan-breakdown/
│   └── agents/        # Agent definitions
│       ├── developer.md
│       ├── reviewer.md
│       ├── explorer.md
│       ├── verify.md
│       ├── orchestrator.md
│       ├── task-maker.md
│       └── doc-writer.md
├── claudecode/       # Claude Code skills
│   └── skills/
│       ├── execute-plan/
│       └── old/        # Deprecated skills
├── example/          # Example skill definitions
└── README.md
```

## No Build/Lint/Test Commands

This repository does not contain runnable application code. There are no:
- Package.json or npm scripts
- Python packages to test
- Build systems
- Linters to run

**To validate skill files**: Read them manually and ensure YAML frontmatter is valid.

## Code Style Guidelines

### Skill Files (SKILL.md)

Skill files use YAML frontmatter followed by markdown content:

```yaml
---
name: skill-name
description: Brief description of what the skill does
---
# Detailed documentation
```

**YAML Frontmatter Rules:**
- Use 3 dashes `---` to open and close
- Required fields: `name`, `description`
- Keep description under 100 characters
- Use lowercase with hyphens for names

**Markdown Body:**
- Use ATX-style headers (# ## ###)
- Use fenced code blocks with language hints
- Use bullet lists for steps
- Use bold for emphasis sparingly

### Agent Definition Files

Agent files use YAML frontmatter with specific fields:

```yaml
---
description: Brief description
mode: subagent
model: llama.cpp/Model-Name:Quantization
hidden: false
temperature: 0.1
max_steps: 40
permission:
  read: "allow"
  write: "deny"
  bash: "ask"
---
```

**Required Frontmatter Fields:**
- `description`: What the agent does (1-2 sentences)
- `mode`: Either `subagent` or leave empty for main agent

**Optional Fields:**
- `model`: Specify model (e.g., `llama.cpp/Qwen3-Coder-Next-GGUF:Q8_0`)
- `hidden`: Whether agent appears in agent list
- `temperature`: Model creativity (0.0 = deterministic, 1.0 = creative)
- `max_steps`: Max conversation turns before auto-terminate
- `permission`: Tool permissions (`allow`, `deny`, `ask`)

**Permission Keys:**
- `read`, `write`, `edit`, `patch`, `glob`, `grep`, `bash`, `list`, `task`, `skill`
- Use `"*"` to set default for all tools

### Naming Conventions

| Type | Convention | Example |
|------|------------|--------|
| Skill names | lowercase with hyphens | `run-plan`, `doc-update` |
| Agent names | lowercase with hyphens | `developer`, `task-maker` |
| File names | lowercase with hyphens | `SKILL.md`, `developer.md` |
| YAML keys | lowercase with underscores | `max_steps`, `task_id` |

### Import Handling

Not applicable - no programming language code in this repository.

### Error Handling

- Skill files should include error handling guidance in markdown body
- Use clear error messages with suggested recovery actions
- Reference companion docs (e.g., ERROR_HANDLING.md) when needed

### Comments

- Use standard markdown comments where needed
- For YAML, use inline comments sparingly: `# comment`

## How to Use These Skills

### In Claude Code / OpenCode

Skills are loaded automatically when working in projects. The skills here define:
- How to execute implementation plans
- How to coordinate subagents
- How to review code
- How to handle errors

### Creating New Skills

1. Create directory under `opencode/skills/` or `claudecode/skills/`
2. Add `SKILL.md` with proper YAML frontmatter
3. Include clear workflow documentation
4. Use existing skills as templates

### Creating New Agents

1. Add file under `opencode/agents/` or `claudecode/agents/`
2. Use YAML frontmatter with required fields
3. Define permissions appropriately
4. Keep description concise

## Best Practices

1. **Keep skills focused**: One skill = one workflow
2. **Write clear descriptions**: Help users understand when to use each skill
3. **Document workflow steps**: Use numbered lists for sequential steps
4. **Set appropriate permissions**: Use least-privilege for agent tools
5. **Use consistent naming**: Follow the conventions above
6. **Test skills mentally**: Verify workflow logic before committing

## References

- Claude Code skills: https://code.claude.com/docs/en/skills
- OpenCode skills: https://opencode.ai/docs/skills/
- Claude Agents documentation: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
