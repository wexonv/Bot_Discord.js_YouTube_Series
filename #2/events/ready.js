const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {
        console.log(`${client.user.tag} is online!`);

        client.user.setActivity('Hi! 👋', { type: ActivityType.Custom });
        console.log('Status imlemented correctly! ⚙️');
    }
};