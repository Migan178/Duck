import { Client, Collection } from 'discord.js';
import Dokdo from 'dokdo';
import { readdirSync } from 'fs';
import login from './Login';

const prefix: string = "!"; // 여기 있는 prefix 변경
const client = new Client();
const DokdoNoPerm = (msg: any) => {
    msg.reply("당신은 개발자가 아니라 해당 명령어를 수행할수 없습니다.");
};
const DokdoHandler = new Dokdo(client,
    {
        aliases: ['dokdo', 'dok'],
        prefix: `${prefix}`,
        noPerm: DokdoNoPerm
    }
);

function botSetActivity() {
    client.user!.setActivity('개발중', { type: "PLAYING" });
}

async function ownerDmSend() {
    const ownersId: string = "415135882006495242"; // 여기에 있는 id 는 수정해 주셔야 합니다.
    const owners = await client.users.fetch(ownersId);
    await owners.send('Bot ready');
};


function bot() {
    login();
    
    client.on('ready', () => {
        console.log(`Login ${client.user!.username}`);
        botSetActivity();
        ownerDmSend();
    });
    
    let client_commands: any = new Collection();
    
    let client_commands_load = (dir: any) => {
        for (const file of readdirSync(dir)) {
            const cmd = require(`./commands/${file}`);
            client_commands.set(cmd.name, cmd);
        }
        console.log(client_commands.map((c: { name: any; }) => c.name).join(', ') + ' Load Success');
    }
    
    client_commands_load(__dirname + "/commands");

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
}

// function botReady() {

// };



// async function botCommands() {

// }

export {
    bot,
    client
};