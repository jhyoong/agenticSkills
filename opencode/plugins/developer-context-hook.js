// Fires when the developer subagent's context window reaches 64k tokens.
// Forces a structured handoff summary telling the orchestrator how to proceed.

export default function plugin({ client }) {
  const CONTEXT_THRESHOLD = 64_000;
  const triggered = new Set();
  const pendingTrigger = new Set();

  return {
    async "session.updated"(event) {
      // Uncomment to verify payload shape on first run:
      // await client.app.log({ level: "debug", message: JSON.stringify(event) })

      const session = event?.properties ?? event;
      if (!session?.id || session?.agent !== "developer") return;

      const tokens = session?.tokens?.input ?? 0;
      if (
        tokens >= CONTEXT_THRESHOLD &&
        !triggered.has(session.id) &&
        !pendingTrigger.has(session.id)
      ) {
        pendingTrigger.add(session.id);
        await client.app.log({
          level: "info",
          message: `[developer-hook] Context threshold hit (${tokens} tokens). Waiting for idle.`,
        });
      }
    },

    async "session.idle"(event) {
      const session = event?.properties ?? event;
      if (!session?.id || !pendingTrigger.has(session.id)) return;

      pendingTrigger.delete(session.id);
      triggered.add(session.id);

      await client.session.prompt({
        path: { id: session.id },
        body: {
          text: `[SYSTEM HOOK] The context window has reached ${CONTEXT_THRESHOLD.toLocaleString()} tokens.

Halt all implementation immediately. Do not write any further code or call any tools.
Produce the following structured handoff summary so the orchestrator can decide how to proceed:

---
## Developer Handoff Summary

### Completed Work
- <List every file created or modified with a one-line description of what was implemented>

### Outstanding Work
- <List every remaining implementation step that was NOT completed, in order of priority>

### Issues / Blockers
- <Describe test failures, compile errors, ambiguous spec items, or missing context encountered>

### Recommended Next Action for Orchestrator
Pick ONE and justify:

**Option A — Retry with more context**
Spawn a new developer subagent. Provide the following additional context in the next invocation: <specify exactly — e.g., specific file contents, API signatures, error output, stack traces>.

**Option B — Review tests before retrying**
Dispatch the reviewer subagent first to assess the current test suite before attempting implementation again. Reason: <explain why the tests need review first>.

**Option C — Escalate to user**
A blocker exists that cannot be resolved without user clarification. Specifically: <describe what question or decision is needed>.
---`,
        },
      });
    },
  };
}
