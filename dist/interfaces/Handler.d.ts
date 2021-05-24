import { Filters } from "./Filter";
import { Dispatcher } from "./Dispatcher";
import { ICQBot } from "./ICQBot";
import { ICQEvent } from "../class/ICQEvent";
/**
 * Обработчик событий по фильтру
 * На вход поступают разные события
 */
export interface Handler {
    check(event: ICQEvent, dispatcher: Dispatcher): boolean;
    handle(event: ICQEvent, dispatcher: Dispatcher): void;
}
/**
 * Базовый обработчик.
 *
 * Срабатывает на все события если не установлен фильтр
 * или на события отфильтрованные установленным фильтром
 */
export declare class HandlerBase implements Handler {
    protected filters: Filters;
    protected callback: (bot: ICQBot, event: ICQEvent) => void;
    /**
     * Параметр filters может быть равен null.
     * В таком случае вызов callback будет происходить
     * каждый раз, когда приходит событие
     *
     * @param filters Фильтр
     * @param callback Функция обратного вызова
     */
    constructor(filters: Filters, callback: (bot: ICQBot, event: ICQEvent) => void);
    check(event: ICQEvent, dispatcher: Dispatcher): boolean;
    handle(event: ICQEvent, dispatcher: Dispatcher): void;
}
/**
 * Обработчик для всех событий которые небудут обработаны
 *
 * Срабатывает всегда, когда приходит событие из и на это событие нет обработчика пуллинга
 */
export declare class DefaultHandler extends HandlerBase {
    constructor(callback?: any);
    check(event: any, dispatcher: any): boolean;
    protected any(event: any, dispatcher: Dispatcher): boolean;
}
/**
 * Обработчик новых участников группового чата
 *
 * Срабатывает когда в группу вступает новый пользователь
 */
export declare class NewChatMembersHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
/**
 * Обработчик выхода из группы участника
 */
export declare class LeftChatMembersHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
/**
 * Обработчик закрепа сообщения в чате
 */
export declare class PinnedMessageHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
/**
 * Обработчик открепления сообщения в чате
 */
export declare class UnPinnedMessageHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
/**
 * Обработчик текстовых сообщений
 */
export declare class MessageHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
/**
 * Обработчик событий редактирования сообщений
 */
export declare class EditedMessageHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
/**
 * Обработчик событий удаления сообщений
 */
export declare class DeletedMessageHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
/**
 * Обработчик комманд
 *
 * new CommandHandler("test", null, (bot, event) => {})
 *
 * new CommandHandler(["test"], null, (bot, event) => {})
 *
 * Пример комманд .test или /test
 */
export declare class CommandHandler extends MessageHandler {
    protected command: any;
    constructor(command?: any, filters?: any, callback?: any);
    check(event: any, dispatcher: any): boolean;
    protected any(event: any, dispatcher: Dispatcher): boolean;
}
export declare class HelpCommandHandler extends CommandHandler {
    constructor(filters: any, callback: any);
}
export declare class StartCommandHandler extends CommandHandler {
    constructor(filters: any, callback: any);
}
export declare class FeedbackCommandHandler extends CommandHandler {
    /**
     * ChatID moderator
     */
    private target;
    private message;
    private reply;
    private error_reply;
    constructor(target: string, message?: string, reply?: string, error_reply?: any, command?: string, filters?: any);
    check(event: any, dispatcher: any): boolean;
    private message_cb;
}
export declare class UnknownCommandHandler extends CommandHandler {
    constructor(filters: any, callback: any);
    check(event: any, dispatcher: any): boolean;
    handle(event: any, dispatcher: any): void;
}
export declare class BotButtonCommandHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
