import { Client, Intents } from "discord.js"
import "dotenv/config"
import fs from "fs"
import { executeType } from "./types"

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

let commands: Record<string, executeType> = {}

client.once("ready", async () => {
  const commandManager = client.guilds.cache.get(
    process.env.GUILD_ID!
  )!.commands

  if (process.env.NODE_ENV) {
    commandManager.set([])
  }

  for (const file of fs.readdirSync(__dirname + "/commands")) {
    const { name, description, options, execute } =
      require(`./commands/${file}`).default

    await commandManager.create({
      name,
      description,
      options,
    })

    commands[name] = execute
  }

  console.clear()
  console.log("READY")
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return

  try {
    await commands[interaction.commandName](interaction, client)
  } catch (e) {
    await interaction.reply("Error - Contact Biinge#7203")

    console.log(e)
  }
})

client.login(process.env.TOKEN)
