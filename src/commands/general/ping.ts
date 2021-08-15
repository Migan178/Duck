import { MessageEmbed } from "discord.js";

export = {
  name: "핑",
  execute: async (client: any, msg: any) => {
    const Embed = new MessageEmbed()
      .setTitle(":ping_pong:퐁!")
      .setDescription(
        `웹소켓 핑: \`${client.ws.ping}\`ms\n메세지 핑: \`${
          Date.now() - msg.createdTimestamp
        }\`ms`
      )
      .setColor(0x000000)
      .setTimestamp(Date.now())
      .setFooter(msg.author.tag, msg.author.displayAvatarURL());
    msg.channel.send({ embeds: [Embed] });
  },
};
