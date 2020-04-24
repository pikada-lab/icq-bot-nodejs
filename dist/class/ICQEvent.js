"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("../interfaces/Events/Event");
var ICQEvent = (function () {
    function ICQEvent(event) {
        this.type = event.type;
        this.data = event.payload;
        if (this.type == Event_1.EventType.NEW_MESSAGE || this.type == Event_1.EventType.EDITED_MESSAGE || this.type == Event_1.EventType.PINNED_MESSAGE) {
            this.text = this.data.text;
            this.messageAuthor = this.data.from;
        }
        if (this.data && this.data.chat) {
            this.fromChatId = this.data.chat.chatId;
        }
    }
    return ICQEvent;
}());
exports.ICQEvent = ICQEvent;
//# sourceMappingURL=ICQEvent.js.map