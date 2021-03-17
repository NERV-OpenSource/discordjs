const Discord = require("discord.js");
const ytdl = require("ytdl-core-discord");
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

  if (command === "play") {
    const voice = message.member.voice;
    const URL = arguments[0];

    if (!voice.channelID) {
      message.reply("É preciso estar em um canal de voz para utilizar esse comando.");
      return;
    }

    if (!URL) {
      message.reply("É preciso enviar a URL do vídeo para ser reproduzido");
      return;
    }

    voice.channel.join().then(async (connection) => {
      connection.play(await ytdl(arguments[0]), { type: 'opus' });
    });
  }
})

client.login(process.env.API_TOKEN);