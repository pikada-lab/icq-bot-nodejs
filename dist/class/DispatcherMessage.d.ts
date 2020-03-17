import { Bot } from "./Bot";
import { HandlerBase } from "../interfaces/Handler";
import { ICQEvent } from "./ICQEvent";
import { Dispatcher } from "../interfaces/Dispatcher";
export declare class DispatcherMessage implements Dispatcher {
    private bot;
    handlers: HandlerBase[];
    constructor(bot: Bot);
    getBot(): Bot;
    getHandlers(): HandlerBase[];
    addHandler(handler: HandlerBase): void;
    removeHandler(handler: HandlerBase): void;
    dispatch(event: ICQEvent): void;
}
