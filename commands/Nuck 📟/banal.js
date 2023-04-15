const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionsBitField
} = require("discord.js");
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: 'banal',
  aliases: ['ban all members','ba'],
  category: 'Nuck 📟',
  description: 'Ban all members.',
  usage: "",
  cooldown: 8,
run: async function(client, message, args, prefix){
  let db = client.db;
  if(!message.member.permissions.has([PermissionsBitField.Flags.Administrator]) && !client.config.owner.some(r => r.includes(message.author.id))) return errorMessage(client, message, `> You can't use this command.`)
  try{
    let msg = await message.reply({
      content: `${client.emotes.start}| Starting ban all members.`
    })
    try{
      message.guild.members.cache.forEach(async(m)=>{
          try{
            await message.guild.members.ban(m.user.id, `Nucking guild.`)
          }catch{
          }
      })//.then(()=>{
        msg.edit({
          content: `${client.emotes.trash}| All members has been baned.`
        //})
      })
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