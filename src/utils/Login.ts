import dotenv from 'dotenv';
dotenv.config();
import { client } from '../Bot/Bot';
import { botSetActivity } from '../config/config';

function login() {
    client.login(process.env.TOKEN);

    client.on('ready', () => {
        console.log(`Login ${client.user!.username}`);
        console.log("====================");
        botSetActivity();
    });
}

export default login;