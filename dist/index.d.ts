import { Bot } from "./class/Bot";
import { HelpCommandHandler as ICQHelpCommandHandler, MessageHandler, NewChatMembersHandler, LeftChatMembersHandler, UnknownCommandHandler, PinnedMessageHandler, UnPinnedMessageHandler, EditedMessageHandler, DeletedMessageHandler, CommandHandler, StartCommandHandler, FeedbackCommandHandler, DefaultHandler, BotButtonCommandHandler } from "./interfaces/Handler";
import { Filter } from "./interfaces/Filter";
import { ICQButton } from "./class/ICQButton";
/**
 * Фасад ICQ
 */
export default class ICQ {
    /**
     * Класс кнопки для сообщений
     */
    static Button: typeof ICQButton;
    /**
     * Бот для вызова
     */
    static Bot: typeof Bot;
    /**
     * Базовые фильтры для обработчиков
     */
    static Filter: typeof Filter;
    /**
     * Базовые обработчики.
     *
     * Обратите внимание, что если под одно событие
     * подходят несколько обработчиков, то будут вызваны оба.
     */
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
        /** Сробатывает, когда приходит паттерн комманды, для которой нет обработчика в диспетчере */
        UnknownCommand: typeof UnknownCommandHandler;
        /** Срабатывает на все события, Если это событие не будет обработано другими обработчиками */
        All: typeof DefaultHandler;
        BotButtonCommand: typeof BotButtonCommandHandler;
    };
}
