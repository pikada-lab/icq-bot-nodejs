import { Chat } from "../Entities/Chat";
import { UserWidthName } from "../Entities/User";
import { Part } from "../Entities/Part";

    export interface NewMessageEvent {
        msgId: string;
        chat: Chat;
        from: UserWidthName;
        timestamp: number;
        text: String;
        parts: Part[]; 
    }
