import {
  ApplicationCommandOptionData,
  Client,
  CommandInteraction,
} from "discord.js"

export type commandType = {
  name: string
  description: string
  options: ApplicationCommandOptionData[]
  execute: executeType
}

export type executeType = (
  interaction: CommandInteraction,
  client: Client
) => Promise<void>
