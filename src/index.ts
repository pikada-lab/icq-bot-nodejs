import { Bot } from "./class/Bot";
import { HelpCommandHandler as ICQHelpCommandHandler, MessageHandler, NewChatMembersHandler, LeftChatMembersHandler, UnknownCommandHandler, PinnedMessageHandler, UnPinnedMessageHandler, EditedMessageHandler, DeletedMessageHandler, CommandHandler, StartCommandHandler, FeedbackCommandHandler } from "./interfaces/Handler";
import { Filter } from "./interfaces/Filter";
import { ICQButton } from "./class/ICQButton";

/**
 * Фасад ICQ
 */
export default class ICQ {
    /**
     * Класс кнопки для сообщений
     */
    static Button = ICQButton;

    /**
     * Бот для вызова  
     */
    static Bot = Bot;
    
    /**
     * Базовые фильтры для обработчиков
     */
    static Filter = Filter;

    /**
     * Базовые обработчики. 
     * 
     * Обратите внимание, что если под одно событие 
     * подходят несколько обработчиков, то будут вызваны оба.
     */
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