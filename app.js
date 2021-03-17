const Discord = require("discord.js");
require('dotenv/config');
const fs = require("fs");

function isAlreadyCounting(counter, memberId) {
  return counter[memberId] ? true : false;
}

function startNewCounter(memberId, counter) {
  counter[memberId] = 1;
}

function addNewMessageToCounter(memberId, counter) {
  counter[memberId] += 1;
}

function memberSended100OrMoreMessages(memberId, counter) {
  return counter[memberId] >= 100 ? true : false;
}

function memberHasRole(member, role) {
  return member.roles.cache.has(role.id) ? true : false;
}


const client = new Discord.Client();
client.commands = new Discord.Collection();
client.queues = new Map();

client.aliases = new Discord.Collection();

client.on("ready", () => {
  console.log(`Estou conectado como ${client.user.username}`);
});

client.on('message', async message => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

  // Moved to get the member object without check if is a command
  if (!message.member) message.member = await message.guild.fetchMember (message);

  const memberId = message.member.id;
  // Variable to count messages
  let messageCounter;

  if (isAlreadyCounting(messageCounter, memberId)) {
      addNewMessageToCounter(memberId, messageCounter);
  } else {
      startNewCounter(memberId, messageCounter);
  }

  // Object that stores the Active role
  let activeRole = message.guild.roles.cache.find(role => role.name = "Active");

  if (memberSended100OrMoreMessages(memberId, messageCounter) && !memberHasRole(message.member, activeRole)) {
      message.member.roles.add(activeRole);
  }

  if (command == "ping") {
    message.channel.send("Pong!");
  }

  message.execute();
});

client.login(process.env.TOKEN);