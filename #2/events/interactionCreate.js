module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`Command not found: ${interaction.commandName}`);
            return;
        }

        if (!interaction.guild && !command.dm) {
            return interaction.reply({ content: 'This command is not available in DMs.', ephemeral: true });
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing command ${interaction.commandName}:`, error);
            await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
        }
    },
};
