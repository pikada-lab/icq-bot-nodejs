import { Chat } from "../Entities/Chat";

    export interface DeletedMessageEvent {
        msgId: string;
        chat: Chat; 
        timestamp: number; 
    }
