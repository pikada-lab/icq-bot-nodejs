/**
 * ```
 * Этот класс создается клиентом
 * для создания правил обработки 
 * входящих сообщений.
 * Экземпляр класса помещается в метод addHandler 
 * в экземпляр класса Dispatcher, который находится внутри экземпляра класса Bot
 * 
 * Этот класс принимает фильтр и функцию обратного вызова
 * фильтр не является обязательным параметром. 
 * Если его нет, то согласно логике конкретного хэндлера будет 
 * вызвана функция обратного вызова на каждое сообщения
 * ```
 */
const Handlers = require('../dist/interfaces/Handler')
const assert = require('assert')
const ICQEvent = require('../dist/class/ICQEvent').ICQEvent
const event = require("./constant");

// test MessageHandler кто то отправил сообщение 

describe("Handler.", () => {


    describe("Handler HandlerBase.", () => {

        let message = new Handlers.HandlerBase(null, () => { });
        it("EventMessage check should by true", () => {
            assert(message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EventMessage handle should by done", (done) => {

            let message = new Handlers.HandlerBase(null, () => { done() });
            message.handle(new ICQEvent(event.eventMessage), { getBot: () => { return this } })
        })

    })

    describe("Handler DefaultHandler.", () => {

        let message = new Handlers.DefaultHandler(() => { });
        it("EventMessage check should by true", () => {
            assert(message.check(new ICQEvent(event.eventMessage), { getHandlers: () => { return [message] } }))
        })
        it("EventMessage handle should by done", (done) => {

            let message = new Handlers.DefaultHandler(() => { });
            try {
                message.handle(new ICQEvent(event.eventMessage), { getBot: () => { return this } })
            } catch (ex) {
                done()
            }
        })
        it("EventMessage check should by false", () => {
            let newMessage = new Handlers.MessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventMessage), { getHandlers: () => { return [message, newMessage] } }))
        })

    })
    describe("Handler common.", () => {
        it("EventMessage should by true", () => {
            let message = new Handlers.MessageHandler(null, () => { });
            assert(message.check(new ICQEvent(event.eventMessage), null))
        })

        it("handle should by execute", (done) => {
            let message = new Handlers.MessageHandler(null, () => {
                done()
            })
            message.handle(new ICQEvent(event.eventMessage), { getBot: () => { return true; } })
        })

        it("handle should by execute with bot", (done) => {
            let message = new Handlers.MessageHandler(null, (bot, event) => {
                if (bot) done()
            })
            message.handle(new ICQEvent(event.eventMessage), { getBot: () => { return true; } })
        })
        it("handle should by execute with event", (done) => {
            let message = new Handlers.MessageHandler(null, (bot, event) => {
                if (event.text == "Hello!") done()
            })
            message.handle(new ICQEvent(event.eventMessage), { getBot: () => { return true; } })
        })

    })

    describe("NewMessage.check(event)", () => {
        it("NewMessage event should by true", () => {
            let message = new Handlers.MessageHandler(null, () => { });
            assert(message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by false", () => {
            let message = new Handlers.MessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by false", () => {
            let message = new Handlers.MessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by false", () => {
            let message = new Handlers.MessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by false", () => {
            let message = new Handlers.MessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by false", () => {
            let message = new Handlers.MessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by false", () => {
            let message = new Handlers.MessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })

    describe("EditedMessageHandler.check(event)", () => {
        it("NewMessage event should by false", () => {
            let message = new Handlers.EditedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by true", () => {
            let message = new Handlers.EditedMessageHandler(null, () => { });
            assert(message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by false", () => {
            let message = new Handlers.EditedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by false", () => {
            let message = new Handlers.EditedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by false", () => {
            let message = new Handlers.EditedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by false", () => {
            let message = new Handlers.EditedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by false", () => {
            let message = new Handlers.EditedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })


    describe("DeletedMessageHandler.check(event)", () => {
        it("NewMessage event should by false", () => {
            let message = new Handlers.DeletedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by false", () => {
            let message = new Handlers.DeletedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by true", () => {
            let message = new Handlers.DeletedMessageHandler(null, () => { });
            assert(message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by false", () => {
            let message = new Handlers.DeletedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by false", () => {
            let message = new Handlers.DeletedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by false", () => {
            let message = new Handlers.DeletedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by false", () => {
            let message = new Handlers.DeletedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })


    describe("PinnedMessageHandler.check(event)", () => {
        it("NewMessage event should by false", () => {
            let message = new Handlers.PinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by false", () => {
            let message = new Handlers.PinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by false", () => {
            let message = new Handlers.PinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by true", () => {
            let message = new Handlers.PinnedMessageHandler(null, () => { });
            assert(message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by false", () => {
            let message = new Handlers.PinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by false", () => {
            let message = new Handlers.PinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by false", () => {
            let message = new Handlers.PinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })


    describe("UnPinnedMessageHandler.check(event)", () => {
        it("NewMessage event should by false", () => {
            let message = new Handlers.UnPinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by false", () => {
            let message = new Handlers.UnPinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by false", () => {
            let message = new Handlers.UnPinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by false", () => {
            let message = new Handlers.UnPinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by true", () => {
            let message = new Handlers.UnPinnedMessageHandler(null, () => { });
            assert(message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by false", () => {
            let message = new Handlers.UnPinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by false", () => {
            let message = new Handlers.UnPinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })


    describe("NewChatMembersHandler.check(event)", () => {
        it("NewMessage event should by false", () => {
            let message = new Handlers.NewChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by false", () => {
            let message = new Handlers.NewChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by false", () => {
            let message = new Handlers.NewChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by false", () => {
            let message = new Handlers.UnPinnedMessageHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by false", () => {
            let message = new Handlers.NewChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by true", () => {
            let message = new Handlers.NewChatMembersHandler(null, () => { });
            assert(message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by false", () => {
            let message = new Handlers.NewChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })

    describe("LeftChatMembersHandler.check(event)", () => {
        it("NewMessage event should by false", () => {
            let message = new Handlers.LeftChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by false", () => {
            let message = new Handlers.LeftChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by false", () => {
            let message = new Handlers.LeftChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by false", () => {
            let message = new Handlers.LeftChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by false", () => {
            let message = new Handlers.LeftChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by false", () => {
            let message = new Handlers.LeftChatMembersHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by true", () => {
            let message = new Handlers.LeftChatMembersHandler(null, () => { });
            assert(message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })

    describe("CommandHandler.check(event)", () => {

        it("helpCommandMessage event should by true", () => {
            let message = new Handlers.CommandHandler(["help"], null, () => { });
            assert(message.check(new ICQEvent(event.helpCommandMessage), null))
        })

        it("helpCommandMessage event should by true", () => {
            let message = new Handlers.CommandHandler("help", null, () => { });
            assert(message.check(new ICQEvent(event.helpCommandMessage), null))
        })

        it("startCommandMessage event should by false", () => {
            let message = new Handlers.CommandHandler(["help"], null, () => { });
            assert(!message.check(new ICQEvent(event.startCommandMessage), null))
        })

        it("NewMessage event should by false", () => {
            let message = new Handlers.CommandHandler(["help"], null, () => { });
            assert(!message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by false", () => {
            let message = new Handlers.CommandHandler(["help"], null, () => { });
            assert(!message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by false", () => {
            let message = new Handlers.CommandHandler(["help"], null, () => { });
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by false", () => {
            let message = new Handlers.CommandHandler(["help"], null, () => { });
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by false", () => {
            let message = new Handlers.CommandHandler(["help"], null, () => { });
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by false", () => {
            let message = new Handlers.CommandHandler(["help"], null, () => { });
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by false", () => {
            let message = new Handlers.CommandHandler(["help"], null, () => { });
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })



    describe("HelpCommandHandler.check(event)", () => {



        it("helpCommandMessage event should by false", () => {
            let message = new Handlers.HelpCommandHandler(null, () => { });
            assert(message.check(new ICQEvent(event.helpCommandMessage), null))
        })

        it("startCommandMessage event should by true", () => {
            let message = new Handlers.HelpCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.startCommandMessage), null))
        })

        it("NewMessage event should by false", () => {
            let message = new Handlers.HelpCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by false", () => {
            let message = new Handlers.HelpCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by false", () => {
            let message = new Handlers.HelpCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by false", () => {
            let message = new Handlers.HelpCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by false", () => {
            let message = new Handlers.HelpCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by false", () => {
            let message = new Handlers.HelpCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by false", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })

    describe("StartCommandHandler.check(event)", () => {

        it("helpCommandMessage event should by false", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.helpCommandMessage), null))
        })

        it("helpCommandMessage event should by false", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.helpCommandMessage), null))
        })

        it("startCommandMessage event should by true", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(message.check(new ICQEvent(event.startCommandMessage), null))
        })

        it("NewMessage event should by false", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by false", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by false", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by false", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by false", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by false", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by false", () => {
            let message = new Handlers.StartCommandHandler(null, () => { });
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })


    ///

    describe("CommandHandler.check(event)", () => {
        let message = new Handlers.FeedbackCommandHandler("123456", "Feedback from {source}: {message}", "Got it!", "Not good!");

        it("feedbackCommandMessage event should by true", () => {
            assert(message.check(new ICQEvent(event.feedbackCommandMessage), null))
        })

        it("feedbackCommandMessage event target should by 123456", (done) => {
            message.handle(new ICQEvent(event.feedbackCommandMessage),
                {
                    getBot: () => {
                        return {
                            sendText: (target, text) => {
                                if (target == "123456") done();
                                return { ok: true };
                            }
                        }
                    },
                })
        })

        it("feedbackCommandMessage event text should by: Feedback from {source}: {message}", (done) => {
            message.handle(new ICQEvent(event.feedbackCommandMessage),
                {
                    getBot: () => {
                        return {
                            sendText: (target, text) => {
                                if (text == "Feedback from 681869378@chat.agent: text more") done();
                                return { ok: true };
                            }
                        }
                    },
                })
        })

        it("feedbackCommandMessage event text should by: Not good!", (done) => {
            let eventICQ = new ICQEvent(event.feedbackCommandMessage);
            eventICQ.data.text = "feedback ";
            message.handle(eventICQ,
                {
                    getBot: () => {
                        return {
                            sendText: (target, text) => {
                                if (text == "Not good!") done();
                                return { ok: true };
                            }
                        }
                    },
                })
        })

        it("NewMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventMessage), null))
        })
        it("EditMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventEditMessage), null))
        })

        it("DeleteMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), null))
        })
        it("PinedMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), null))
        })
        it("UnpinnedMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), null))
        })

        it("NewChatMembers event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), null))
        })

        it("LeftChatMembers event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), null))
        })
    })



    describe("UnknownCommandHandler.check(event)", () => {
        let message = new Handlers.UnknownCommandHandler(null, () => { });
        let dispatcherProxy = { handlers: [message] }
        it("feedbackCommandMessage event should by true", () => {
            assert(message.check(new ICQEvent(event.feedbackCommandMessage), dispatcherProxy))
        })

        it("helpCommandMessage event should by true", () => {
            assert(message.check(new ICQEvent(event.helpCommandMessage), dispatcherProxy))
        })
        it("NewMessage event should by true", () => {
            assert(message.check(new ICQEvent(event.eventMessage), dispatcherProxy))
        })
        it("EditMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventEditMessage), dispatcherProxy))
        })

        it("DeleteMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), dispatcherProxy))
        })
        it("PinedMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), dispatcherProxy))
        })
        it("UnpinnedMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), dispatcherProxy))
        })

        it("NewChatMembers event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), dispatcherProxy))
        })

        it("LeftChatMembers event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), dispatcherProxy))
        })


        it("helpCommandMessage event should by handle with error", (done) => {
            try {
                message.handle(new ICQEvent(event.helpCommandMessage), dispatcherProxy);
            } catch(ex) {
                done()
            }
        })
    })


    describe("UnknownCommandHandler.check(event) with 2 handlers", () => {
        let message = new Handlers.UnknownCommandHandler(null, () => { });
        let start = new Handlers.StartCommandHandler(null, () => { });
        let dispatcherProxy = { handlers: [message, start] }
        it("startCommandMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.startCommandMessage), dispatcherProxy))
        })

        it("helpCommandMessage event should by true", () => {
            assert(message.check(new ICQEvent(event.helpCommandMessage), dispatcherProxy))
        })
        it("NewMessage event should by true", () => {
            assert(message.check(new ICQEvent(event.eventMessage), dispatcherProxy))
        })
        it("EditMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventEditMessage), dispatcherProxy))
        })

        it("DeleteMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventDeleteMessage), dispatcherProxy))
        })
        it("PinedMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventPinnedMessage), dispatcherProxy))
        })
        it("UnpinnedMessage event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventUnpunnedMessage), dispatcherProxy))
        })

        it("NewChatMembers event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventNewChatMembers), dispatcherProxy))
        })

        it("LeftChatMembers event should by false", () => {
            assert(!message.check(new ICQEvent(event.eventLeftChatMembers), dispatcherProxy))
        })
    })
})

// // test EditedMessageHandler кто то отредактировал сообщение
// new Handlers.EditedMessageHandler(filter,callback);

// // test DeletedMessageHandler кто то удалил сообщение
// new Handlers.DeletedMessageHandler(filter,callback);

// // test PinnedMessageHandler кто-то закрепил сообщение
// new Handlers.PinnedMessageHandler(filter,callback);

// // test UnPinnedMessageHandler кто-то открепил сообщение
// new Handlers.UnPinnedMessageHandler(filter,callback);

// // test CommandHandler человек отправил сообщение, которое начинается на . или "/"
// new Handlers.CommandHandler(filter,callback);

// // test LeftChatMembersHandler участник группы ушел
// new Handlers.LeftChatMembersHandler(filter,callback);

// // test NewChatMembersHandler Добавлен новый участник группы
// new Handlers.NewChatMembersHandler(filter,callback);
