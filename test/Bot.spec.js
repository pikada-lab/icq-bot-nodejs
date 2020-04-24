
const assert = require('assert')

const Bot = require('../dist/class/Bot').Bot
const DispatcherMessage = require('../dist/class/DispatcherMessage').DispatcherMessage
const event = require("./constant");


describe("Bot.", () => {

    let bot = new Bot("X:XX");
    describe("constructor", () => {
        bot.setHttpSession({
            get: (url, params, header) => {
                return {
                    type: 'GET',
                    url: url,
                    header: header,
                    params: params,
                    clbk: null,
                    then: function(clback) { 
                        this.clbk = clback;
                        return this;
                    }
                }
            },
            post: (url, data, header) => {
                return {
                    type: 'POST',
                    url: url,
                    data: data,
                    header: header,
                    clbk: null, 
                    then: function(clback) {
                        this['clbk'] = clback
                        return this;
 
                    }
                }
            }
        })

        it("options   token", () => {
            assert(bot.token == "X:XX")
        })
        it("options default apiBaseUrl", () => {
            assert(bot.apiBaseUrl == "https://api.icq.net/bot/v1")
        })
        it("options default version", () => {
            assert(bot.version == "0.0.1")
        })
        it("options default name", () => {
            assert(bot.name == "NodeBot")
        })
        it("options default timeoutS", () => {
            assert(bot.timeoutS == 20)
        })
        it("options default pollTimeS", () => {
            assert(bot.pollTimeS == 60)
        })
        it("options default pollTimeS", () => {
            assert(bot.uin == "XX")
        })
    });

    describe("getDispatcher() ", () => {
        let dispatcher = bot.getDispatcher()
        it("instanceof DispatcherMessage", () => {
            assert(dispatcher instanceof DispatcherMessage);
        })
    });
    describe("getUNI() ", () => {
        it("== XX", () => {
            assert(bot.getUNI() == "XX");
        })
    });

    describe("startPolling() change running to true ", () => { 
        assert(bot.startPolling().running === true); 
    });
    describe("stop() ", () => {
        bot.running = true;
        it("running == false", () => {
            assert(bot.stop().running === false);
        })
    });

    describe("stop() ", () => {
        bot.running = true;
        it("running == false", () => {
            assert(bot.stop().running === false);
        })
    });
    describe("getUserAgent() ", () => {
        it("== NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta", () => {
            assert(bot.getUserAgent() == "NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta");
        })
    });

    describe("eventsGet()  ", () => {
        it(".url == https://api.icq.net/bot/v1/events/get", () => {
 
            assert( bot.eventsGet(10, 0).url === "https://api.icq.net/bot/v1/events/get" )
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert( bot.eventsGet(10, 0).header['user-agent'] === "NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta" )
        })
        it(".params == .token", () => { 
            assert( bot.eventsGet(10, 0).params.token === "X:XX" ) 
        })
    });


    describe("selfGet()  ", () => {
        it(".url == https://api.icq.net/bot/v1/self/get", () => {
            assert(bot.selfGet().url == "https://api.icq.net/bot/v1/self/get");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.selfGet().header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.selfGet().params.token == "X:XX");
        })
    });

    describe("sendText()  ", () => {
        it(".url == https://api.icq.net/bot/v1/messages/editText", () => {
            assert(bot.sendText("123", "text", "321", "432", "543").url == "https://api.icq.net/bot/v1/messages/sendText");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.sendText("123", "text", "321", "432", "543").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.sendText("123", "text", "321", "432", "543").params.token == "X:XX");
        })
    });

    describe("sendFile()  with fileID ", () => {
        it(".url == https://api.icq.net/bot/v1/messages/sendFile", () => {
            assert(bot.sendFile("123", "text", null, "432", "543").url == "https://api.icq.net/bot/v1/messages/sendFile");
        })

        it("type is GET", () => {
            assert(bot.sendFile("123", "text", null, "432", "543").type == "GET");
        })

        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.sendFile("123", "text", null, "432", "543").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.sendFile("123", "text", null, "432", "543").params.token == "X:XX");
        })
    });
    describe("sendFile() width file ", () => {
        it(".url == https://api.icq.net/bot/v1/messages/sendFile", () => {
            assert(bot.sendFile("123", "text", "./test/19.png", "432", "543").url == "https://api.icq.net/bot/v1/messages/sendFile");
        })
        it("type is POST", () => {
            assert(bot.sendFile("123", "text", "./test/19.png", "432", "543").type == "POST");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.sendFile("123", "text", "./test/19.png", "432", "543").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.sendFile("123", "text", "./test/19.png", "432", "543").data.data[0].value == "X:XX");
        })
    });

    describe("sendVoice()  ", () => {
        it(".url == https://api.icq.net/bot/v1/messages/sendVoice", () => {
            assert(bot.sendVoice("123", "text", "./test/19.png", "432", "543", "1543").url == "https://api.icq.net/bot/v1/messages/sendVoice");
        })
        it("type is POST", () => {
            assert(bot.sendVoice("123", "text", "./test/19.png", "432", "543", "1543").type == "POST");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.sendVoice("123", "text", "./test/19.png", "432", "543", "1543").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.sendVoice("123", "text", "./test/19.png", "432", "543", "1543").data.data[0].value == "X:XX");
        })
    });

    describe("editText()  ", () => {
        it(".url == https://api.icq.net/bot/v1/messages/editText", () => {
            assert(bot.editText("123", "text", "321").url == "https://api.icq.net/bot/v1/messages/editText");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.editText("123", "text", "321").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.editText("123", "text", "321").params.token == "X:XX");
        })
    });

    describe("deleteMessages()  ", () => {
        it(".url == https://api.icq.net/bot/v1/messages/deleteMessages", () => {
            assert(bot.deleteMessages("123", "text").url == "https://api.icq.net/bot/v1/messages/deleteMessages");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.deleteMessages("123", "text").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.deleteMessages("123", "text").params.token == "X:XX");
        })
    });

    describe("sendActions()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/sendActions", () => {
            assert(bot.sendActions("123", "looking").url == "https://api.icq.net/bot/v1/chats/sendActions");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.sendActions("123", "looking").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.sendActions("123", "looking").params.token == "X:XX");
        })
    });


    describe("getChatInfo()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/getInfo", () => {
            assert(bot.getChatInfo("123").url == "https://api.icq.net/bot/v1/chats/getInfo");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.getChatInfo("123").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.getChatInfo("123").params.token == "X:XX");
        })
    });

    describe("getChatAdmins()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/getAdmins", () => {
            assert(bot.getChatAdmins("123").url == "https://api.icq.net/bot/v1/chats/getAdmins");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.getChatAdmins("123").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.getChatAdmins("123").params.token == "X:XX");
        })
    });

    describe("getFileInfo()  ", () => {
        it(".url == https://api.icq.net/bot/v1/files/getInfo", () => {
            assert(bot.getFileInfo("123").url == "https://api.icq.net/bot/v1/files/getInfo");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.getFileInfo("123").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.getFileInfo("123").params.token == "X:XX");
        })
    });

    describe("pinMessage()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/pinMessage", () => {
            assert(bot.pinMessage("123", "212").url == "https://api.icq.net/bot/v1/chats/pinMessage");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.pinMessage("123", "212").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.pinMessage("123", "212").params.token == "X:XX");
        })
    });
    describe("unpinMessage()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/unpinMessage", () => {
            assert(bot.unpinMessage("123", "212").url == "https://api.icq.net/bot/v1/chats/unpinMessage");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.unpinMessage("123", "212").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.unpinMessage("123", "212").params.token == "X:XX");
        })
    });
    describe("setTitle()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/setTitle", () => {
            assert(bot.setTitle("123", "212").url == "https://api.icq.net/bot/v1/chats/setTitle");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.setTitle("123", "212").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.setTitle("123", "212").params.token == "X:XX");
        })
    });


    describe("setAbout()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/setAbout", () => {
            assert(bot.setAbout("123", "212").url == "https://api.icq.net/bot/v1/chats/setAbout");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.setAbout("123", "212").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.setAbout("123", "212").params.token == "X:XX");
        })
    });

    describe("setRules()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/setRules", () => {
            assert(bot.setRules("123", "txt").url == "https://api.icq.net/bot/v1/chats/setRules");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.setRules("123", "txt").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.setRules("123", "txt").params.token == "X:XX");
        })
    });

    describe("getMembers()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/getMembers", () => {
            assert(bot.getMembers("123", "212").url == "https://api.icq.net/bot/v1/chats/getMembers");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.getMembers("123", "212").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.getMembers("123", "212").params.token == "X:XX");
        })
    });
    describe("getBlockedUsers()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/getBlockedUsers", () => {
            assert(bot.getBlockedUsers("123", "212").url == "https://api.icq.net/bot/v1/chats/getBlockedUsers");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.getBlockedUsers("123", "212").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.getBlockedUsers("123", "212").params.token == "X:XX");
        })
    });
    describe("getPendingUsers()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/getPendingUsers", () => {
            assert(bot.getPendingUsers("123").url == "https://api.icq.net/bot/v1/chats/getPendingUsers");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.getPendingUsers("123").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.getPendingUsers("123").params.token == "X:XX");
        })
    });
    describe("blockUser()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/blockUser", () => {
            assert(bot.blockUser("123", "212").url == "https://api.icq.net/bot/v1/chats/blockUser");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.blockUser("123", "212").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.blockUser("123", "212").params.token == "X:XX");
        })
    });
    describe("unblockUser()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/unblockUser", () => {
            assert(bot.unblockUser("123", "212").url == "https://api.icq.net/bot/v1/chats/unblockUser");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.unblockUser("123", "212").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.unblockUser("123", "212").params.token == "X:XX");
        })
    });
    describe("resolvePending()  ", () => {
        it(".url == https://api.icq.net/bot/v1/chats/resolvePending", () => {
            assert(bot.resolvePending("123", true, "212").url == "https://api.icq.net/bot/v1/chats/resolvePending");
        })
        it(".header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta'", () => {
            assert(bot.resolvePending("123", true, "212").header['user-agent'] == 'NodeBot/0.0.1 (uin=XX) bot-nodejs/2.0.0-beta');
        })
        it(".params == .token", () => {
            assert(bot.resolvePending("123", true, "212").params.token == "X:XX");
        })
        it(".params == .token", () => {
            try {
                bot.resolvePending("123", true, "212", true);
            } catch (ex) {
                assert(ex.message == "Должен быть указан один из двух параметров: userId или everyone. Эти параметры не могут быть указаны одновременно.")
            }
        })
    });
});