import dotenv from 'dotenv';
dotenv.config();
import { Client, Collection } from 'discord.js';
import Dokdo from "dokdo";
import { PathLike, readdirSync } from 'fs';

const client = new Client();
const prefix: string = "!";
const DokdoHandler = new Dokdo(client, { aliases: ['dokdo', 'dok', "독도", "debug", "debugging"], prefix: '!', noPerm: (message) => message.reply("어라? 당신은 개발자가 아닌데요?") });

let client_commands: any = new Collection();

client.login(process.env.TOKEN).then();

client.on('ready', () => {
    console.log("봇");
});

let client_commands_load = (dir: PathLike) => {
    for (const file of readdirSync(dir)) {
        const cmd = require(`./commands/${file}`);
        client_commands.set(cmd.name, cmd);
    }
    console.log(client_commands.map((c: { name: any; }) => c.name).join(', ') + ' Load Success');
}

client_commands_load(__dirname + "/commands");


client.on('message', msg => {
    if (msg.author.bot) return;
    DokdoHandler.run(msg).then();
    if (!msg.content.startsWith(prefix)) return;
    if (msg.content.slice(0, prefix.length) !== prefix) return;


    const args: string[] = msg.content.slice(prefix.length).trim().split(/ +/g);
    const shift: any = args.shift();
    const command = shift.toLowerCase();

    let cmd: any = client_commands.get(command);

    if (cmd) cmd.run(client, msg, args);
});