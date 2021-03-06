import DuckClient from "./Client/DuckClient";
import config from "./config/config";

const client = new DuckClient({
  prefix: config.prefix,
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
  token: process.env.TOKEN,
  owners: config.owners,
});

client.loadCommandOnFolder(__dirname + "/commands", "js");
client
  .on("messageCreate", (msg) => {
    if (
      !msg.content.startsWith(client.prefix) ||
      msg.author.bot ||
      msg.channel.type === "DM"
    )
      return;
    client.dokdo.run(msg);

    const args: string[] = msg.content
      .slice(client.prefix.length)
      .trim()
      .split(/ +/);
    const shift: any = args.shift();
    const commandName = shift.toLowerCase();

    const command: any =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd: any) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    try {
      command.execute(client, msg, args);
    } catch (error) {
      console.error(error);
    }
    if (!client.commands.has(commandName)) return;
  })
  .setup()
  .then(() => client.start());
