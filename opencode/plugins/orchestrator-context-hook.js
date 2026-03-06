// Fires when the orchestrator's context window reaches 64k tokens.
// Instructs it to checkpoint TASKS.md and await user input.

export default function plugin({ client }) {
  const CONTEXT_THRESHOLD = 64_000;
  const triggered = new Set();
  const pendingTrigger = new Set();

  return {
    async "session.updated"(event) {
      // Uncomment to verify payload shape on first run:
      await client.app.log({ level: "debug", message: JSON.stringify(event) })

      // Accommodate either event shapes: flat or nested under .properties
      const session = event?.properties ?? event;
      if (!session?.id || session?.agent !== "orchestrator") return;

      const tokens = session?.tokens?.input ?? 0;
      if (
        tokens >= CONTEXT_THRESHOLD &&
        !triggered.has(session.id) &&
        !pendingTrigger.has(session.id)
      ) {
        pendingTrigger.add(session.id);
        await client.app.log({
          level: "info",
          message: `[orchestrator-hook] Context threshold hit (${tokens} tokens). Waiting for idle.`,
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

You MUST perform the following steps before stopping — do not invoke any further subagents:

1. Locate TASKS.md (grep for it if needed; do NOT load the full file).
2. Append a "## Session Checkpoint" section at the bottom with these four subsections:

   ### Completed
   List all tasks and sub-tasks finished in this session (reference T### IDs).

   ### Outstanding
   List all tasks and sub-tasks not yet completed, in priority order.

   ### Last Subagent Response
   Summarise the output of the most recent subagent call (test-writer / developer / reviewer / verify), including any file paths returned.

   ### Notable Issues
   Document any errors, test failures, blockers, or unexpected behaviour observed during this session.

3. Save the file.
4. Reply with a brief confirmation that the checkpoint has been written.
5. Stop all activity. Do NOT invoke any further subagents. Await further instruction from the user.`,
        },
      });
    },
  };
}
