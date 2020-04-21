import { EventType } from "../interfaces/Events/Event";

import { NewMessageEvent } from "../interfaces/Events/NewMessageEvent";

import { EditedMessageEvent } from "../interfaces/Events/EditedMessageEvent";

import { DeletedMessageEvent } from "../interfaces/Events/DeletedMessageEvent";

import { PinnedMessageEvent } from "../interfaces/Events/PinnedMessageEvent";

import { UnpinnedMessageEvent } from "../interfaces/Events/UnpinnedMessageEvent";

import { NewChatMembersEvent } from "../interfaces/Events/NewChatMembersEvent";

import { LeftChatMembersEvent } from "../interfaces/Events/LeftChatMembersEvent";

import { UserWidthName } from "../interfaces/Entities/User";
import { Event } from "../interfaces/Events/Event";
import { CallbackQueryEvent } from "../interfaces/Events/CallbackQueryEvent";

export class ICQEvent {
    type: EventType;
    data: NewMessageEvent |
        EditedMessageEvent |
        DeletedMessageEvent |
        PinnedMessageEvent |
        UnpinnedMessageEvent |
        NewChatMembersEvent |
        LeftChatMembersEvent |
        CallbackQueryEvent;
    text: String;
    messageAuthor: UserWidthName;
    fromChatId: string;
    constructor(event: Event) {
        this.type = event.type;
        this.data = event.payload;
        if (this.type == EventType.NEW_MESSAGE || this.type == EventType.EDITED_MESSAGE || this.type == EventType.PINNED_MESSAGE) {
            this.text = (this.data as NewMessageEvent).text
            this.fromChatId = (this.data as NewMessageEvent).chat.chatId
            this.messageAuthor = (this.data as NewMessageEvent).from
        }
        if( this.type == EventType.DELETED_MESSAGE) {
            this.fromChatId = (this.data as DeletedMessageEvent).chat.chatId 
        }
    }
}
