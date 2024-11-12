const { Client, Collection, IntentsBitField, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const util = require('util');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        try {
            const command = require(filePath);
            console.log(`Loaded command from ${filePath}:`, command, util.inspect(command, { depth: 1 }));

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        } catch (error) {
            console.log(`Error loading command from ${filePath}:`, error);
        }
    }
}

const loadEvents = (dir) => {
    const eventFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(dir, file);
        const fileName = path.basename(file);
        const event = require(filePath);
        if (event.name) {
            if (event.once) {
                client.once(event.name, (...args) => {
                    console.log(`Registered event: ${fileName}`);
                    event.execute(...args, client);
                });
            } else {
                client.on(event.name, (...args) => {
                    console.log(`Registered event: ${fileName}`);
                    event.execute(...args, client);
                });
            }
        }
    }

    const subdirs = fs.readdirSync(dir).filter(subdir => fs.statSync(path.join(dir, subdir)).isDirectory());
    for (const subdir of subdirs) {
        loadEvents(path.join(dir, subdir));
    }
};

loadEvents(path.join(__dirname, 'events'));

client.login(token);