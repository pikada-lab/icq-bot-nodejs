let ICQ = require("../dist/index").default;

describe("Интеграционные тесты", () => {

    let TOKEN = process.env.TOKEN_ICQ ;
    const bot = new ICQ.Bot(TOKEN);
    const chatId = "750623381";
    // const chatGroupId = "682548187@chat.agent";
    const filePath = './test/19.png'

    describe("Отправка сообщения в конкретный чат", () => {
        let id = null;
        it("Отправка/ редактирование/ удаление текстового сообщения", (done) => {
            bot.sendText(chatId, "Test").then(r => {
                if (r.ok) {
                    id = r.msgId;
                    bot.editText(chatId, id, "Test Test").then(r => {
                        if (r.ok) bot.deleteMessages(chatId, id).then(r => {
                            if (r.ok) done();
                        })
                    })
                }
            });
        });

        it("Отпарвка файла в чат", (done) => {
            bot.sendFile(chatId, null, filePath).then(r => {
                if (r.ok) done();
                console.log("sendFile", r)
                bot.deleteMessages(chatId, r.msgId).then(r => { });
            });
        });

        it(" Отпарвка файла по номеру", (done) => {
            bot.sendFile(chatId, "04Q4Q000TwOWbCPEvIiK285e66ef321ag", null, "test img").then(r => {
                if (r.ok) done();
                bot.deleteMessages(chatId, r.msgId).then(r => { });
            });
        });
    });
    describe("Установка статусов", () => {
        it("Установить статус пишет...", (done) => {
            bot.sendActions(chatId, 'typing').then(r => {
                if (r.ok) done();
            });
        })
        it("Установить статус смотрит...", (done) => {
            bot.sendActions(chatId, 'looking').then(r => {
                if (r.ok) done();
            });
        })
    })

    describe("Чаты", () => {
        it("Информация о чате", (done) => {
            bot.getChatInfo(chatId).then(r => {
                if (r.ok) done();
            })
        })
    })

    // // Создает, затем через 3 секунды редактирует и ещё через 3 секунды удаляет сообщение
    // bot.sendText(chatId, "text").then(async (r) => {
    //     console.log("sendText", r)
    //     setTimeout(async _ => {
    //         await bot.editText(chatId, r.msgId, "new text");
    //     }, 3000)
    //     setTimeout(async _ => {
    //         await bot.deleteMessages(chatId, r.msgId);
    //     }, 6000)
    // });

    // // Возвращает объект типа Чат
    // bot.getChatInfo(chatId).then(r => {
    //     console.log(r);
    // })

    // // Тут доступно только не в приватном чате
    // bot.getChatAdmins(chatGroupId).then(r => {
    //     console.log(r);
    // })

    // // Возвращает данные о файле
    // bot.getFileInfo("04Q4Q000TwOWbCPEvIiK285e66ef321ag").then(r => {
    //     console.log(r);
    // })

    // // Доступно только в группах
    // bot.pinMessage(chatGroupId, '6802397097044283750').then(r => { console.log(r); });
    // setTimeout(_ => bot.unpinMessage(chatGroupId, '6802397097044283750').then(r => { console.log(r); }), 3000);

    // bot.setTitle(chatGroupId, "NodeJS BOT GROUP").then(r => console.log(r));
    // bot.setAbout(chatGroupId, "В этой группе хозяин бот nodejs").then(r => console.log(r));
    // bot.getMembers(chatGroupId).then(r => console.log(r));
    // bot.getBlockedUsers(chatGroupId).then(r => console.log(r));
    // bot.getPendingUsers(chatGroupId).then(r => console.log(r));

    // // Отправка сообщения из чата в тот же чат
    // let handler = new MessageHandler(null, (bot, event) => {
    //     bot.sendText(event.fromChatId, "Без фильтра").then(r => {
    //         console.log("ChatID ", event.fromChatId, r)
    //     });
    // });
    // bot.getDispatcher().addHandler(handler);

    // // Фильтр с регулярным сообщением пропускает сообщения "12-3456"
    // handler = new MessageHandler(new RegexpFilter(/(\.?\d{2}-\d{4})/i), (bot, event) => {
    //     bot.sendText(event.fromChatId, "RegexpFilter").then(r => {
    //         console.log("RegexpFilter", r)
    //     });
    // });
    // bot.getDispatcher().addHandler(handler);

    // // Фильтр с регулярным сообщением 
    // handler = new MessageHandler(new CommandFilter(), (bot, event) => {
    //     bot.sendText(event.fromChatId, "CommandFilter").then(r => {
    //         console.log("CommandFilter", r)
    //     });
    // });
    // bot.getDispatcher().addHandler(handler);


    // bot.startPolling();

}); 