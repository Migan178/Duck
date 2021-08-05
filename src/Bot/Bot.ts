import login from "../utils/Login";
import load from "../utils/commandLoad";
import { Client } from "discord.js";
import Dokdo from "dokdo";
import DokdoNoPerm from "../utils/NoPerm";
import { prefix } from "../config/config";

process.env.SHELL = "/bin/bash";

const client = new Client();
const DokdoHandler = new Dokdo(client, {
  aliases: ["dokdo", "dok"],
  prefix: `${prefix}`,
  noPerm: DokdoNoPerm,
});

function start() {
  login();
  load();
}

export { start, client, DokdoHandler };
