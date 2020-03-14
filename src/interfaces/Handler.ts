import { Filter } from "./Filter";
import { Dispatcher } from "./Dispatcher";
import { EventType } from "./Events/Event";
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

export class HandlerBase implements Handler {
    constructor(protected filters: Filter, protected callback: (bot: ICQBot, event: ICQEvent) => void) { }

    check(event: ICQEvent, dispatcher: Dispatcher) { 
        return (!this.filters || this.filters.filter(event));
    }
    handle(event: ICQEvent, dispatcher: Dispatcher) {
        if (this.callback) {
            this.callback(dispatcher.getBot(), event)
        }
    }
}

export class DefaultHandler extends HandlerBase {
    constructor(callback = null) {
        super(null, callback);
    }

    check(event, dispatcher) {
        return this.check(event, dispatcher) && !this.any(event, dispatcher)
    }
    private any(event, dispatcher: Dispatcher): boolean {
        for (let h of dispatcher.getHandlers()) {
            if (h != this) {
                if (!h.check(event, dispatcher)) return false;
            }
        }
        return true
    }

    handle(event, dispatcher) {
        throw new Error("DefaultHandler");
    }
}
export class NewChatMembersHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (super.check(event, dispatcher) && event.type == EventType.NEW_CHAT_MEMBERS);
    }
}
export class LeftChatMembersHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (super.check(event, dispatcher) && event.type == EventType.LEFT_CHAT_MEMBERS);
    }
}

export class PinnedMessageHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (super.check(event, dispatcher) && event.type == EventType.PINNED_MESSAGE);
    }
}

export class UnPinnedMessageHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (super.check(event = event, dispatcher = dispatcher) && event.type == EventType.UNPINNED_MESSAGE);
    }
}


export class MessageHandler extends HandlerBase {
    public check(event, dispatcher) { 
        return (super.check(event, dispatcher) && event.type == EventType.NEW_MESSAGE)
    }
}


export class EditedMessageHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (
            super.check(event, dispatcher) &&
            event.type == EventType.EDITED_MESSAGE
        )
    }
}

export class DeletedMessageHandler extends HandlerBase {
    public check(event, dispatcher) {
        return (super.check(event, dispatcher) && event.type == EventType.DELETED_MESSAGE)
    }
}


export class CommandHandler extends MessageHandler {
    protected command;
    constructor(command = null, filters = null, callback = null) {
        super(filters, callback);
        this.filters = (filters) ? filters : null; //  Filter.command if filters is None else Filter.command & filters,
        this.callback = callback
        this.command = command
    }
    public check(event, dispatcher) {
        if (super.check(event, dispatcher)) {
            if (!this.command) return true;
            let command = event.data["text"].split(" ")[0].toLowerCase()
            if (Array.isArray(this.command)) return this.command.findIndex(c => c.toLowerCase() == command) >= 0
            return this.command == command;
        }
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
    public async message_cb(bot: Bot, event: ICQEvent) {

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
        return new Error("UnknownCommandHandler");
    }
}

