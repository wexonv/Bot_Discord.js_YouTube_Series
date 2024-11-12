const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');
const { Component } = require('discord.js');

const data = new SlashCommandBuilder()
.setName('help')
.setDescription('Displays helpful information!')

const execute = async (interaction) => {

    const embed = new EmbedBuilder()
    .setTitle('Help?')
    .setDescription('Hi, this is my help command!')
    .setFooter({ text: 'Discord Bot' });

    const links = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setEmoji('👋')
        .setStyle(ButtonStyle.Link)
        .setLabel('Link')
        .setURL('https://discord.com')
    );

    await interaction.reply({ embeds: [embed], components: [links], ephemeral: true });
};

module.exports = {
    data,
    execute,
};