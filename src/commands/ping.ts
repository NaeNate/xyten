import { commandType } from "../types"

const command: commandType = {
  name: "ping",
  description: "🏓",
  options: [],
  permissions: [
    {
      id: "792546463812943932",
      // @everyone
      type: "ROLE",
      permission: true,
    },
  ],

  execute: async (interaction) => {
    await interaction.reply({
      content: "pong",
      ephemeral: true,
    })
  },
}

export default command
