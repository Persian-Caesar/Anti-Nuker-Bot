//======== Packages ========
require('dotenv').config()
const { 
  Client, 
  Collection,
  Partials,
  GatewayIntentBits
} = require('discord.js');
const clc = require("cli-color");
const fs = require('fs');
const client = new Client({
    restRequestTimeout: 120000,
    intents: [
     GatewayIntentBits.DirectMessages,
     GatewayIntentBits.Guilds,
     GatewayIntentBits.GuildBans,
     GatewayIntentBits.GuildMessages,
     GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
    shards: 'auto',
    allowedMentions: {
      parse: [
        "roles",
        "users", 
        "everyone"
      ],//mentions disable
      repliedUser: false,//disable mention in replying messages
    },
    ws:{
        properties: {
            browser: "Discord Android",//Discord Web | Discord Android | Discord Ios | Discord Client
            os: "Linux"//Other | Android | iOS | TempleOS | Linux | Mac OS X | Windows
        },
    },
});
client.config = require(`${process.cwd()}/storage/config.js`);
client.prefix = client.config.discord.prefix;
client.token = client.config.discord.token;
client.emotes = require(`${process.cwd()}/storage/emotes.json`);
client.colors = require(`${process.cwd()}/storage/colors.json`);
client.embed = require(`${process.cwd()}/storage/embed.json`);
client.categories = fs.readdirSync(`${process.cwd()}/commands`);
client.messageCommands = new Collection();
//client.slashCommands = new Collection();
client.cooldowns = new Collection();

//======== Loading Starts =========
var starts = fs.readdirSync(`${process.cwd()}/start`).filter(file => file.endsWith('.js'));
let counter = 0;
starts.forEach((file) => {
  require(`${process.cwd()}/start/${file}`)(client);
  counter += 1;
});
try {
  const stringlength = 69;
  console.log("\n")
  console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
  console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.magentaBright(counter)} Starts Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${counter} Starts Is Loaded!!`.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
  console.log("\n")
} catch { /* */ }

//======== Consol ========
if(client.token){
    client.login(client.token).catch(e => {
     console.log(clc.red("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!\n"))
   })
  } else {
   console.log(clc.red("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!"))   
  }

//========== Replit Alive
setInterval(() => {
     if(!client || !client.user) {
      client.logger("The Client Didn't Login Proccesing Kill 1")
        process.kill(1);
    } else {
   }
}, 10000); 
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */