module.exports = {
    name: "ping",
    run(client: any, message: any, args: any) {
        message.reply("pong");
    }
}