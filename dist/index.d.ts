import { Bot } from "./class/Bot";
import { HelpCommandHandler as ICQHelpCommandHandler, MessageHandler, NewChatMembersHandler, LeftChatMembersHandler, UnknownCommandHandler, PinnedMessageHandler, UnPinnedMessageHandler, EditedMessageHandler, DeletedMessageHandler, CommandHandler, StartCommandHandler, FeedbackCommandHandler } from "./interfaces/Handler";
import { Filter } from "./interfaces/Filter";
import { ICQButton } from "./class/ICQButton";
export default class ICQ {
    /**
     * Класс кнопки для сообщений
     */
    static Button: typeof ICQButton;
    /**
     * Бот для вызова
     */
    static Bot: typeof Bot;
    static Filter: Filter;
    static Handler: {
        HelpCommand: typeof ICQHelpCommandHandler;
        Message: typeof MessageHandler;
        NewChatMembers: typeof NewChatMembersHandler;
        LeftChatMembers: typeof LeftChatMembersHandler;
        PinnedMessage: typeof PinnedMessageHandler;
        UnPinnedMessage: typeof UnPinnedMessageHandler;
        EditedMessage: typeof EditedMessageHandler;
        DeletedMessage: typeof DeletedMessageHandler;
        Command: typeof CommandHandler;
        StartCommand: typeof StartCommandHandler;
        FeedbackCommand: typeof FeedbackCommandHandler;
        UnknownCommand: typeof UnknownCommandHandler;
    };
}
