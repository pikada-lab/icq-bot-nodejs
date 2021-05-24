import { ResponseAdmin } from "./Response/ResponseAdmin";
import { Self } from "./Entities/Self";
import { ResponseMessage } from "./Response/ResponseMessage";
import { ResponseSendFile, ResponseUploadFile } from "./Response/ResponseSendFile";
import { ResponseSendVoice, ResponseUploadVoice } from "./Response/ResponseSendVoice";
import { Chat } from "./Entities/Chat";
import { ResponseFileInfo } from "./Response/ResponseFileInfo";
import { ResponseEvent } from "./Events/Event";
import { ResponseMembers } from "./Response/ResponseMembers";
import { ResponseUsers } from "./Response/ResponseUsers";
import { ICQButton } from "../class/ICQButton";
import { Format } from "./Format";
export interface ICQOptions {
    apiUrlBase: string;
    name: string;
    version: string;
    timeoutS: number;
    pollTimeS: number;
}
export interface MembersItem {
    sn: string | number;
}
export interface ICQBot {
    /** Вовзращает уникальный номер бота, он находится в токене после символа двоеточие. */
    getUNI(): number;
    /** Возвращает название агента для заголовков запроса */
    getUserAgent(): string;
    /** Запускает считывание событий через лонг пуллинг */
    startPolling(): ICQBot;
    /** Корректно останавливает работу лонг пуллинга */
    stop(): ICQBot;
    /**
     * ## Events/get
     * Каждое событие имеет идентификатор **eventId**.
     * При вызове метода нужно передать максимальный из известных
     * идентификаторов событий в параметре **lastEventId**.
     * При первом вызове данного метода в качестве значения этого параметра следует передать 0.
     * При отсутствии событий на сервере в момент выполнения запроса,
     * соединение остается открытым. Как только появится событие сервер его вернёт,
     * завершив открытый запрос. Если в течении **pollTime** секунд события не появились,
     * возвращается пустой массив **events**.
     *
     *
     *
     * @param pollTimeS Время удержания соединения (в секундах).
     * @param lastEventId Id последнего известного события.
     */
    eventsGet(pollTimeS: number, lastEventId: number): Promise<ResponseEvent>;
    /**
     * ## Self/get
     *
     * Возвращает самого себя
     */
    selfGet(): Promise<Self>;
    /**
     * ## Messages/sendText
     *
     * Отправляет текстовое сообщение в чат/группу
     *
     * @param chatId Уникальный ник или id чата или пользователя. Id можно получить из входящих **events** (поле chatId).
     * @param text Текст сообщения. Можно упомянуть пользователя, добавив в текст его userId в следующем формате @[userId].
     * @param replyMsgId Id цитируемого сообщения. Не может быть передано одновременно с параметрами forwardChatId и forwardMsgId.
     * @param forwardChatId Id чата, из которого будет переслано сообщение. Передается только с forwardMsgId. Не может быть передано с параметром replyMsgId.
     * @param forwardMsgId Id пересылаемого сообщения. Передается только с forwardChatId. Не может быть передано с параметром replyMsgId.
     * @param inlineKeyboardMarkup Это массив массивов с описанием кнопок. Верхний уровень это массив строк кнопок, ниже уровнем массив кнопок в конкретной строке.
     */
    sendText(chatId: string, text: String, replyMsgId?: string, forwardChatId?: string, forwardMsgId?: string, inlineKeyboardMarkup?: ICQButton | ICQButton[] | ICQButton[][], format?: Format): Promise<ResponseMessage>;
    /**
     * ## Messages/sendFile
     *
     * Загружает файл на сервер / отправляет файл в чат по номеру
     *
     * @param chatId Уникальный ник или id чата или пользователя. Id можно получить из входящих events (поле chatId).
     * @param fileId Id ранее загруженного файла.
     * @param file Файл (Обязателен если нет fileId)
     * @param caption Подпись к файлу.
     * @param replyMsgId Id цитируемого сообщения. Не может быть передано одновременно с параметрами forwardChatId и forwardMsgId.
     * @param forwardChatId Id чата, из которого будет переслано сообщение. Передается только с forwardMsgId. Не может быть передано с параметром replyMsgId.
     * @param forwardMsgId Id пересылаемого сообщения. Передается только с forwardChatId. Не может быть передано с параметром replyMsgId.
     * @param inlineKeyboardMarkup Это массив массивов с описанием кнопок. Верхний уровень это массив строк кнопок, ниже уровнем массив кнопок в конкретной строке.
     */
    sendFile(chatId: string, fileId: string, file: string, caption: String, replyMsgId?: String, forwardChatId?: String, forwardMsgId?: String, inlineKeyboardMarkup?: ICQButton | ICQButton[] | ICQButton[][], format?: Format): Promise<ResponseUploadFile | ResponseSendFile>;
    sendVoice(chatId: string, fileId: string, file: string, replyMsgId?: String, forwardChatId?: String, forwardMsgId?: String, inlineKeyboardMarkup?: ICQButton | ICQButton[] | ICQButton[][]): Promise<ResponseUploadVoice | ResponseSendVoice>;
    editText(chatId: string, msgId: string, text: String, inlineKeyboardMarkup?: ICQButton | ICQButton[] | ICQButton[][], format?: Format): Promise<Response>;
    deleteMessages(chatId: string, msgId: string): Promise<Response>;
    /** Работа с событиями на ответ обработки кнопки */
    answerCallbackQuery(chatId: string, text: string, showAlert: boolean, url: string): Promise<Response>;
    /** Отправить действия в чат */
    sendActions(chatId: string, actions: 'looking' | 'typing'): Promise<Response>;
    /** Получить информацию о чате */
    getChatInfo(chatId: string): Promise<Chat>;
    /** Получить список администраторов чата */
    getChatAdmins(chatId: string): Promise<ResponseAdmin>;
    /**
     * Подробности по файлу
     * @param fileId Номер файла
     */
    getFileInfo(fileId: string): Promise<ResponseFileInfo>;
    pinMessage(chatId: string, msgId: string): Promise<Response>;
    unpinMessage(chatId: string, msgId: string): Promise<Response>;
    setTitle(chatId: string, title: string): Promise<Response>;
    setAbout(chatId: string, text: string): Promise<Response>;
    setRules(chatId: string, rules: string): Promise<Response>;
    setAvatar(chatId: string, file: string): Promise<Response>;
    getMembers(chatId: string, cursor?: string): Promise<ResponseMembers>;
    deleteMembers(chatId: string, members: MembersItem[]): Promise<Response>;
    getBlockedUsers(chatId: string): Promise<ResponseUsers>;
    getPendingUsers(chatId: string): Promise<ResponseUsers>;
    blockUser(chatId: string, userId: string, delLastMessages?: boolean): Promise<Response>;
    unblockUser(chatId: string, userId: string): Promise<Response>;
    resolvePending(chatId: string, approve: boolean, userId?: string, everyone?: boolean): Promise<Response>;
}
