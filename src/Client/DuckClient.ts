import dotenv from "dotenv";
dotenv.config();
import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import Dokdo from "dokdo";

class DuckClient extends Client {
  dokdo: any;
  prefix: string;
  constructor(options: any) {
    super(options);
    this.prefix = options.prefix;
    this.token = options.token;
  }

  private async loadCommands() {
    const commandFolders = readdirSync(__dirname + "/../commands");

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(__dirname + `/../commands/${folder}`);
      for (const file of commandFiles) {
        const command = require(__dirname + `/../commands/${folder}/${file}`);
        this.commands.set(command.name, command);
      }
    }
  }

  public commands = new Collection();

  private DuckVer = require(process.cwd() + "/package.json").version;

  public async start() {
    this.dokdo = new Dokdo(this, {
      prefix: this.prefix,
      noPerm: (msg) =>
        msg.reply("당신은 개발자가 아니라서 해당 명령어를 수행할수 없습니다."),
      aliases: ["dokdo", "dok"],
    });
    this.loadCommands();
    this.login();
    this.on("ready", () => {
      console.log(`Login ${this.user!.username}`);
      console.log(`Version ${this.DuckVer}`);
      console.log("====================");
      const Status = [`${this.prefix}도움말`, `version: ${this.DuckVer}`];
      let index = 0;
      setInterval(() => {
        if (index === Status.length) index = 0;
        const status1 = Status[index];
        this.user!.setActivity(status1, {
          type: "PLAYING",
        });
        index++;
      }, 5000);
    });
  }
}

export default DuckClient;
