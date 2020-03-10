import { Response } from "./Response";

export interface ResponseFileInfo extends Response {
    /**
     * @example "video"
     */
    type: string;

    /**
     * @example 20971520
     */
    size: number;

    /**
     * @example "VIDEO.mkv"
     */
    filename: string;

    /**
     * @example "https://example.com/get/88MfCLBHphvOAOeuzYhZfW5b7bcfa31ab"
     */
    url: string;

}
