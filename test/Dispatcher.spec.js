
const assert = require('assert')

const Handlers = require('../dist/interfaces/Handler')
const Dispatcher = require('../dist/class/DispatcherMessage').DispatcherMessage
const ICQEvent = require('../dist/class/ICQEvent').ICQEvent
const event = require("./constant");


describe("Dispatcher.", () => {

    describe("constructor", () => {
        const dispatcher = new Dispatcher({ "name": "BOT" });
        it("Init width bot BOT", () => {
            assert(dispatcher.getBot().name == "BOT")
        })
        it("Init handlers mast be array", () => {
            assert(dispatcher.getHandlers().length === 0)
        })

    })
    describe("addHandler(), removeHandler()", () => {
        const dispatcher = new Dispatcher({ "name": "BOT2" });
        let h = new Handlers.MessageHandler(null, () => { });
        let h2 = new Handlers.MessageHandler(null, () => { });

        it("addHandler(h) == 1", () => {
            dispatcher.addHandler(h)
            assert(dispatcher.getHandlers().length === 1)
        })
        it("addHandler(h) == 1", () => {
            dispatcher.addHandler(h)
            assert(dispatcher.getHandlers().length === 1)
        })
        it("addHandler(h2) == 2", () => {
            dispatcher.addHandler(h2)
            assert(dispatcher.getHandlers().length === 2)
        })
        it("removeHandler(h) == 1", () => {
            dispatcher.removeHandler(h)
            assert(dispatcher.getHandlers().length === 1)
        })
        it("removeHandler(h) == 1", () => {
            dispatcher.removeHandler(h)
            assert(dispatcher.getHandlers().length === 1)
        })
    })
    describe("dispatch()", () => { 
        it("dispatch(new ICQEvent(eventMessage))", (done) => {
            const dispatcher = new Dispatcher({ "name": "BOT3" });
            let h = new Handlers.MessageHandler(null, (bot, event) => {
                if (bot.name === "BOT3" && event.text == "Hello!") done()
            });
            dispatcher.addHandler(h)
            dispatcher.dispatch(new ICQEvent(event.eventMessage))
        })
        it("removeHandler(h) == 1", (done) => {
            const dispatcher = new Dispatcher({ "name": "BOT4", stop: () => {done()} });
            let h = new Handlers.DefaultHandler(() => { });
            dispatcher.addHandler(h) 
            dispatcher.dispatch(new ICQEvent(event.eventMessage))
        })
    })
});