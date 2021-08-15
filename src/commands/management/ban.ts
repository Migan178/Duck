export = {
  name: "밴",
  execute: async (client: any, msg: any, args: any) => {
    if (!msg.member.permissions.has("BAN_MEMBERS"))
      return msg.channel.send("당신은 이 명령어를 사용할 권한이 없습니다.");
    const mentionMember = msg.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = " 없음";

    if (!args[0]) return msg.reply("밴할 사용자를 지정해야 해요.");
    if (!mentionMember)
      return msg.channel.send(
        "이 사용자는 유효하지 않거나 더 이상 서버에 없습니다."
      );
    if (!mentionMember.bannable)
      return msg.channel.send("이사용자는 밴을 할수없습니다.");

    await mentionMember
      .ban({
        reason: reason,
      })
      .then(() =>
        msg.channel.send(
          `성공적으로 밴을 하였습니다. 밴한 사용자: ${mentionMember.user.tag}`
        )
      );
  },
};
