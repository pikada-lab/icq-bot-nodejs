import { MessageHandler } from "../interfaces/Handler";
import { ICQEvent } from "./ICQEvent";
import { Dispatcher } from "../interfaces/Dispatcher";
/**
 * Пропускает повторяющиеся транзакции сверяя их номера (сообщений) с номерами в кэше
 */
export declare class SkipDuplicateMessageHandler extends MessageHandler {
    protected cache: {
        [key: string]: string;
    };
    /**
     *
     * @param cache Это объект типо ключ значение, где ключ это номер в виде строки, а значение - текст сообщения
     */
    constructor(cache: {
        [key: string]: string;
    });
    check(event: ICQEvent, dispatcher: Dispatcher): boolean;
}
