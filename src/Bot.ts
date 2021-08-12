import { Client, Collection } from "discord.js";
import Dokdo from "dokdo";
import { readdirSync } from "fs";
const { prefix } = require("../config.json");
const DuckVer = require("../package.json").version;

class Bot extends Client {
  commands: any;
  dokdo: any;
  prefix: any;
  constructor(options: any) {
    super(options);
    this.token = options.token;
    this.commands = new Collection();
    this.prefix = prefix;
  }

  async start() {
    this.login();
    this.on("ready", () => {
      console.log(`Login ${this.user!.username}`);
      console.log("====================");
    });
    const Status = [`${prefix}도움말`, `version: ${DuckVer}`];
    let index = 0;
    setInterval(() => {
      if (index === Status.length) index = 0;
      const status1 = Status[index];
      this.user!.setActivity(status1, {
        type: "PLAYING",
      });
      index++;
    }, 5000);

    const commandFolders = readdirSync(__dirname + "/commands");

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(
        __dirname + `/commands/${folder}`
      ).filter((file) => file.endsWith(".ts"));
      for (const file of commandFiles) {
        const command = require(__dirname + `/commands/${folder}/${file}`);
        this.commands.set(command.name, command);
      }
    }
    this.dokdo = new Dokdo(this, {
      prefix: this.prefix,
      aliases: ["dokdo", "dok"],
      noPerm: (msg) => {
        msg.reply("당신은 개발자가 아니라서 해당 명령어를 수행할수 없습니다.");
      },
    });

    this.on("messageCreate", (msg) => {
      if (!msg.content.startsWith(this.prefix) || msg.author.bot) return;
      this.dokdo.run(msg);

      const args = msg.content.slice(prefix.length).trim().split(/ +/);
      const shift: any = args.shift();
      const commandName = shift.toLowerCase();

      const command =
        this.commands.get(commandName) ||
        this.commands.find(
          (cmd: any) => cmd.aliases && cmd.aliases.includes(commandName)
        );

      if (!command) return;

      const client = this;

      try {
        command.execute(client, msg, args);
      } catch (error) {
        console.error(error);
      }
      if (!this.commands.has(commandName)) return;
    });
  }
}

export default Bot;
