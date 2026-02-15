# claudeSkills
Skills for claude code for my personal use

## Claude official documentation on skills
1. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
2. https://code.claude.com/docs/en/skills
3. https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en

## Skills to create
1. create-plan
  - This is a skill that creates implementation plans that will be used by `execute-plan-with-subagents`. These plans need to be tailored specifically for this skill.

2. execute-plan-with-subagents
  - This is a skill that reads the plan created by `create-plan` and converts it into smaller groups of tasks to be executed by subagents. It will use two subagents, a developer subagent and a reviewer subagent. They will work in a loop until the reviewer passes the implementation done by the developer subagent. 

3. test-driven-development
  - This is a skill that the developer subagent will use. It will pivot the agent to focus on adhering to test driven development (TDD).

4. using-git-worktrees
  - This will be a skill invoked at `execute-plan-with-subagents`. It will first check if the current path is in a safe, isolated workspace (not in main or master).

5. verify-and-cleanup
  - This is a skill that loads the plan file, break down key features to test and review. It then launches a subagent to check the work. If there are issues, send proposed fix and launch developer subagent to fix. Then, ask human to run this skill again in fresh context. If there are no issues, propose merge and cleanup to be done. Actual merge and delete will be done by human.