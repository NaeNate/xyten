import {
  ApplicationCommandOptionData,
  ApplicationCommandPermissionData,
  CommandInteraction,
} from "discord.js"

export type commandType = {
  name: string
  description: string
  options: ApplicationCommandOptionData[]
  permissions: ApplicationCommandPermissionData[]
  execute: executeType
}

export type executeType = (interaction: CommandInteraction) => Promise<void>
