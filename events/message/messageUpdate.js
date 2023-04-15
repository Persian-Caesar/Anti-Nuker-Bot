const { 
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  Collection,
  ButtonStyle,
  PermissionsBitField,
  SelectMenuBuilder
} = require("discord.js");
const {
  HelpCategoryEmbed,
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = async (client, oldmessage, message) => {
//======== Command for shows the prefix ========
    if (message.author.bot || !message.guild) return;//a direct message between users

 //======== Command Prefix & args ========
  const Tprefix = `${client.prefix}`;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Tprefix)})\\s*`);
  if(!prefixRegex.test(message.content)) return;

  const [ prefix] = message.content.match(prefixRegex);
  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command = client.messageCommands.get(commandName) || client.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if(commandName.length > 0){
      if (!command||!command.name||!command.aliases) {
        return //message.reply(`**${client.emotes.error}| It seems like \`${commandName}\` is not a valid command! Please try Again!**`)
      }
  }

  //============ Check Perm
      if(!message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.SendMessages])) return message.author.send({content: `${client.emotes.error}| I am missing the Permission to \`SendMessages\` in ${message.channel}`,});
  if(!message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.UseExternalEmojis]))  return message.reply({content: `${client.emotes.error}| I am missing the Permission to \`UseExternalEmojis\` in ${message.channel}`});
  if(!message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.EmbedLinks])) return message.reply({ content: `${client.emotes.error}| I am missing the Permission to \`EmbedLinks\` in ${message.channel}` });
  
//======== Command Cooldown ========
  if(!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 5) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
          return message.reply({
            embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`**${client.emotes.alert}| Please wait <t:${Math.floor((new Date().getTime() + Math.floor(timeLeft * 1000))/1000)}:R> before reusing the \`${command.name}\` command!**`)],
          })
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
  
//======== Command Handler ========
try{
  if (command) command.run(client, message, args, Tprefix);
 } catch {
 } 
};
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */