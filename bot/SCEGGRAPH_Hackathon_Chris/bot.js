console.log('Hello!');

const Discord = require('discord.js'); //
const client = new Discord.Client(); //
client.login('Nzk3MjA0MzY5NjczMDI3NjA2.X_jEbQ.C700-iPmV4NucnWRsNVyWMwADWE'); //Authentication with Token

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('Yo');
}

/* DO NOT USE, USE PROPER COMMAND HANDLING THORUGH DISCORD.JS
const commands = [
    '!help',                // Show all base commands
    '!shopping',            // Show available shopping options
    '!chores'               // Show available chore options

];


const shopping_commands = [
    'go',                  // Broadcast that you're gonna go shopping
    'list',                // Display shopping list
    'list add',             // Add to list
    'list image'
];
*/


client.on('message', gotMessage);

function gotMessage(msg) {
    console.log(msg.content);
    if (msg.content === '!help') {
        msg.reply('help');
    }
    else if (msg.content === '!shopping') {
        msg.reply('shopping')
    }
    else if (msg.content == )
}