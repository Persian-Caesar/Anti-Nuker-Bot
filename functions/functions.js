const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder, 
  ButtonStyle,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
module.exports = {
  errorMessage: async function(client, interaction, error){
    let member = interaction.guild.members.cache.find(m=> m.id === interaction.member.id);
    return interaction.reply({
        embeds: [new EmbedBuilder().setTitle('⛔️| **We Got An Error**').setColor(client.colors.red).setDescription(`${error}`).setFooter({ text: `Requested by ${member.user.tag} • Error • ${client.embed.footerText}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(interaction.guild.iconURL({ dynamic: true }))],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Error").setEmoji("⚠️").setCustomId("error").setDisabled(true))], 
        ephemeral: true,
    })
  },
  HelpCategoryEmbed: async function(prefix, CategoryName, client, message, component){
     let member = message.guild.members.cache.find(m=> m.id === message.member.id);
     let embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setAuthor({ 
        name: `${client.user.username} Help`
      })
      .setTitle(`${CategoryName}`)
      .setFooter({ 
        text: `Requested by ${member.user.tag}`, 
        iconURL: member.user.displayAvatarURL({ dynamic: true }) 
      })
      .setColor(client.colors.none)

     let value_1 = "";
     let value_2 = "";
     client.messageCommands.filter(c => c.category === CategoryName).forEach((cmd)=>{
       value_1 += `\n\n**${prefix}${cmd.name} ${cmd.usage? cmd.usage : ""}**\n**Aliases: [${cmd.aliases? cmd.aliases.map(a=> `\`${a}\``).join(', ') : "`no aliases`"}]\nDescription: \`${cmd.description}\`**`
     })
     /*client.slashCommands.filter(c => c.category === CategoryName).forEach((cmd)=>{
        let cm = client.application.commands.cache.find(c => c.name === cmd.name)
        let name = []
        let bb = cm.options? cm.options.some(op=> op.type === ApplicationCommandOptionType.Subcommand)? cm.options.map((option)=>{ name.push(cm.name +" "+ option.name)}) : name.push(`${cm.name}`) : name.push(`${cm.name}`)
        name.forEach(nm=>{
          value_2 += `\n\n**${`</${nm}:${cm.id}>`}**\n**Description: \`${cm.options.some(op=> op.type === ApplicationCommandOptionType.Subcommand)? cm.options.map(op=> op.name === nm.slice(`${cm.name} `.length)? op.description : "").join("") : `${cm.description}`}\`**`;
        })
     })*/
     embed.addFields([{
        name: `Message Commands:`, 
        value: `${value_1? value_1 : "`No message commands.`"}`, 
        inline: false 
     },{
        name: `Slash Commands:`, 
        value: `${value_2? value_2 : "`No slash commands.`"}`, 
        inline: false 
     }]);
     return message.update({
        embeds: [embed],
        components: component
     })
  },
  wait: async function(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
            }
  },
  epochDateNow: async function (){
  const TimeStampDate = Date.parse(new Date()) / 1000;
  return TimeStampDate
  },
  epochDateCustom: async function (date){
  const TimeStampDate = Date.parse(date) / 1000;
  return TimeStampDate
  },
  formatDate: function (date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  },
  randomRange: async function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
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