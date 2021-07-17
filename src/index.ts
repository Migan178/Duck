import { Client } from 'discord.js';
import Dokdo from "dokdo";

const { TOKEN } = require('../config.json');
const client = new Client();
const prefix = "!";
const DokdoHandler = new Dokdo(client, { aliases: ['dokdo', 'dok', "독도", "debug", "debugging"], prefix: '!', noPerm: (message) => message.reply("어라? 당신은 개발자가 아닌데요?") });

client.login(TOKEN).then();

client.on('ready', () => {
    console.log("봇");
});

client.on('message', msg => {
    if (msg.author.bot) return;
    DokdoHandler.run(msg).then();
    if (msg.content === `${prefix}ping`) return msg.reply("pong");
});