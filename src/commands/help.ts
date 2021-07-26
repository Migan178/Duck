import { MessageEmbed } from 'discord.js';
import { prefix } from '../config/config';

const DuckVer = require('../../package.json');

module.exports = {
    name: "도움말",
    run: async (client: any, message: any, args: any) => {
        const Embed = new MessageEmbed()
            .setColor(0x000000)
            .setTitle(`${client.user!.username}의 도움말`)
            .setDescription(`아직 하나 밖에 없다. 접두사: \`\`${prefix}\`\`\n버젼: \`\`${DuckVer.version}\`\``)
            .addFields(
                {
                    name: "일반",
                    value: `\`\`\`
핑
                    \`\`\``
                }
            )
            .setTimestamp(Date.now())
            .setFooter(message.author.tag, message.author.displayAvatarURL());
        message.channel.send(Embed);
    }
}