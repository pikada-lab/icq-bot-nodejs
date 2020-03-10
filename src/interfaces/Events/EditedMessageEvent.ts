import { Chat } from "../Entities/Chat";
import { UserWidthName } from "../Entities/User";

    export interface EditedMessageEvent {
        msgId: string;
        chat: Chat;
        from: UserWidthName;
        timestamp: number;
        text: String; 
        editedTimestamp: number;
    }
