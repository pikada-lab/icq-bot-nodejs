import { Bot } from "../class/Bot";
import { HandlerBase, ICQEvent } from "./Handler";

/**
 * Управляет обработчиками
 */
export interface Dispatcher {
    getBot(): Bot;
    getHandlers(): HandlerBase[];
    /**
     * Добавляет обработчик
     * @param handler Обработчик событий
     */
    addHandler(handler: HandlerBase): void;
    /**
     * Убирает обработчик из диспетчера
     * @param handler Обработчик событий
     */
    removeHandler(handler: HandlerBase): void;

    /**
     * Исполнения обработчиков к событию
     * @param event Событие
     */
    dispatch(event: ICQEvent): void;
}


export class DispatcherMessage implements Dispatcher {
    handlers: HandlerBase[];
    constructor(private bot: Bot) {
        this.handlers = [];
    }
    getBot(): Bot {
        return this.bot;
    }
    getHandlers(): HandlerBase[] {
        return this.handlers;
    }
    addHandler(handler: HandlerBase): void {
       // if (this.handlers.find(h => h == handler)) return;
        this.handlers.push(handler);
        console.log("handler",this.handlers.length);
    }
    removeHandler(handler: HandlerBase): void {
        if (this.handlers.indexOf(handler) != -1) {
            this.handlers = this.handlers.filter(r => r !== handler);
        }
    }

    dispatch(event: ICQEvent): void {
        try {
            console.log(`Dispatching event.`, event.type, this.handlers.filter(r => r.check(event, this)));
            for (let h of this.handlers.filter(r => r.check(event, this))) {
                h.handle(event, this);
            }
        } catch (ex) {
            console.error(`Caught '${ex}' exception, stopping dispatching.`)
        }
    }


}
