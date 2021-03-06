import pretty from "pretty-ms";
import { MessageEmbed } from "discord.js";

export = {
  name: "업타임",
  execute: async (client: any, msg: any, args: any) => {
    const Embed = new MessageEmbed()
      .setColor(0x000000)
      .setTitle(`${client.user.username}의 업타임`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(pretty(client.uptime))
      .setTimestamp(Date.now())
      .setFooter(msg.author.tag, msg.author.displayAvatarURL());
    msg.channel.send({ embeds: [Embed] });
  },
};
