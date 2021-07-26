import dotenv from 'dotenv';
dotenv.config();
import { client } from '../Bot/Bot';
const DuckVer = require('../../package.json');

function botSetActivity() {
    client.user!.setActivity(`!도움말을 쳐보아라. | version: ${DuckVer.version}`, { type: "PLAYING" });
};

function login() {
    client.login(process.env.TOKEN);

    client.on('ready', () => {
        console.log(`Login ${client.user!.username}`);
        console.log("====================");
        botSetActivity();
    });
}

export default login;