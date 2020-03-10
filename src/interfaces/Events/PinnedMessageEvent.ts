import { Chat } from "../Entities/Chat";
import { UserWidthName } from "../Entities/User";

    export interface PinnedMessageEvent {
        msgId: string;
        chat: Chat;
        from: UserWidthName;
        text: string;
        timestamp: number;
    }
