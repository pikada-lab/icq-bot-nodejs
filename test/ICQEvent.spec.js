/**
 * ```
 * Этот класс создается при ответе 
 * сервера в методе pooling 
 * в экземпляре класса  Bot
 * ```
 */
const assert = require('assert')
const ICQEvent = require('../dist/class/ICQEvent').ICQEvent


/**
 * Я
 */
let userWidthName = {
    userId: "14141rqrqr",
    firstName: "Anton",
    lastName: "Dzhigurda"
}

/**
 * Моя колега и друг
 */
let otherUserWidthName = {
    userId: "qwer141414",
    firstName: "Polina",
    lastName: "Shevchenko"
}

/**
 * Сообщение где я упомянул друга
 */
let newMessageEvent = {
    msgId: "1234asdf",
    chat:  {
        "chatId": "681869378@chat.agent",
        "type": "channel",
        "title": "The best channel"
      }, 
    from: userWidthName,
    timestamp: 1583969134348,
    text: "test string",
    parts: [{
        type: 'mention',
        payload: otherUserWidthName
    }]
}

const event =  {
    eventId: "1111111111111111111",
    type: 'newMessage',
    payload: newMessageEvent
}

   
describe("ICQEvent constructor", () => {
    describe("NewMessageEvent interface test", () => {
 
        let icqEvent = new ICQEvent(event);
        it('text should by "test string"', () => { 
            assert(icqEvent.text === "test string");
        })
        it('type should by "newMessage"', () => { 
            assert(icqEvent.type === "newMessage");
        })
        it('chatId should by "681869378@chat.agent"', () => { 
            assert(icqEvent.fromChatId === "681869378@chat.agent");
        })
        it('messageAuthor.lastName should by "Dzhigurda"', () => { 
            assert(icqEvent.messageAuthor.lastName === "Dzhigurda");
        })
        it('icqEvent.data.msgId should by "1234asdf"', () => { 
            assert(icqEvent.data.msgId === "1234asdf");
        })
    })
})