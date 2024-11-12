const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,

    async execute(message) {
        try {
            if (message.author.bot) return;

            const botMention = `<@${message.client.user.id}>`;
            if (message.content.trim() === botMention) {

                const embed = new EmbedBuilder()
                .setTitle('Hello there!')
                .setDescription('I\'m a bot, and I\'m here to help you!')
                .setFooter({ text: 'Discord Bot' });

                console.log('Sending reply for mention:', message.content);

                await message.reply({
                    embeds: [embed],
                    allowedMentions: { parse: [] }
                });
            }
        } catch (error) {
            console.error('Error during messageCreate events:', error);
        }
    }
};