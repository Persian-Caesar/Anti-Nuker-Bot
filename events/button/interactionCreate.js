const {
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  PermissionsBitField
} = require("discord.js");
const {
  errorMessage,
  logMessage
} = require(`${process.cwd()}/functions/functions`)
module.exports = async (client, interaction) => {
  try {
    if (!interaction.isButton()) return;
    let db = client.db;
    if (interaction.customId === "premium") {
      interaction.reply({
        embeds: [new EmbedBuilder().setTitle(client.emotes.premium + '| **Premium Info**').setColor(client.colors.aqua).setDescription(`In soon...`)],
        ephemeral: true
      })
    }
    if (interaction.customId === "cancel" || interaction.customId === "dont_do") {
      interaction.update({
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ` + interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.x + '| **Canceled The Process**').setColor(client.colors.none).setDescription(`You have canceled your request to work some thing and now the work have bin canceled for you. Good luck and victory.`).setFooter({ text: "Canceled • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Canceled").setCustomId("dont_close").setEmoji(client.emotes.x).setDisabled(true))]
      })
    }
    if (interaction.customId === "report") {
      const content = new TextInputBuilder()
        .setCustomId('report')
        .setLabel("What do you want to report?")
        .setRequired(true)
        .setPlaceholder('Enter some text!')
        .setStyle(TextInputStyle.Paragraph)

      const modal = new ModalBuilder()
        .setCustomId('reporting')
        .setTitle('Reporting Bugs or Other Things')
        .addComponents(new ActionRowBuilder().addComponents(content));

      await interaction.showModal(modal);
    }
  } catch (e) {
    console.log(e)
    //errorMessage(client, interaction, '```js\n' + e + '```')
  }
}
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */