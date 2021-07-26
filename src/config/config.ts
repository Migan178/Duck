import { client } from "../Bot/Bot";

const prefix: string = "!";
const owners = "415135882006495242"; // 여기에 있는 id 는 수정해 주셔야 합니다.
const DuckVer = require('../../package.json');

function botSetActivity() {
    const Status = [
        `${prefix}도움말을 쳐보아라.`,
        `version: ${DuckVer.version}`
    ];
    let index = 0;
    setInterval(() => {
        if (index === Status.length) index = 0;
        const status1 = Status[index];
        client.user!.setActivity(status1, {
            type: 'PLAYING'
        }).catch(console.error)
        index++;
    }, 5000);
};

export { prefix, owners, botSetActivity };