import { stringify } from "querystring";

export class ICQButton {

    /**
     * 
     * @param text example: Push me - Текст, который будет отображен на кнопке. Допустимо использовать \n для того, чтобы текст был на несколько строк
     * @param callbackData example: next-page - Данные, которые будут отправлены боту в момент нажатия на кнопку
     * @param url URL который необходимо открыть по нажатию на кнопку
     */
    constructor(private text: string, private callbackData: string, private url = null) {

    }

    getQueryStructure() {
        if (this.url) {
            return   {
                    text: this.text, 
                    url: this.url
                };
        } else {
            return {
                    text: this.text,
                    callbackData: this.callbackData
                }
        }
    }
}