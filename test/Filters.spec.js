
const assert = require('assert')
const event = require("./constant");
const Filters = require('../dist/interfaces/Filter')
const ICQEvent = require('../dist/class/ICQEvent').ICQEvent

describe("Filters.", () => {
    describe("MessageFilter ", () => {
        let filter = new Filters.MessageFilter();
        it("eventMessage must by MessageFilter true", () => {
            assert(filter.filter(new ICQEvent(event.eventMessage)));
        })

        it("eventDeleteMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventDeleteMessage)));
        })
        it("eventEditMessage must by MessageFilter true", () => {
            assert(filter.filter(new ICQEvent(event.eventEditMessage)));
        })
        it("eventPinnedMessage must by MessageFilter true", () => {
            assert(filter.filter(new ICQEvent(event.eventPinnedMessage)));
        })
        it("eventUnpunnedMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventUnpunnedMessage)));
        });
        it("eventNewChatMembers must by MessageFilter true", () => {
            assert(!filter.filter(new ICQEvent(event.eventNewChatMembers)));
        })
        it("eventLeftChatMembers must by MessageFilter true", () => {
            assert(!filter.filter(new ICQEvent(event.eventLeftChatMembers)));
        })
    })

    describe("Filters RegexpFilter ", () => {
        let filter = new Filters.RegexpFilter(/(.+)\s(.+)/);
        it("eventMessage must by MessageFilter true", () => {
            assert(filter.filter(new ICQEvent(event.startCommandMessage)));
        })

        it("eventDeleteMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventDeleteMessage)));
        })
        it("eventEditMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventEditMessage)));
        })
        it("eventPinnedMessage must by MessageFilter true", () => {
            assert(filter.filter(new ICQEvent(event.eventPinnedMessage)));
        })
        it("eventUnpunnedMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventUnpunnedMessage)));
        });
        it("eventNewChatMembers must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventNewChatMembers)));
        })
        it("eventLeftChatMembers must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventLeftChatMembers)));
        })
    })

    describe("Filters SenderFilter ", () => {
        let filter = new Filters.SenderFilter("1234567890");
        it("eventMessage must by MessageFilter true", () => {
            assert(filter.filter(new ICQEvent(event.startCommandMessage)));
        })

        it("eventDeleteMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventDeleteMessage)));
        })
        it("eventEditMessage must by MessageFilter true", () => {
            assert(filter.filter(new ICQEvent(event.eventEditMessage)));
        })
        it("eventPinnedMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventPinnedMessage)));
        })
        it("eventUnpunnedMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventUnpunnedMessage)));
        });
        it("eventNewChatMembers must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventNewChatMembers)));
        })
        it("eventLeftChatMembers must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventLeftChatMembers)));
        })
    })

    describe("Filters FileFilter ", () => {
        let filter = new Filters.FileFilter();
        it("newMessageWithFile must by MessageFilter true", () => {
            assert(filter.filter(new ICQEvent(event.newMessageWithFile)));
        })

        it("eventMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventMessage)));
        })

        it("eventDeleteMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventDeleteMessage)));
        })
        it("eventEditMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventEditMessage)));
        })
        it("eventPinnedMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventPinnedMessage)));
        })
        it("eventUnpunnedMessage must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventUnpunnedMessage)));
        });
        it("eventNewChatMembers must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventNewChatMembers)));
        })
        it("eventLeftChatMembers must by MessageFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventLeftChatMembers)));
        })
    })

    describe("ImageFilter",() => { 
        it("Filter newMessageWithFile true",() => {
            let filterImg = new Filters.ImageFilter;
            assert( filterImg.filter(new ICQEvent(event.newMessageWithFile)));
        })
        it("Filter newMessageWithFile false",() => {
            let filterVideo = new Filters.VideoFilter;
            assert(!filterVideo.filter(new ICQEvent(event.newMessageWithFile)));
        })
        it("Filter newMessageWithFile false",() => {
            let filterAudio = new Filters.AudioFilter;
            assert(!filterAudio.filter(new ICQEvent(event.newMessageWithFile)));
        })
    })
    
    describe("VideoFilter",() => { 
        it("Filter newMessageWithFileVideo false",() => {
            let filterImg = new Filters.ImageFilter;
            assert(!filterImg.filter(new ICQEvent(event.newMessageWithFileVideo)));
        })
        it("Filter newMessageWithFileVideo true",() => {
            let filterVideo = new Filters.VideoFilter;
            assert(filterVideo.filter(new ICQEvent(event.newMessageWithFileVideo)));
        })
        it("Filter newMessageWithFileVideo false",() => {
            let filterAudio = new Filters.AudioFilter;
            assert(!filterAudio.filter(new ICQEvent(event.newMessageWithFileVideo)));
        })
    })
    describe("AudioFilter",() => { 
        it("Filter newMessageWithFileVideo false",() => {
            let filterImg = new Filters.ImageFilter;
            assert(!filterImg.filter(new ICQEvent(event.newMessageWithFileAudio)));
        })
        it("Filter newMessageWithFileVideo false",() => {
            let filterVideo = new Filters.VideoFilter;
            assert(!filterVideo.filter(new ICQEvent(event.newMessageWithFileAudio)));
        })
        it("Filter newMessageWithFileVideo true",() => {
            let filterAudio = new Filters.AudioFilter;
            assert(filterAudio.filter(new ICQEvent(event.newMessageWithFileAudio)));
        })
    })
    describe("ReplyFilter, URLFilter, ForwardFilter, StickerFilter", () => {
        let filter = new Filters.URLFilter;
        let filterR = new Filters.ReplyFilter;
        let filterF = new Filters.ForwardFilter;
        let filterS = new Filters.StickerFilter;
        it("Filter URLFilter",() => {
            assert( filter.filter(new ICQEvent(event.URLMessage)));
        })
        it("Filter not URLFilter",() => {
            assert( !filter.filter(new ICQEvent(event.timeCommandMessage)));
        })
        it("Filter ReplyFilter",() => {
            assert( filterR.filter(new ICQEvent(event.URLMessage)));
        })
        it("Filter not ReplyFilter",() => {
            assert( !filterR.filter(new ICQEvent(event.timeCommandMessage)));
        })
        it("Filter ForwardFilter",() => {
            assert( filterF.filter(new ICQEvent(event.URLMessage)));
        })
        it("Filter not ForwardFilter",() => {
            assert( !filterF.filter(new ICQEvent(event.timeCommandMessage)));
        })
        it("Filter StikerFilter",() => {
            assert( filterS.filter(new ICQEvent(event.URLMessage)));
        })
        it("Filter not StikerFilter",() => {
            assert( !filterS.filter(new ICQEvent(event.timeCommandMessage)));
        })
        

    })

    describe("Filters FilterComposite AND", () => {
        let leftFilter = new Filters.RegexpFilter(/(\s)/);
        let rightFilter = new Filters.RegexpFilter(/\d{2}\.\d{2}/)
        let filter = new Filters.FilterComposite(Filters.TypeFilterOperation.or, leftFilter, rightFilter);


        it("FilterComposite must by valid ", (done) => {
            let filter = new Filters.FilterComposite(9, leftFilter, rightFilter);
            try {
                filter.filter(new ICQEvent(event.timeCommandMessage));
            } catch (ex) {
                done();
            }
        })



        it("timeCommandMessage must by RegexpFilter(/(\s)/) true", () => {
            assert(leftFilter.filter(new ICQEvent(event.timeCommandMessage)));
        })


        it("timeCommandMessage must by RegexpFilter(/\d{2}\.\d{2}/) true", () => {
            assert(rightFilter.filter(new ICQEvent(event.timeCommandMessage)));
        })

        it("timeCommandMessage must by FilterComposite true", () => {
            assert(filter.filter(new ICQEvent(event.timeCommandMessage)));
        })

        it("feedbackCommandMessage must by RegexpFilter(/(\s)/) true", () => {
            assert(leftFilter.filter(new ICQEvent(event.feedbackCommandMessage)));
        })


        it("feedbackCommandMessage must by RegexpFilter(/\d{2}\.\d{2}/) false", () => {
            assert(!rightFilter.filter(new ICQEvent(event.feedbackCommandMessage)));
        })

        it("feedbackCommandMessage must by FilterComposite false", () => {
            assert(filter.filter(new ICQEvent(event.feedbackCommandMessage)));
        })

    })


    describe("Filters FilterComposite NOT", () => {
        let leftFilter = new Filters.RegexpFilter(/(\s)/);
        let filter = new Filters.FilterComposite(Filters.TypeFilterOperation.not, leftFilter);

        it("timeCommandMessage must by  NOT RegexpFilter(/(\s)/) false", () => {
            assert(!filter.filter(new ICQEvent(event.timeCommandMessage)));
        })

        it("feedbackCommandMessage must by NOT RegexpFilter(/(\s)/) true", () => {
            assert(filter.filter(new ICQEvent(event.eventMessage)));
        })

        it("feedbackCommandMessage must by  NOT RegexpFilter(/(\s)/) false", () => {
            assert(!filter.filter(new ICQEvent(event.feedbackCommandMessage)));
        })

    })



    describe("Filters FilterComposite OR", () => {
        let leftFilter = new Filters.RegexpFilter(/(\s)/);
        let rightFilter = new Filters.RegexpFilter(/\d{2}\.\d{2}/)
        let filter = new Filters.FilterComposite(Filters.TypeFilterOperation.and, leftFilter, rightFilter);

        it("timeCommandMessage must by RegexpFilter(/(\s)/) true", () => {
            assert(leftFilter.filter(new ICQEvent(event.timeCommandMessage)));
        })


        it("timeCommandMessage must by RegexpFilter(/\d{2}\.\d{2}/) true", () => {
            assert(rightFilter.filter(new ICQEvent(event.timeCommandMessage)));
        })

        it("timeCommandMessage must by FilterComposite true", () => {
            assert(filter.filter(new ICQEvent(event.timeCommandMessage)));
        })

        it("feedbackCommandMessage must by RegexpFilter(/(\s)/) true", () => {
            assert(leftFilter.filter(new ICQEvent(event.feedbackCommandMessage)));
        })


        it("feedbackCommandMessage must by RegexpFilter(/\d{2}\.\d{2}/) false", () => {
            assert(!rightFilter.filter(new ICQEvent(event.feedbackCommandMessage)));
        })

        it("feedbackCommandMessage must by FilterComposite true", () => {
            assert(!filter.filter(new ICQEvent(event.feedbackCommandMessage)));
        })

    })

    describe("Filters CommandFilter ", () => {
        let filter = new Filters.CommandFilter();

        it("timeCommandMessage must by CommandFilter true", () => {
            assert(filter.filter(new ICQEvent(event.timeCommandMessage)));
        })
        it("eventMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventMessage)));
        })
        it("eventDeleteMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventDeleteMessage)));
        })
        it("eventEditMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventEditMessage)));
        })
        it("eventPinnedMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventPinnedMessage)));
        })
        it("eventUnpunnedMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventUnpunnedMessage)));
        })
        it("eventNewChatMembers must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventNewChatMembers)));
        })
        it("eventLeftChatMembers must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventLeftChatMembers)));
        })
    })


    describe("Filters MentionFilter ", () => {
        let filter = new Filters.MentionFilter("1234567890");

        it("timeCommandMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.timeCommandMessage)));
        })
        it("eventMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventMessage)));
        })
        it("eventDeleteMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventDeleteMessage)));
        })
        it("eventEditMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventEditMessage)));
        })
        it("eventPinnedMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventPinnedMessage)));
        })
        it("eventUnpunnedMessage must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventUnpunnedMessage)));
        })
        it("eventNewChatMembers must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventNewChatMembers)));
        })
        it("eventLeftChatMembers must by CommandFilter false", () => {
            assert(!filter.filter(new ICQEvent(event.eventLeftChatMembers)));
        })
    })
});