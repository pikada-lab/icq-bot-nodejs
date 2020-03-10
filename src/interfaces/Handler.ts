import { Filter } from "./Filter";
import { Dispatcher } from "./Dispatcher";
import { EventType } from "./Events/Event";
import { NewMessageEvent } from "./Events/NewMessageEvent";
import { EditedMessageEvent } from "./Events/EditedMessageEvent";
import { DeletedMessageEvent } from "./Events/DeletedMessageEvent";
import { PinnedMessageEvent } from "./Events/PinnedMessageEvent";
import { UnpinnedMessageEvent } from "./Events/UnpinnedMessageEvent";
import { NewChatMembersEvent } from "./Events/NewChatMembersEvent";
import { LeftChatMembersEvent } from "./Events/LeftChatMembersEvent";
import { UserWidthName } from "./Entities/User";
import { Event } from "./Events/Event";
import { Bot } from "../class/Bot";
import { ICQBot } from "./ICQBot";

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
        console.log(super.check(event, dispatcher));
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
            let command = event.data["text"].split(" ")[0].toLowerCase()
            return !this.command || this.command.findIndex(c => c.toLowerCase() == command) >= 0

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

    private target: string; // chat id
    private message: String;
    private reply;
    private error_reply;
    constructor(target: string, message = "Feedback from {source}: {message}", reply = "Got it!", error_reply = null,
        command = "feedback", filters = null
    ) {
        super(command, filters) // TODO WTF
        this.callback = this.message_cb;
        this.target = target
        this.message = message
        this.reply = reply
        this.error_reply = error_reply
    }
    public async message_cb(bot: Bot, event: ICQEvent) {
        let source = event.data['chat']['chatId']
        let feedback_text = event.data["text"].split(" ")[2].strip() // TODO

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
        super(filters, callback);
    }
    public check(event, dispatcher) {
        return super.check(event, dispatcher) && !
            dispatcher.handlers.foreach(h => h != this && h.check(event, dispatcher))
    }

    public handle(event, dispatcher) {
        super.handle(event, dispatcher)
        return new Error("UnknownCommandHandler");
    }
}

export class ICQEvent {
    type: EventType;
    data: NewMessageEvent | EditedMessageEvent | DeletedMessageEvent | PinnedMessageEvent | UnpinnedMessageEvent | NewChatMembersEvent | LeftChatMembersEvent
    text: String;
    messageAuthor: UserWidthName;
    fromChatId: string;
    constructor(event: Event) {
        this.type = event.type;
        this.data = event.payload;
        if (this.type == EventType.NEW_MESSAGE) {
            this.text = (this.data as NewMessageEvent).text
            this.fromChatId = (this.data as NewMessageEvent).chat.chatId
            this.messageAuthor = (this.data as NewMessageEvent).from
        }
    }
}

    // class Event(object):
    // def __init__(self, type_, data):
    //     super(Event, self).__init__()

    //     self.type = type_
    //     self.data = data

    //     if type_ == EventType.NEW_MESSAGE:
    //         self.text = data['text']
    //         self.from_chat = data['chat']['chatId']
    //         self.message_author = data['from']

    // def __repr__(self):
    //     return "Event(type='{self.type}', data='{self.data}')".format(self=self)


    // export class MessageHandler implements Handler {

    //     constructor(callback: (response: Response) => void) {
    //         this.filter = new MessageFilter();
    //     }

    //     check(event: Event, dispatcher: Dispatcher) {

    //     };
    //     handler(event: Event, dispatcher: Dispatcher) {

    //     };
    // }
