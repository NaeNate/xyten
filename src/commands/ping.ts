import { commandType } from "../types"

const command: commandType = {
  name: "ping",
  description: "🏓",
  options: [],

  execute: async (interaction) => {
    await interaction.reply({
      content: "pong",
      ephemeral: true,
    })
  },
}

export default command
