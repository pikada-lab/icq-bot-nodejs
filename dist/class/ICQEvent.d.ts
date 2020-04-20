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
export declare class ICQEvent {
    type: EventType;
    data: NewMessageEvent | EditedMessageEvent | DeletedMessageEvent | PinnedMessageEvent | UnpinnedMessageEvent | NewChatMembersEvent | LeftChatMembersEvent | CallbackQueryEvent;
    text: String;
    messageAuthor: UserWidthName;
    fromChatId: string;
    constructor(event: Event);
}
