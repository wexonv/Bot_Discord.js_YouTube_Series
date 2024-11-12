const { Client, Collection, IntentsBitField, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

client.commands = new Collection();

client.on('messageCreate', async (message) => {
    try {
        if (message.author.bot) return;

        const botMention = `<@${message.client.user.id}>`;

        if (message.content.trim() === botMention) {
            const embed = new EmbedBuilder()
            .setTitle('Hello there!')
            .setDescription('This is my  Discord.js Bot!');

        console.log('Sending reply for mention:', message.content);

        await message.reply({
            embeds: [embed],
            allowedMentions: { parse: [] }
        });
        }
   if (message.content.toLowerCase() === '!ping') {
    const command = client.commands.get('ping');
    if (command) { 
        await command.execute(message);
    }
   }
    } catch (error) {
        console.error('Error during messageCreate event:', error);
    }
});

client.login(token);
console.log('Hi I\'m online!')