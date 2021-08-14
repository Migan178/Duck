import { MessageEmbed } from "discord.js";

const DuckVer = require("../../../package.json").version;

module.exports = {
  name: "도움말",
  execute: async (client: any, msg: any, args: any) => {
    const owner = client.users.cache.get(client.owners);
    const Embed = new MessageEmbed()
      .setColor(0x000000)
      .setTitle(`${client.user!.username}의 도움말`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        `접두사: \`\`${client.prefix}\`\`\n버젼: \`\`${DuckVer}\`\``
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
밴\`\`\``,
        }
      )
      .setTimestamp(Date.now())
      .setFooter(msg.author.tag, msg.author.displayAvatarURL());
    msg.reply({ embeds: [Embed] });
  },
};
