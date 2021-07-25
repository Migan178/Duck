import dotenv from 'dotenv';
dotenv.config();
import { client } from '../Bot/Bot';
const DuckVer = require('../../package.json');

function botSetActivity() {
    client.user!.setActivity(`!도움말을 쳐보아라. | version: ${DuckVer.version}`, { type: "PLAYING" });
};

async function ownerDmSend() {
    const ownersId: string = "415135882006495242"; // 여기에 있는 id 는 수정해 주셔야 합니다.
    const owners = await client.users.fetch(ownersId);
    await owners.send('Bot ready');
};

function login() {
    client.login(process.env.TOKEN);

    client.on('ready', () => {
        console.log(`Login ${client.user!.username}`);
        console.log("====================");
        botSetActivity();
        ownerDmSend();
    });
}

export default login;