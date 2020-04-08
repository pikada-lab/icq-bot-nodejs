import { NewMessageEvent } from "./NewMessageEvent";
import { EditedMessageEvent } from "./EditedMessageEvent";
import { DeletedMessageEvent } from "./DeletedMessageEvent";
import { PinnedMessageEvent } from "./PinnedMessageEvent";
import { UnpinnedMessageEvent } from "./UnpinnedMessageEvent";
import { NewChatMembersEvent } from "./NewChatMembersEvent";
import { LeftChatMembersEvent } from "./LeftChatMembersEvent";
import { CallbackQueryEvent } from "./CallbackQueryEvent";

export enum EventType {
    NEW_MESSAGE = "newMessage",
    EDITED_MESSAGE = "editedMessage",
    DELETED_MESSAGE = "deletedMessage",
    PINNED_MESSAGE = "pinnedMessage",
    UNPINNED_MESSAGE = "unpinnedMessage",
    NEW_CHAT_MEMBERS = "newChatMembers",
    LEFT_CHAT_MEMBERS = "leftChatMembers",
    CHANGED_CHAT_INFO = "changedChatInfo",
    CALLBACK_QUERY = "callbackQuery"
}

export interface ResponseEvent {
    events: Event[];
}

export interface Event {
    eventId: number;
    type: EventType;
    payload:    NewMessageEvent |
                EditedMessageEvent |
                DeletedMessageEvent |
                PinnedMessageEvent |
                UnpinnedMessageEvent |
                NewChatMembersEvent |
                LeftChatMembersEvent |
                CallbackQueryEvent
    ; /// ONE OF TYPE
}
