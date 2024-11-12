const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const deployCommands = async () => {
    const rest = new REST().setToken(token);

    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
        console.log('Successfully deleted all guild commands.');

        await rest.put(Routes.applicationCommands(clientId), { body: [] });
        console.log('Successfully deleted all global commands.');

        const commands = [];
        const loadedCommands = [];

        const foldersPath = path.join(__dirname, 'commands');
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);

                if ('data' in command && 'execute' in command) {
                    commands.push(command.data.toJSON());
                    loadedCommands.push(command.data.name);
                } else {
                    console.log(`Invalid command in ${filePath}`);
                }
            }
        }

        console.log('Loaded commands:', loadedCommands.join(', '));

        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        console.error(error);
    } finally {
        console.log("Exiting...");
        process.exit();
    }
};

deployCommands();
