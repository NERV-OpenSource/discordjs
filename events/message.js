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

module.exports = async (client, message) => {
    if (message.author.bot) return;
    
    const prefix = process.env.BOT_PREFIX;

    if (!message.guild) return;

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

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    
    if (command)
        command.run(client, message, args);
}