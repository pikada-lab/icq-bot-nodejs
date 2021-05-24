"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = void 0;
/** Типы сообщений */
var EventType;
(function (EventType) {
    EventType["NEW_MESSAGE"] = "newMessage";
    EventType["EDITED_MESSAGE"] = "editedMessage";
    EventType["DELETED_MESSAGE"] = "deletedMessage";
    EventType["PINNED_MESSAGE"] = "pinnedMessage";
    EventType["UNPINNED_MESSAGE"] = "unpinnedMessage";
    EventType["NEW_CHAT_MEMBERS"] = "newChatMembers";
    EventType["LEFT_CHAT_MEMBERS"] = "leftChatMembers";
    EventType["CHANGED_CHAT_INFO"] = "changedChatInfo";
    EventType["CALLBACK_QUERY"] = "callbackQuery";
})(EventType = exports.EventType || (exports.EventType = {}));
//# sourceMappingURL=Event.js.map