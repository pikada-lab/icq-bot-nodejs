import { Bot } from "./class/Bot";
import { MessageHandler } from "./interfaces/Handler";
import { RegexpFilter, MessageFilter, CommandFilter } from "./interfaces/Filter";

let TOKEN = "001.0232927109.1999608478:751212693";
const bot = new Bot(TOKEN, "", "AuxiliumBot", "0.0.1-alpha", 30, 30);

// Отправка сообщения в конкретный чат
// bot.sendText("750623381","Test").then(r => {  console.log("sendText",r)  });

// Отпарвка файла в чат
// bot.sendFile("750623381",null,'/Users/dzhigurda/Documents/icon/19.png').then(r => {
//      console.log("sendFile",r)  
//  });

// Отпарвка файла по номеру
// bot.sendFile("750623381","04Q4Q000TwOWbCPEvIiK285e66ef321ag",null,"test img");

// Отправляет действие типа Пишет или Смотрит
// bot.sendActions("750623381",'typing').then(r => {
//     console.log(r);
// });


// // Создает, затем через 3 секунды редактирует и ещё через 3 секунды удаляет сообщение
//  bot.sendText("750623381","text").then(async (r) => {  
//      console.log("sendText",r)  
//      setTimeout( async _ => { 
//         await bot.editText("750623381",r.msgId,"new text");
//      },3000) 
//      setTimeout( async _ => { 
//         await bot.deleteMessages("750623381",r.msgId);
//      },6000) 
// });

// // Возвращает объект типа Чат
// bot.getChatInfo("750623381").then(r => {
//     console.log(r);
// })

// // Тут доступно только не в приватном чате
// bot.getChatAdmins("682548187@chat.agent").then(r => {
//     console.log(r);
// })

// // Возвращает данные о файле
// bot.getFileInfo("04Q4Q000TwOWbCPEvIiK285e66ef321ag").then(r => {
//     console.log(r);
// })

// Доступно только в группах
// bot.pinMessage("682548187@chat.agent",'6802397097044283750').then(r => { console.log(r);});
// setTimeout( _ => bot.unpinMessage("682548187@chat.agent",'6802397097044283750').then(r => { console.log(r);}),3000);

// bot.setTitle("682548187@chat.agent","NodeJS BOT GROUP").then(r => console.log(r));
//  bot.setAbout("682548187@chat.agent","В этой группе хозяин бот nodejs").then(r => console.log(r));
bot.getMembers("682548187@chat.agent").then(r => console.log(r));
bot.getBlockedUsers("682548187@chat.agent").then(r => console.log(r));
bot.getPendingUsers("682548187@chat.agent").then(r => console.log(r));

// Отправка сообщения из чата в тот же чат
let handler = new MessageHandler(null, (bot, event) => {
    bot.sendText(event.fromChatId, "Без фильтра").then(r => {
        console.log("ChatID ", event.fromChatId ,r)
    });
});
bot.getDispatcher().addHandler(handler);

// // Фильтр с регулярным сообщением пропускает сообщения "12-3456"
//   handler = new MessageHandler(new RegexpFilter(/(\.?\d{2}-\d{4})/i), (bot, event) => {
//     bot.sendText(event.fromChatId, "RegexpFilter").then(r => {
//         console.log("RegexpFilter",r)
//     });
// });
// bot.getDispatcher().addHandler(handler);

// // Фильтр с регулярным сообщением 
//   handler = new MessageHandler(new CommandFilter(), (bot, event) => {
//     bot.sendText(event.fromChatId, "CommandFilter").then(r => {
//         console.log("CommandFilter",r)
//     });
// });
// bot.getDispatcher().addHandler(handler);


bot.startPolling();
bot.idle();