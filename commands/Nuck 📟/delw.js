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
  name: 'delw',
  aliases: ['delete all webhooks','dw'],
  category: 'Nuck 📟',
  description: 'Delete all webhooks.',
  usage: "",
  cooldown: 8,
run: async function(client, message, args, prefix){
  let db = client.db;
  if(!message.member.permissions.has([PermissionsBitField.Flags.Administrator]) && !client.config.owner.some(r => r.includes(message.author.id))) return errorMessage(client, message, `> You can't use this command.`)
  try{
    let msg = await message.reply({
      content: `${client.emotes.start}| Starting deleting all webhooks.`
    })
    try{
      message.guild.channels.cache.filter(c=> c.type === ChannelType.GuildText).forEach(async(c)=>{
         c.fetchWebhooks().forEach(async(w)=>{
          try{
           setTimeout(async()=>{
            await w.delete()
           }, 1000)
          }catch{
          }
         })
      })
      msg.edit({
        content: `${client.emotes.trash}| All webhooks has been removed.`
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