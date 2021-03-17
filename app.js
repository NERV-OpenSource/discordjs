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

    if (command === "leave") {
      const voice = message.member.voice;

      if (!voice.channelID) {
        message.reply("É preciso estar em um canal de voz para utilizar esse comando.");
        return;
      }

      voice.channel.leave();
    }

    if (command === "roles") {
      const emojiIcons = {
        js: message.guild.emojis.cache.find(emoji => emoji.name === "js"),
        python: message.guild.emojis.cache.find(emoji => emoji.name === "python"),
        java: message.guild.emojis.cache.find(emoji => emoji.name === "java"),
        html: message.guild.emojis.cache.find(emoji => emoji.name === "html"),
        php: message.guild.emojis.cache.find(emoji => emoji.name === "php"),
        rust: message.guild.emojis.cache.find(emoji => emoji.name === "r_"),
        ruby: message.guild.emojis.cache.find(emoji => emoji.name === "rubyonrails"),
      }

      const emojis = {
        "Javascript": emojiIcons.js,
        "Python": emojiIcons.python,
        "Java": emojiIcons.java,
        "HTML-CSS": emojiIcons.html,
        'C-sharp': ":orange_circle:",
        'PHP': emojiIcons.php,
        'Kotlin': ":red_circle:",
        'Rust': emojiIcons.rust,
        'Haskell': ":yellow_circle:",
        'Lua': ":blue_square:",
        'Assembly': ":brown_square:",
        'GO-lang': ":green_square:",
        'Ruby': emojiIcons.ruby,
        'Elixir': ":purple_square:",
        'C-lang': ":grinning:",
        'Elixir': ":grin:",
      };

      const reactions = [];

      let emojiText = '';
      for (const key in emojis) {
        reactions.push(key);

        const role = emojis[key];
        emojiText += `${key} = ${role}\n`
      }

      message.channel.send(emojiText).then((message) => {
        message.react(emojiIcons.js.id);
        message.react(emojiIcons.python.id);
        message.react(emojiIcons.java.id);
        message.react(emojiIcons.html.id);
        message.react("🟠");
        message.react(emojiIcons.php.id);
        message.react("🔴");
        message.react(emojiIcons.rust.id);
        message.react("🟡");
        message.react("🟦");
        message.react("🟩");
        message.react(emojiIcons.ruby.id);
        message.react("🟪");
        message.react("😀");
        message.react("😁");

        const messageClient = message.client;

        messageClient.on('messageReactionAdd', (reaction, user) => {
          if (!user.bot && reaction.emoji.name === emojiIcons.js.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "Javascript");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === emojiIcons.python.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "Python");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === emojiIcons.java.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "Java");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === emojiIcons.html.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "HTML-CSS");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === "🟠") {

            const role = message.guild.roles.cache.find((role) => role.name === "C-sharp");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === emojiIcons.php.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "PHP");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === "🔴") {

            const role = message.guild.roles.cache.find((role) => role.name === "Kotlin");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === emojiIcons.rust.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "Rust");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === "🟡") {

            const role = message.guild.roles.cache.find((role) => role.name === "Haskell");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === "🟦") {

            const role = message.guild.roles.cache.find((role) => role.name === "Lua");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === "🟩") {

            const role = message.guild.roles.cache.find((role) => role.name === "Assembly");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === "🟧") {

            const role = message.guild.roles.cache.find((role) => role.name === "GO-lang");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === emojiIcons.ruby) {

            const role = message.guild.roles.cache.find((role) => role.name === "Ruby");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === "😀") {

            const role = message.guild.roles.cache.find((role) => role.name === "C-lang");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }

          if (!user.bot && reaction.emoji.name === "😁") {

            const role = message.guild.roles.cache.find((role) => role.name === "Elixir");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);



            if (!member.roles.cache.has(role.name) && role) {
              member.roles.add(role);
            }
          }
        });

        messageClient.on('messageReactionRemove', (reaction, user) => {
          if (!user.bot && reaction.emoji.name === emojiIcons.js) {

            const role = message.guild.roles.cache.find((role) => role.name === "Javascript");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);
          }

          if (!user.bot && reaction.emoji.name === emojiIcons.python.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "Python");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);
          }

          if (!user.bot && reaction.emoji.name === emojiIcons.java.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "Java");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === emojiIcons.html.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "HTML-CSS");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === "🟠") {

            const role = message.guild.roles.cache.find((role) => role.name === "C-sharp");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === emojiIcons.rust.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "PHP");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === "🔴") {

            const role = message.guild.roles.cache.find((role) => role.name === "Kotlin");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === emojiIcons.rust.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "Rust");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === "🟡") {

            const role = message.guild.roles.cache.find((role) => role.name === "Haskell");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === "🟦") {

            const role = message.guild.roles.cache.find((role) => role.name === "Lua");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === "🟩") {

            const role = message.guild.roles.cache.find((role) => role.name === "Assembly");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === "🟧") {

            const role = message.guild.roles.cache.find((role) => role.name === "GO-lang");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === emojiIcons.ruby.name) {

            const role = message.guild.roles.cache.find((role) => role.name === "Ruby");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);

          }

          if (!user.bot && reaction.emoji.name === "😀") {

            const role = message.guild.roles.cache.find((role) => role.name === "C-lang");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);
          }

          if (!user.bot && reaction.emoji.name === "😁") {

            const role = message.guild.roles.cache.find((role) => role.name === "Elixir");
            console.log(role);
            const member = message.guild.members.cache.find((member) => member.id === user.id);




            member.roles.remove(role);
          }
        });
      });


    }

    if (command == "help") {

      message.reply({embed: {
        color: 3066993,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "EVA Unit-00 ONLINE",
        description: "Olá, sou a EVA Unit-00, bot oficial da NERV Open Source",
        fields: [{
          name: '!play <url youtube>',
          value: "Reprodiz o audio do vídeo requisitado no canal de voz"
        },
        {
          name: '!leave',
          value: "Para o reprodução e saí do canal de voz"
        },
        {
          name: "!roles",
          value: "Verifica e pega cargos no servidor"
        }
      ]
      }})
    }
  } catch (ex) {
    message.reply("Ocorreu um erro interno, por favor relate isso aos moderadores.");
  }
})

client.login(process.env.API_TOKEN);