"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ICQButton = (function () {
    /**
     *
     * @param text example: Push me - Текст, который будет отображен на кнопке. Допустимо использовать \n для того, чтобы текст был на несколько строк
     * @param callbackData example: next-page - Данные, которые будут отправлены боту в момент нажатия на кнопку
     * @param url URL который необходимо открыть по нажатию на кнопку
     */
    function ICQButton(text, callbackData, url) {
        if (url === void 0) { url = null; }
        this.text = text;
        this.callbackData = callbackData;
        this.url = url;
    }
    ICQButton.prototype.getQueryStructure = function () {
        if (this.url) {
            return {
                text: this.text,
                url: this.url
            };
        }
        else {
            return {
                text: this.text,
                callbackData: this.callbackData
            };
        }
    };
    return ICQButton;
}());
exports.ICQButton = ICQButton;
//# sourceMappingURL=ICQButton.js.map