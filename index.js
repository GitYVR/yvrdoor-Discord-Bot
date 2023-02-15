require('dotenv').config();

// loading required modules for the bot to work
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { openDoor } = require('./src/door');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

// get keys from discord.com/developers/applications
const { DISCORD_TOKEN, DISCORD_CHANNEL_ID } = process.env;

async function main() {
  console.log('Ready!');
  console.log(`Logged in as ${client.user.tag}!`);

  const channel = await client.channels.fetch(DISCORD_CHANNEL_ID);
  const message = await channel.send('React 🚪 to open the door');
  message.react('🚪');

  client.on('messageReactionAdd', async (reaction, user) => {
    // Ignore bot's own reaction
    if (user.id === client.user.id) {
      return;
    }

    // If the reaction was on the submitted message
    if (reaction.message.id !== message.id) {
      return;
    }

    // Make sure the reaction is the door
    // eslint-disable-next-line
    if (reaction._emoji.name !== '🚪') {
      return;
    }

    // Disreacts it
    reaction.users.remove(user);

    // Opens the door
    await openDoor();
  });
}

client.on('ready', main);
client.login(DISCORD_TOKEN);
