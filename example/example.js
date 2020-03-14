let ICQ = require("../dist/index").default;


let TOKEN = "XXX";
let ChatID = "XXX";
let Bot = new ICQ .Bot (TOKEN);
Bot.sendText(ChatID,"Test");