let ICQ = require("../dist/index").default;


// let TOKEN = "XXX";
// let ChatID = "XXX";
// let Bot = new ICQ .Bot (TOKEN);
// Bot.sendFile(ChatID,null,"./test/19.png", "image/png");
// Bot.sendFile(ChatID,null,"./LICENSE", "Test octostream");
// Bot.sendFile(ChatID,null,"./package.json", "text");

let TOKEN = process.env.TOKEN_ICQ;
const bot = new ICQ.Bot(TOKEN);
const chatId = "750623381";
let handler = new ICQ.Handler.Message(null, (bot, event) => {
    bot.sendText(event.fromChatId, "Без фильтра").then(r => {
        console.log("ChatID ", event.fromChatId ,r)
    });
});
bot.getDispatcher().addHandler(handler);
bot.startPolling(); 
