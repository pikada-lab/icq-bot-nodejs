import { MessageHandler } from "../interfaces/Handler";
import { ICQEvent } from "./ICQEvent";
import { Dispatcher } from "../interfaces/Dispatcher";
import { NewMessageEvent } from "../interfaces/Events/NewMessageEvent";
/**
 * Пропускает повторяющиеся транзакции сверяя их номера (сообщений) с номерами в кэше
 */
export class SkipDuplicateMessageHandler extends MessageHandler {
    /**
     *
     * @param cache Это объект типа ключ значение, где ключ это номер в виде строки, а значение - текст сообщения
     */
    constructor(protected cache: {
        [key: string]: string;
    }) {
        super(null, null);
        if (!this.cache)
            this.cache = {};
    }
    public check(event: ICQEvent, dispatcher: Dispatcher) {
        if (super.check(event, dispatcher)) {
            for (let i in this.cache) {
            //    console.log(i,(event.data as NewMessageEvent).msgId, this.cache[i], event.text)
                if (i && i == (event.data as NewMessageEvent).msgId && this.cache[i] == event.text) {
                   // return false;
                   throw new Error(`Caught StopDispatching id'${i}' exception, stopping dispatching.`);
                }
            }
            (this.cache as any)[(event.data as NewMessageEvent).msgId] = event.text;
        }
        return true;
    }
}
