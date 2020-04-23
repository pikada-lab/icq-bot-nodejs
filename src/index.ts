import { Bot } from "./class/Bot";
import { HelpCommandHandler as ICQHelpCommandHandler, MessageHandler, NewChatMembersHandler, LeftChatMembersHandler, UnknownCommandHandler, PinnedMessageHandler, UnPinnedMessageHandler, EditedMessageHandler, DeletedMessageHandler, CommandHandler, StartCommandHandler, FeedbackCommandHandler } from "./interfaces/Handler";
import { Filter } from "./interfaces/Filter";
import { ICQButton } from "./class/ICQButton";
export default class ICQ {
    /**
     * Класс кнопки для сообщений
     */
    static Button = ICQButton;

    /**
     * Бот для вызова  
     */
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

 