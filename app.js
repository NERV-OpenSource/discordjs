const Discord = require("discord.js");
require('dotenv/config');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Iniciado com sucesso!');
});

client.login(process.env.TOKEN);