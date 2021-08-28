import dotenv from "dotenv";
dotenv.config();
import { commandHandlerClient } from "@migan/discord.js-commandhandler";
import Dokdo from "dokdo";

class DuckClient extends commandHandlerClient {
  dokdo: any;
  owners: any;
  constructor(options: any) {
    super(options);
    this.token = options.token;
    this.owners = options.owners;
  }

  public version = require(process.cwd() + "/package.json").version;

  public async setup() {
    this.dokdo = new Dokdo(this, {
      prefix: this.prefix,
      noPerm: (msg) =>
        msg.reply("당신은 개발자가 아니라서 해당 명령어를 수행할수 없습니다."),
      aliases: ["dokdo", "dok", "eval"],
    });
  }

  public async start() {
    this.login();
    this.on("ready", () => {
      console.log(
        this.commands.map((c: any) => c.name).join(", ") + " Load Success"
      );
      console.log(`Login ${this.user!.username}`);
      console.log(`Version ${this.version}`);
      console.log("====================");
      const Status = [`${this.prefix}도움말`, `version: ${this.version}`];
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
