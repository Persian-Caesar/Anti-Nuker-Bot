const { 
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder, 
  ButtonStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require('discord.js');
const {
   wait
} = require(`${process.cwd()}/functions/functions.js`);
module.exports = {
  name: 'ping',
  description: 'Get bot latency and ping.',
  category: 'Infos 📊',
  cooldown: 4,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  aliases: ['pong'],
  usage: "",
  run: async (client, message, args) => {
 let timer = 3000;
 var states = "🟢 Excellent";
 var states2 = "🟢 Excellent";
 var msg = `${Date.now() - message.createdTimestamp}`;
 var api = `${Math.round(client.ws.ping)}`;
 if (Number(msg) > 70) states = "🟢 Good";
 if (Number(msg) > 170) states = "🟡 Not Bad";
 if (Number(msg) > 350) states = "🔴 Soo Bad";
 if (Number(api) > 70) states2 = "🟢 Good";
 if (Number(api) > 170) states2 = "🟡 Not Bad";
 if (Number(api) > 350) states2 = "🔴 Soo Bad";
    
 let pingEmbed = new EmbedBuilder()
     .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.colors.none)
      .setDescription(`**Pong🏓!** \n 📱${client.user.username} Ping `)
      .addFields([{
        name: "**Time Taken:**",
        value: `\`${msg + " ms 📶 | " + states}\``,
        inline: true
      },{
        name: "**WebSocket:**", 
        value: `\`${api + " ms 📶 | " + states2}\``,
        inline: true
      }])
      .setTimestamp()
      .setFooter({text:`Requested by ${message.author.tag}`, iconURL:`${message.author.displayAvatarURL()}`});
    
   let pingingEmbed = new EmbedBuilder()
      .setColor(client.colors.none)
      .setDescription(`**Pinging...**`)
      .setTimestamp()
    
   let pingButton = new ButtonBuilder()
          .setDisabled(true)
          .setStyle(ButtonStyle.Primary)
          .setCustomId("loading")
          .setEmoji("🔃")
          .setLabel("Process Is Loading...")
    
   message.reply({ 
     embeds: [pingingEmbed],
     components: [new ActionRowBuilder().addComponents(pingButton)]
    }).then((m)=>{
        wait(200)
        m.edit({ embeds: [pingEmbed], components: [new ActionRowBuilder().addComponents(pingButton.setDisabled(true).setStyle(ButtonStyle.Success).setCustomId("pong").setEmoji("🏓").setLabel("Pong!!"))] })
    })
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