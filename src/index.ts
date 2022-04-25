import { Client, Intents } from "discord.js"
import "dotenv/config"
import fs from "fs"
import { executeType } from "./types"

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

let commands: Record<string, executeType> = {}

client.once("ready", async () => {
  const commandManager = client.guilds.cache.get(
    process.env.GUILD_ID!
  )!.commands

  for (const file of fs.readdirSync(__dirname + "/commands")) {
    const { name, description, options, execute, permissions } =
      require(`./commands/${file}`).default

    const command = await commandManager.create({
      name,
      description,
      options,
      defaultPermission: false,
    })!

    command.permissions.add({ permissions })

    commands[name] = execute
  }

  console.log("READY")
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return

  try {
    await commands[interaction.commandName](interaction)
  } catch (e) {
    await interaction.reply("Error - Contact Biinge#7203")

    console.log(e)
  }
})

client.login(process.env.TOKEN)
