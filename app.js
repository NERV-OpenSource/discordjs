const Discord = require("discord.js");
require('dotenv/config');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Iniciado com sucesso!');
});

client.on('message', message => {
  const prefix = process.env.PREFIX;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const arguments = message.content.slice(prefix.length).trim().split(' ');
  const command = arguments.shift().toLowerCase();

  if (command === "ping") {
    message.reply("Pong!");
  }
})

client.login(process.env.API_TOKEN);