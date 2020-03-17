import { Response } from "./Response";
/** Запрос успешно обработан. Сервер вернул id сообщения. */
export interface ResponseMessage extends Response {
    /**
     * Id сообщения
     * @example 57883346846815032
     */
    msgId: string;
}
