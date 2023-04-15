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
  name: 'serverlist',
  aliases: ['sl'],
  category: 'Owner 👑',
  description: 'Showba list of bot guilds join in.',
  usage: "",
  cooldown: 2,
  run: async function(client, message, args, prefix){
  let db = client.db;
  if(!client.config.owner.some(r => r.includes(message.author.id))) return errorMessage(client, message, `> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`)
  try{
    
const backId = 'back'
const forwardId = 'forward'
const backButton = new ButtonBuilder({
  style: ButtonStyle.Secondary,
  label: 'Back',
  emoji: '⬅️',
  customId: backId
})
const forwardButton = new ButtonBuilder({
  style: ButtonStyle.Secondary,
  label: 'Forward',
  emoji: '➡️',
  customId: forwardId
})
const guilds = [...client.guilds.cache.values()]
let page = 1
const generateEmbed = async start => {
  const current = guilds.sort((a, b) => b.memberCount - a.memberCount).slice(start, start + 12)
  let embed = new EmbedBuilder({
    title: `Page - ${page}/${Math.ceil(client.guilds.cache.size / 12)} | All Guilds: ${(guilds.length).toLocaleString()}`,
    fields: await Promise.all(
      current.sort((a, b) => b.memberCount - a.memberCount).map(async guild => ({
        name: `${guild.name}`,
        value: `**ID:** \`${guild.id}\`\n**Owner:** \`${(await guild.fetchOwner()).user.tag}\`\n**Members:** __${(guild.memberCount).toLocaleString()}__`,
        inline: true
      }))
    )
  })
  return embed.setColor(client.colors.none)
}
const canFitOnOnePage = guilds.length <= 12
const embedMessage = await message.reply({
  embeds: [await generateEmbed(0)],
  components: canFitOnOnePage? [] : [new ActionRowBuilder({components: [forwardButton]})],
  ephemeral: true
})
if (canFitOnOnePage) return;
const collector = embedMessage.createMessageComponentCollector({
  filter: ({user}) => user.id === message.author.id,
  time: 60000
})

let currentIndex = 0;
collector.on('collect', async int => {
  int.customId === backId ? (currentIndex -= 12) : (currentIndex += 12)
  int.customId === backId ? (page -= 1) : (page += 1)
  await int.update({
    embeds: [await generateEmbed(currentIndex)],
    components: [new ActionRowBuilder({ components: [...(currentIndex ? [backButton] : []), ...(currentIndex + 12 < guilds.length ? [forwardButton] : [])] })]
  })
})
collector.on('end', async ()=>{
  msg.delete()
})
      
  }catch(e) {
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