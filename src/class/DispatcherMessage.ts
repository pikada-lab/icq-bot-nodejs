import { Bot } from "./Bot";
import { HandlerBase } from "../interfaces/Handler";
import { ICQEvent } from "./ICQEvent";
import { Dispatcher } from "../interfaces/Dispatcher";
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
        if (this.handlers.findIndex((h: HandlerBase) => h === handler) >= 0) return;
        this.handlers.push(handler);
        // console.log("handler", this.handlers.length);
    }
    removeHandler(handler: HandlerBase): void {
        if (this.handlers.indexOf(handler) != -1) {
            this.handlers = this.handlers.filter(r => r !== handler);
        }
    }
    dispatch(event: ICQEvent): void {
        try {
           // console.log(`Dispatching event.`, event.type, this.handlers.filter(r => r.check(event, this)));
            for (let h of this.handlers.filter(r => r.check(event, this))) {
                h.handle(event, this);
            }
        }
        catch (ex) {
            console.error(`Caught '${ex}' exception, stopping dispatching.`);
            this.bot.stop();
        }
    }
}
