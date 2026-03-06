import type { Plugin } from "@opencode-ai/plugin"

export const AlertSoundPlugin: Plugin = async ({ $ }) => {
  // Change to any file in /System/Library/Sounds/ e.g. Glass, Funk, Tink
  const playSound = async () => {
    await $`afplay /System/Library/Sounds/Purr.aiff`.quiet()
  }

  return {
    event: async ({ event }) => {
      // Fires when opencode needs permission to run a tool
      if (event.type === "permission.asked") {
        await playSound()
      }

      // Fires when the agent is done and waiting for your next message
      if (event.type === "session.idle") {
        await playSound()
      }
    },
  }
}
