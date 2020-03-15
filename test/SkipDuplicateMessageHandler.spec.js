
const SkipDuplicateMessageHandler = require('../dist/class/SkipDuplicateMessageHandler').SkipDuplicateMessageHandler
const assert = require('assert')
const ICQEvent = require('../dist/class/ICQEvent').ICQEvent
const event = require("./constant");

describe("Handler.", () => {
    describe("SkipDuplicateMessageHandler.", () => {
        const cache = [];
        let sdm = new SkipDuplicateMessageHandler(cache);
        let event1 = new ICQEvent(event.eventMessage);
        it("check first true", () => {
            assert(sdm.check(event1, {}));
        });
        it("check second false", () => {
            try {
                sdm.check(event1, {});
            } catch (ex) {
                assert("Caught StopDispatching id'57883346846815032' exception, stopping dispatching." == ex.message);
            }
        });

        let handler = new SkipDuplicateMessageHandler();
        it("constructor without params", () => {
            assert(handler.check(event1, {}));
        }) 
        it("constructor without params second", () => {
            try {
                handler.check(event1, {});
            } catch (ex) {
                assert("Caught StopDispatching id'57883346846815032' exception, stopping dispatching." == ex.message);
            }
        })

        let event2 = new ICQEvent(event.eventEditMessage);
        it("constructor without params edit", () => {
            assert(handler.check(event2, {}));
        })
    })
})