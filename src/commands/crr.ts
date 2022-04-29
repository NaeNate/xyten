import {
  GuildMember,
  MessageActionRow,
  MessageSelectMenu,
  Role,
  TextChannel,
} from "discord.js"
import { commandType } from "../types"

const command: commandType = {
  name: "crr",
  description: "Create a reaction role message.",
  options: [
    {
      name: "channel",
      description: "The channel where you want the message sent",
      type: "CHANNEL",
      required: true,
    },
    {
      name: "message",
      description: "The message you want sent",
      type: "STRING",
      required: true,
    },
    {
      name: "roles",
      description: "The roles you wan't chosen from",
      type: "STRING",
      required: true,
    },
  ],

  execute: async (interaction, client) => {
    const channel = interaction.options.getChannel("channel") as TextChannel
    const message = interaction.options.getString("message")!.split("\\n")!

    const roles = interaction.options
      .getString("roles")!
      .trim()
      .split(" ")
      .filter((str) => /\S/.test(str))
      .map((role) => role.split("&")[1].split(">")[0])

    const options = await Promise.all(
      roles.map(async (role) => ({
        label: ((await interaction.guild!.roles.fetch(role)) as Role).name,
        value: role,
      }))
    )

    const select = new MessageActionRow({
      components: [
        new MessageSelectMenu({
          customId: "role_choices",
          placeholder: "Select your roles...",
          options,
          minValues: 0,
          maxValues: roles.length,
        }),
      ],
    })

    interaction.reply({
      content: "👍",
      ephemeral: true,
    })

    channel.send({
      content: message.join("\n"),
      components: [select],
    })

    client.on("interactionCreate", (interaction) => {
      if (!interaction.isSelectMenu()) return

      const { customId, values, member } = interaction

      if (customId === "role_choices" && member instanceof GuildMember) {
        const component = interaction.component as MessageSelectMenu
        const removed = component.options.filter(
          (option) => !values.includes(option.value)
        )

        for (const id of removed) {
          member.roles.remove(id.value)
        }

        for (const id of values) {
          member.roles.add(id)
        }

        interaction.reply({
          content: "Roles updated",
          ephemeral: true,
        })
      }
    })
  },
}

export default command
