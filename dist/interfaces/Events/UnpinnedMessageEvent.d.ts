import { Chat } from "../Entities/Chat";
export interface UnpinnedMessageEvent {
    msgId: number;
    chat: Chat;
    timestamp: number;
}
