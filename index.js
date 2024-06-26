const express = require('express');
const bodyParser = require('body-parser');
const { Client, Intents } = require('discord.js');

const app = express();
app.use(bodyParser.json());

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

const DISCORD_BOT_TOKEN = 'YOUR_DISCORD_BOT_TOKEN';
const GUILD_ID = 'YOUR_GUILD_ID';
const ROLE_ID = {
  'basic': 'ROLE_ID_FOR_BASIC',
  'premium': 'ROLE_ID_FOR_PREMIUM',
  'ultimate': 'ROLE_ID_FOR_ULTIMATE',
};

client.login(DISCORD_BOT_TOKEN);

app.post('/payment-webhook', async (req, res) => {
  const { discordNick, plan } = req.body;

  if (!discordNick || !ROLE_ID[plan]) {
    return res.status(400).send('Invalid request');
  }

  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const member = guild.members.cache.find(member => member.user.tag === discordNick);

    if (member) {
      await member.roles.add(ROLE_ID[plan]);
      res.status(200).send('Role assigned successfully');
    } else {
      res.status(404).send('Discord user not found');
    }
  } catch (error) {
    console.error('Error assigning role:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
