import Bot from "./Bot";

const config = require("../config.json");
const bot = new Bot({
  token: config.token,
  prefix: config.prefix,
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

bot.start();
