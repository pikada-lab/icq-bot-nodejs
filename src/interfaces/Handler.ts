import { Filters, Filter } from "./Filter";
import { Dispatcher } from "./Dispatcher";
import { EventType } from "./Events/Event";
import { Bot } from "../class/Bot";
import { ICQBot } from "./ICQBot";
import { ICQEvent } from "../class/ICQEvent";
import { SkipDuplicateMessageHandler } from "../class/SkipDuplicateMessageHandler";

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
export class HandlerBase implements Handler {

    /**
     * Параметр filters может быть равен null. 
     * В таком случае вызов callback будет происходить 
     * каждый раз, когда приходит событие
     * 
     * @param filters Фильтр 
     * @param callback Функция обратного вызова
     */
    constructor(protected filters: Filters, protected callback: (bot: ICQBot, event: ICQEvent) => void) { }

    check(event: ICQEvent, dispatcher: Dispatcher) { 
         return (!this.filters || this.filters.filter(event));
    }
    handle(event: ICQEvent, dispatcher: Dispatcher) {
        if (this.callback) {
            this.callback(dispatcher.getBot(), event)
        }
    }
}

/**
 * Обработчик для всех событий которые небудут обработаны
 * 
 * Срабатывает всегда, когда приходит событие из и на это событие нет обработчика пуллинга
 */
export class DefaultHandler extends HandlerBase {
    constructor(callback = null) {
        super(null, callback);
    }

    check(event, dispatcher) { 
        return super.check(event, dispatcher) && !this.any(event, dispatcher)
    }
    protected any(event, dispatcher: Dispatcher): boolean {
        for (let h of dispatcher.getHandlers()) {
            if (h != this && !(h instanceof SkipDuplicateMessageHandler)) {
                if (h.check(event, dispatcher)) return true;
            }
        }
        return false
    }

    handle(event, dispatcher) {
        throw new Error("DefaultHandler");
    }
}

/**
 * Обработчик новых участников группового чата 
 * 
 * Срабатывает когда в группу вступает новый пользователь
 */
export class NewChatMembersHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (super.check(event, dispatcher) && event.type == EventType.NEW_CHAT_MEMBERS);
    }
}

/**
 * Обработчик выхода из группы участника
 */
export class LeftChatMembersHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (super.check(event, dispatcher) && event.type == EventType.LEFT_CHAT_MEMBERS);
    }
}

/**
 * Обработчик закрепа сообщения в чате
 */
export class PinnedMessageHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (super.check(event, dispatcher) && event.type == EventType.PINNED_MESSAGE);
    }
}

/**
 * Обработчик открепления сообщения в чате
 */
export class UnPinnedMessageHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (super.check(event = event, dispatcher = dispatcher) && event.type == EventType.UNPINNED_MESSAGE);
    }
}

/**
 * Обработчик текстовых сообщений 
 */
export class MessageHandler extends HandlerBase {
    public check(event, dispatcher) { 
         return (super.check(event, dispatcher) && event.type == EventType.NEW_MESSAGE)
    }
}

/**
 * Обработчик событий редактирования сообщений
 */
export class EditedMessageHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (
            super.check(event, dispatcher) &&
            event.type == EventType.EDITED_MESSAGE
        )
    }
}

/**
 * Обработчик событий удаления сообщений
 */
export class DeletedMessageHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (super.check(event, dispatcher) && event.type == EventType.DELETED_MESSAGE)
    }
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
export class CommandHandler extends MessageHandler {
    protected command;
    constructor(command = null, filters = null, callback = null) {
        super(filters, callback);
        this.filters = (filters) ? filters : Filter.command;  
        this.callback = callback
        this.command = command
    }
    public check(event, dispatcher) {
        if (super.check(event, dispatcher)) {
            if (!this.command) return true;
            let command = event.data.text.split(" ")[0].toLowerCase().replace(/^(.|\/)/,'') 
            if (Array.isArray(this.command)) return this.command.findIndex(c => c.toLowerCase() == command) >= 0
            return this.command == command;
        }
        return false;
    }

    protected any(event, dispatcher: Dispatcher): boolean {
        for (let h of dispatcher.getHandlers()) {
            if (h != this && h instanceof CommandHandler) {
                if (h.check(event, dispatcher)) return true;
            }
        }
        return false
    }

}
export class HelpCommandHandler extends CommandHandler {
    constructor(filters, callback) {
        super("help", filters, callback)
    }
}
export class StartCommandHandler extends CommandHandler {
    constructor(filters, callback) {
        super("start", filters, callback)
    }
}

export class FeedbackCommandHandler extends CommandHandler {

    /**
     * ChatID moderator
     */
    private target: string;
    private message: String;
    private reply;
    private error_reply;

    constructor(target: string, message = "Feedback from {source}: {message}", reply = "Got it!", error_reply = null,
        command = "feedback", filters = null
    ) {
        super(command, filters);
        this.callback = this.message_cb;
        this.target = target
        this.message = message
        this.reply = reply
        this.error_reply = error_reply
    }

    public check(event, dispatcher) {
        return (super.check(event, dispatcher))
    }

    private async message_cb(bot: Bot, event: ICQEvent) {
 
        let source = event.data['chat']['chatId'];
        let chunks = event.data["text"].split(" ");
        chunks.shift();
        let feedback_text = chunks.join(' ').trim(); // TODO 
        if (feedback_text) {
            let result = await bot.sendText(this.target, this.message.replace(/\{source\}/i, source).replace(/\{message\}/i, feedback_text))

            if (!result.ok) console.log("Не удалось отправить запрос sendText");
            if (this.reply != "") {
                let result = await bot.sendText(source, this.reply)
                if (!result.ok) console.log("Не удалось отправить запрос sendText");
            }  
        } else if (this.error_reply != "") {
            let result = await bot.sendText(source, this.error_reply)
            if (!result.ok) console.log("Не удалось отправить запрос sendText");
        }
    }
}

export class UnknownCommandHandler extends CommandHandler {
    constructor(filters, callback) {
        super(null, filters, callback);
    }
    public check(event, dispatcher) {

         return super.check(event, dispatcher) &&
            dispatcher.handlers.findIndex(h => h != this && h.check(event, dispatcher)) == -1
    }

    public handle(event, dispatcher) { 
        super.handle(event, dispatcher) 
        throw new Error("UnknownCommandHandler");
    }
}

export class BotButtonCommandHandler extends HandlerBase {
    public check(event, dispatcher) {
        return super.check(event, dispatcher) && event.type == EventType.CALLBACK_QUERY
    }
}
