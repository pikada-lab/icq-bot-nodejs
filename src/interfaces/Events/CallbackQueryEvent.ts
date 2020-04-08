import { Chat } from "../Entities/Chat";  

export interface CallbackQueryEvent {
    queryId: String;
    chat: Chat;
    message: Event;
    callbackData: String;
}
