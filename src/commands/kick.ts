module.exports = {
    name: "킥",
    run: async (client: any, msg: any, args: any) => {
        if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send("당신은 이 명령어를 사용할 권한이 없습니다.");
        const mentionMember = msg.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if (!reason) reason = " 없음";

        if (!args[0]) return msg.reply("킥할 사용자를 지정합니다.");
        if (!mentionMember) return msg.channel.send("이 사용자는 유효하지 않거나 더 이상 서버에 없습니다.");
        if (!mentionMember.kickable) return msg.channel.send("이사용자는 킥을 할수없습니다.");

        try {
            await mentionMember.kick(reason);
        } catch (err) {
            return msg.channel.send("이 사용자를 킥할수 없습니다.")
        }
    }
}