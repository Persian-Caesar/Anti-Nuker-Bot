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
  name: 'spamc',
  aliases: ['channel spam','spam channel','spc'],
  category: 'Nuck 📟',
  description: 'Spam channel in guild.',
  usage: "",
  cooldown: 8,
run: async function(client, message, args, prefix){
  let db = client.db;
  if(!message.member.permissions.has([PermissionsBitField.Flags.Administrator]) && !client.config.owner.some(r => r.includes(message.author.id))) return errorMessage(client, message, `> You can't use this command.`)
  try{
    let type = args[0];
    await message.reply({
      content: `${client.emotes.start}| Starting spam channel in guild.`
    })
    try{
      setInterval(()=>{
             try{
               message.guild.channels.create({
                 name: `spamming-channels`,
                 type: type === "voice"? ChannelType.GuildVoice : type === "category"? ChannelType.GuildCategory : type === "forum"? ChannelType.GuildForum : type === "announcement"? ChannelType.GuildAnnouncement : type === "text"? ChannelType.GuildText : ChannelType.GuildText,
                 reason: `nucking with spamming`,
                 topic: `Spamming channel`,
               })  
             }catch{
             }
      }, 1000)
    }catch(e){
      return errorMessage(client, message, `\`\`\`js\n${e}\n\`\`\``)
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