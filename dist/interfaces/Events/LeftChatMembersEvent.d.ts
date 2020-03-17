import { Chat } from "../Entities/Chat";
import { UserWidthName, User } from "../Entities/User";
export interface LeftChatMembersEvent {
    chat: Chat;
    LeftMembers: UserWidthName[];
    removedBy: User;
}
