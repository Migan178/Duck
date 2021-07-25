import { Client } from 'discord.js';
import Dokdo from 'dokdo';
import login from '../utils/Login';
import DokdoNoPerm from '../utils/NoPerm';
import load from '../utils/commandLoad';

const prefix: string = "!"; // 여기 있는 prefix 변경
const client = new Client();
const DokdoHandler = new Dokdo(client,
    {
        aliases: ['dokdo', 'dok'],
        prefix: `${prefix}`,
        noPerm: DokdoNoPerm
    }
);




function bot() {
    login();
    load();
}

export { bot, client, prefix, DokdoHandler };