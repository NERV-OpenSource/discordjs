const Discord = require("discord.js");
const ytdl = require("ytdl-core-discord");
require('dotenv/config');

const client = new Discord.Client();
let counter = {};

const filter = (reaction, user) => {
  return ['👍', '👎'].includes(reaction.emoji.name) && !user.bot;
};

client.once('ready', () => {
  console.log('Iniciado com sucesso!');
});

client.on('message', message => {
  try {
    const activeRole = message.guild.roles.cache.find(role => role.name = "Active");
    if (message.author.bot) return;

    if (activeRole) {
      if (!counter[message.author.id]) {
        counter[message.author.id] = 1;
      } else {
        counter[message.author.id] += 1;
      }

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

    if (command === "roles") {
      const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName);

      const emojis = {
        ":black_circle:": 'Javascript',
        ":blue_circle:": 'Python',
        ":brown_circle:": 'Java',
        ":green_circle:": 'HTML-CSS',
        ":orange_circle:": 'C-sharp',
        ":purple_circle:": 'PHP',
        ":red_circle:": 'Kotlin',
        ":white_circle:": 'Rust',
        ":yellow_circle:": 'Haskell',
        ":blue_square": 'Lua',
        ":brown_square:": 'Assembly',
        ":green_square:": 'GO-lang',
        ":orange_square:": 'Ruby',
        ":purple_square:": 'Elixir',
      };

      const reactions = [];

      let emojiText = '';
      for (const key in emojis) {
        reactions.push(key);

        const role = emojis[key];
        emojiText += `${key} = ${role}\n`
      }

      message.channel.send(emojiText).then((message) => {
        message.react("⚫");
        message.react("🔵");
        message.react("🟤");
        message.react("🟢");
        message.react("🟠");
        message.react("🟣");
        message.react("🔴");
        message.react("⚪");
        message.react("🟡");
        message.react("🟦");
        message.react("🟩");
        message.react("🟧");
        message.react("🟪");

        const messageClient = message.client;

        messageClient.on('messageReactionAdd', (reaction, user) => {
          if (!user.bot && reaction.emoji.name === "👍") {

            const role = message.guild.roles.cache.find((role) => role.name === "Github Team");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id );

            

            if (!member.roles.cache.has("Github Team") && role) {
              member.roles.add(role);
            }
          }
        });

        messageClient.on('messageReactionRemove', (reaction, user) => {
          if (!user.bot && reaction.emoji.name === "👍") {

            const role = message.guild.roles.cache.find((role) => role.name === "Github Team");
            const member = message.guild.members.cache.find((member) => member.id === user.id );

            console.log(role);

            
            member.roles.remove(role);
            
          }
        });
      });


    }
  } catch (ex) {
    message.reply("Ocorreu um erro interno, por favor relate isso aos moderadores.");
  }
})

client.login(process.env.API_TOKEN);