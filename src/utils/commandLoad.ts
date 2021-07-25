import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { prefix, client, DokdoHandler } from '../Bot/Bot';

function load() {
    let client_commands: any = new Collection();
    
    let client_commands_load = (dir: any) => {
        for (const file of readdirSync(dir)) {
            const cmd = require(`../commands/${file}`);
            client_commands.set(cmd.name, cmd);
        }
        console.log(client_commands.map((c: { name: any; }) => c.name).join(', ') + ' Load Success');
    }
    
    client_commands_load(__dirname + "/../commands");

    client.on('message', msg => {
        if (msg.author.bot) return;
        DokdoHandler.run(msg);
        if (!msg.content.startsWith(prefix)) return;
        if (msg.content.slice(0, prefix.length) !== prefix) return;
    
    
        const args: string[] = msg.content.slice(prefix.length).trim().split(/ +/g);
        const shift: any = args.shift();
        const command = shift.toLowerCase();
    
        let cmd: any = client_commands.get(command);
    
        if (cmd) cmd.run(client, msg, args);
    });
};

export default load;