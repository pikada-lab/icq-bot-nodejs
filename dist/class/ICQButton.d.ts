export declare class ICQButton {
    private text;
    private callbackData;
    private url;
    /**
     *
     * @param text example: Push me - Текст, который будет отображен на кнопке. Допустимо использовать \n для того, чтобы текст был на несколько строк
     * @param callbackData example: next-page - Данные, которые будут отправлены боту в момент нажатия на кнопку
     * @param url URL который необходимо открыть по нажатию на кнопку
     */
    constructor(text: string, callbackData: string, url?: any);
    getQueryStructure(): {
        text: string;
        url: any;
    } | {
        text: string;
        callbackData: string;
    };
}
