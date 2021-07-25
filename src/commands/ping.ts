import { MessageEmbed } from 'discord.js';

module.exports = {
    name: "핑",
    run: async (client: any, message: any, args: any) => {
        const Embed = new MessageEmbed()
            .setTitle(":ping_pong:퐁!")
            .setDescription(`웹소켓 핑: \`${client.ws.ping}\`ms\n메세지 핑: \`${Date.now() - message.createdTimestamp}\`ms`)
            .setColor(0x000000)
            .setTimestamp(Date.now())
            .setFooter(message.author.tag, message.author.displayAvatarURL());
        message.channel.send(Embed);
    }
}