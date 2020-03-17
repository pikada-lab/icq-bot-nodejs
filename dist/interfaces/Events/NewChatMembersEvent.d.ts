import { Chat } from "../Entities/Chat";
import { UserWidthName } from "../Entities/User";
export interface NewChatMembersEvent {
    chat: Chat;
    newMembers: UserWidthName[];
    addedBy: UserWidthName;
}
