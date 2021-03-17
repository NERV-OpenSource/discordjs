const Discord = require("discord.js");
const ytdl = require("ytdl-core-discord");
require('dotenv/config');

const client = new Discord.Client();
let counter = {};

client.once('ready', () => {
  console.log('Iniciado com sucesso!');
});

client.on('message', message => {
  const activeRole = message.guild.roles.cache.find(role => role.name = "Active");

  if (activeRole) {
    if (!counter[message.author.id]) {
      counter[message.author.id] = 1;
    } else {
      counter[message.author.id] += 1;
    }

    message.reply(counter[message.author.id]);

    if (counter[message.author.id] >= 100 && !message.member.roles.cache.has(activeRole.id)) {
      message.member.roles.add(activeRole).then((member) => {
        message.reply("Parabéns, pela sua participação você ganhou um novo cargo!");
      }).catch(console.error);
    }
  }

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
      try {
        connection.play(await ytdl(arguments[0]), { type: 'opus' });
      } catch (ex) {
        message.reply("Erro ao reproduzir mídia");
      }
    });
  }

  if (command === "stop") {
    const voice = message.member.voice;

    if (!voice.channelID) {
      message.reply("É preciso estar em um canal de voz para utilizar esse comando.");
      return;
    }

    voice.channel.leave();
  }
})

client.login(process.env.API_TOKEN);