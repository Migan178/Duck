import dotenv from 'dotenv';
dotenv.config();
import { client } from './Bot';

function login() {
    client.login(process.env.TOKEN);
}

export default login;