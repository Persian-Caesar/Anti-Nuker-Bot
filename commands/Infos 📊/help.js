const { 
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder, 
  PermissionsBitField,
  ButtonStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType
 } = require('discord.js');
const {
  HelpCategoryEmbed,
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: 'help',
  description: 'Show to you about bot info and commands.',
  category: 'Infos 📊',
  cooldown: 2,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  aliases: ['h','help me'],
  usage: "",
  run: async (client, message, args, prefix) => {
  let command_name = args.slice(1).join(" ");
  let help = new EmbedBuilder()
   .setAuthor({ 
      name: `${client.user.username} Help`
   })
   .setFooter({ 
      text: `Requested by ${message.author.tag}`, 
      iconURL: message.author.displayAvatarURL({ dynamic: true }) 
   })
   .setColor(client.colors.none)
   .addFields([{
     name: `About me:`,
     value: `>>> Hi👋🏻, I'm **[${client.user.username}](${client.config.discord.invite})${client.emotes.hack}**\n With my help, you can nuck all servers you want, support for message commands and other things${client.emotes.learn}`,
     inline: false
   },{
     name: `My prefix:`,
     value: `>>> In here my prefix is: **"\`${prefix}\`"** \n use for send help menu: **"\`${prefix}help\`"**`
   },{
     name: `How See Commands:`,
     value: `>>> With selecting one of the options from the menu below you can see information about commands in those categories.`,
     inline: false
   }])
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

  if(command_name) {
    const cmd = client.messageCommands.get(command_name.toLowerCase());
    if(!cmd || !cmd.name){
        return message.reply({ content: `**${client.emotes.error}| It seems like \`${command_name.toLowerCase()}\` is not a valid command! Please try Again!**`, ephemeral: true })
    }
    const embed = new EmbedBuilder()
      .setColor(client.colors.none)
      .setAuthor({ 
        name: `${client.user.username} Help`
      })
      .setFooter({ 
        text: `Requested by ${message.author.tag} • for more info use ${prefix}help`, 
        iconURL: message.author.displayAvatarURL({ dynamic: true }) 
      })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

    let component = [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])]
    let cmds = client.application.commands.cache.find(c => c.name === cmd.name);
    embed.setTitle(`${prefix}${cmds.id}`)
    let fields = [{
        name: 'Name:', 
        value: `${cmd.name}`
    },{
        name: 'Description:', 
        value: `${cmd.description || 'No Description provided!'}`
    },{
        name: 'Category:', 
        value: `${cmd.category}`
    }]
    if(cmd.cooldown){
       fields.push({
         name: 'Cooldown:',
         value: `**\`${cmd.cooldown} Seconds\`**`
        })
    }
    if(cmd.aliases){
       fields.push({
         name: 'Aliases:',
         value: `**${cmd.aliases.map(a=> `\`${a}\``).join(', ')}**`
        })
    }
    if(cmd.userPermissions){
       fields.push({
         name: 'Permissions Need To User:',
         value: `**[ ${cmd.userPermissions.map(i => { return `\`${i}\`` }).join(" , ")} ]**`
        })
    }
    if(cmd.botPermissions){
       fields.push({
         name: 'Permissions Need To Bot:',
         value: `**[ ${cmd.botPermissions.map(i => { return `\`${i}\`` }).join(" , ")} ]**`
        })
    }
    embed.addFields(fields)
    return message.reply({ 
        embeds: [embed], 
        components: component
    })
  }else{
    let menu_options = [{
              label: 'Infos Help',
              value: 'Infos 📊',
              emoji: '📊',
    },{
              label: 'Nuck Help',
              value: 'Nuck 📟',
              emoji: '📟',
    }]
    let help_menu = new StringSelectMenuBuilder()
     .setCustomId("help_menu")
     .setMaxValues(1)
     .setMinValues(1)
     .setPlaceholder(`${client.emotes.help}| Click me for select !!`)
     .addOptions(menu_options)
    
    let home_btn = new ButtonBuilder()
     .setStyle(ButtonStyle.Success)
     .setLabel('Home Page')
     .setEmoji(client.emotes.home)
     .setCustomId("home_page")

    let component_1 = [new ActionRowBuilder().addComponents(help_menu.setDisabled(false)),new ActionRowBuilder().addComponents(home_btn.setDisabled(true),new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")),new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))];
    
    const embedMessage = await message.reply({
      embeds: [help], 
      components: component_1
    })
    const collector = embedMessage.createMessageComponentCollector({ time: 70000 });
    collector.on('collect', async (m) => {
         if(m.user.id === message.author.id){
         if(m.isButton()){
          if(m.customId === "home_page"){
            m.update({
              embeds: [help],
              components: component_1
            })
          }
         }
         if(m.isStringSelectMenu()){
           if(m.customId === "help_menu"){      
             m.values.forEach((value)=>{
               return HelpCategoryEmbed(prefix, value, client, m, [new ActionRowBuilder().addComponents(help_menu.setDisabled(false)),new ActionRowBuilder().addComponents(home_btn.setDisabled(false),new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")),new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))])
             })
           }
         }
         }else{
         return errorMessage(client, m, `This message only for ${message.author} and you can't use it.\nfor use components send this: "\`.help\`"`)
         }
    })
    setTimeout(()=>{ return embedMessage.edit({  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true),new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")),new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))] })},70000)
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