import { Filter } from "./Filter";
import { Dispatcher } from "./Dispatcher";
import { Bot } from "../class/Bot";
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
export declare class HandlerBase implements Handler {
    protected filters: Filter;
    protected callback: (bot: ICQBot, event: ICQEvent) => void;
    constructor(filters: Filter, callback: (bot: ICQBot, event: ICQEvent) => void);
    check(event: ICQEvent, dispatcher: Dispatcher): boolean;
    handle(event: ICQEvent, dispatcher: Dispatcher): void;
}
export declare class DefaultHandler extends HandlerBase {
    constructor(callback?: any);
    check(event: any, dispatcher: any): boolean;
    private any(event, dispatcher);
    handle(event: any, dispatcher: any): void;
}
export declare class NewChatMembersHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
export declare class LeftChatMembersHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
export declare class PinnedMessageHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
export declare class UnPinnedMessageHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
export declare class MessageHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
export declare class EditedMessageHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
export declare class DeletedMessageHandler extends HandlerBase {
    check(event: any, dispatcher: any): boolean;
}
export declare class CommandHandler extends MessageHandler {
    protected command: any;
    constructor(command?: any, filters?: any, callback?: any);
    check(event: any, dispatcher: any): boolean;
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
    message_cb(bot: Bot, event: ICQEvent): Promise<void>;
}
export declare class UnknownCommandHandler extends CommandHandler {
    constructor(filters: any, callback: any);
    check(event: any, dispatcher: any): boolean;
    handle(event: any, dispatcher: any): void;
}
