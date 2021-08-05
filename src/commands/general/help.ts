import { MessageEmbed } from "discord.js";
import { prefix, owners } from "../../config/config";

const DuckVer = require("../../../package.json");

module.exports = {
  name: "도움말",
  run: async (client: any, msg: any, args: any) => {
    const owner = client.users.cache.get(owners);
    const Embed = new MessageEmbed()
      .setColor(0x000000)
      .setTitle(`${client.user!.username}의 도움말`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        `접두사: \`\`${prefix}\`\`\n버젼: \`\`${DuckVer.version}\`\``
      )
      .addFields(
        {
          name: "개발자",
          value: `${owner.tag}(${owner.id})`,
        },
        {
          name: "일반",
          value: `\`\`\`
핑
업타임
도움말\`\`\``,
        },
        {
          name: "관리",
          value: `\`\`\`
킥
벤\`\`\``,
        }
      )
      .setTimestamp(Date.now())
      .setFooter(msg.author.tag, msg.author.displayAvatarURL());
    msg.reply("여기 도움말 있습니다.", Embed);
  },
};
