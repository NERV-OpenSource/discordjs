const ytdl = require("ytdl-core-discord");

const execute = (client, msg, args) => {
  const voiceChat = msg.member.voice;
  const url = args[1];

  if (!voiceChat.channelID) {
    msg.reply("Você precisa estar em um canal de voz para utilizar esse comando");
    return;
  }

  voiceChat.channel.join().then((connection) => {
    connection.play(await ytdl(url), { type: 'opus' });
  });
};

module.exports = {
  name: "play",
  help: "Reproduz a música desejada no canal atual do usuário",
  execute,
};