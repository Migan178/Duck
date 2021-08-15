import { MessageEmbed } from "discord.js";

export = {
  name: "청소",
  aliases: ["채팅청소", "clear"],
  execute: async (client: any, msg: any, args: any) => {
    if (!msg.member.permissions.has("MANAGE_MESSAGES"))
      return msg.reply("당신은 권한이 부족해요!");
    if (!args[0]) return msg.reply("지울 메세지의 갯수를 입력해 주세요.");
    if (isNaN(args[0])) return msg.reply("숫자를 입력해 주세요.");
    if (args[0] > 100) return msg.reply("100개 이상은 지울수 없어요.");
    if (args[0] < 1) return msg.reply("1이상으로 해주세요.");

    await msg.channel.messages
      .fetch({ limit: args[0] })
      .then((messages: any) => {
        msg.channel.bulkDelete(messages);
      });
    msg.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor(0x000000)
          .setTitle("채팅 청소")
          .setDescription(
            `관리자 ${msg.author.username}님의 요청으로 채팅 ${args[0]}개가 삭제되었습니다.`
          )
          .setTimestamp(Date.now())
          .setFooter(
            `관리자: ${msg.author.tag}`,
            msg.author.displayAvatarURL()
          ),
      ],
    });
  },
};
