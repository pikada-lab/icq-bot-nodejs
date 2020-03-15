import { Bot } from "../class/Bot";
import { HandlerBase } from "./Handler";
import { ICQEvent } from "../class/ICQEvent"
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
