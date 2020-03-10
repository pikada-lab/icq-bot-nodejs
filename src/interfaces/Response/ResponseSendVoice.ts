import { ResponseMessage } from "./ResponseMessage";

    /** Отправить ранее загруженный файл */
    export interface ResponseSendVoice extends ResponseMessage { }
    /** Загрузить файл */
    export interface ResponseUploadVoice extends ResponseMessage {
        /**
         * ID файла
         * @example 0dC76vcKS3XZOtG5DVs9y15d1daefa1ae
         */
        fileId: string;
    }
