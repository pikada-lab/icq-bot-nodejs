import { Bot } from "./class/Bot";
import { HelpCommandHandler as ICQHelpCommandHandler, MessageHandler, NewChatMembersHandler, LeftChatMembersHandler, UnknownCommandHandler, PinnedMessageHandler, UnPinnedMessageHandler, EditedMessageHandler, DeletedMessageHandler, CommandHandler, StartCommandHandler, FeedbackCommandHandler } from "./interfaces/Handler";
import { Filter } from "./interfaces/Filter";
export default class ICQ {
    static Bot = Bot;
    static Filter = new Filter();
    static Handler = {
        HelpCommand: ICQHelpCommandHandler,
        Message: MessageHandler,
        NewChatMembers: NewChatMembersHandler,
        LeftChatMembers: LeftChatMembersHandler,
        PinnedMessage: PinnedMessageHandler,
        UnPinnedMessage: UnPinnedMessageHandler,
        EditedMessage: EditedMessageHandler,
        DeletedMessage: DeletedMessageHandler,
        Command: CommandHandler,
        StartCommand: StartCommandHandler,
        FeedbackCommand: FeedbackCommandHandler,
        UnknownCommand: UnknownCommandHandler
    };
}
