"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bot_1 = require("./class/Bot");
var Handler_1 = require("./interfaces/Handler");
var Filter_1 = require("./interfaces/Filter");
var ICQButton_1 = require("./class/ICQButton");
/**
 * Фасад ICQ
 */
var ICQ = (function () {
    function ICQ() {
    }
    /**
     * Класс кнопки для сообщений
     */
    ICQ.Button = ICQButton_1.ICQButton;
    /**
     * Бот для вызова
     */
    ICQ.Bot = Bot_1.Bot;
    /**
     * Базовые фильтры для обработчиков
     */
    ICQ.Filter = Filter_1.Filter;
    /**
     * Базовые обработчики.
     *
     * Обратите внимание, что если под одно событие
     * подходят несколько обработчиков, то будут вызваны оба.
     */
    ICQ.Handler = {
        HelpCommand: Handler_1.HelpCommandHandler,
        Message: Handler_1.MessageHandler,
        NewChatMembers: Handler_1.NewChatMembersHandler,
        LeftChatMembers: Handler_1.LeftChatMembersHandler,
        PinnedMessage: Handler_1.PinnedMessageHandler,
        UnPinnedMessage: Handler_1.UnPinnedMessageHandler,
        EditedMessage: Handler_1.EditedMessageHandler,
        DeletedMessage: Handler_1.DeletedMessageHandler,
        Command: Handler_1.CommandHandler,
        StartCommand: Handler_1.StartCommandHandler,
        FeedbackCommand: Handler_1.FeedbackCommandHandler,
        UnknownCommand: Handler_1.UnknownCommandHandler,
        All: Handler_1.DefaultHandler,
        BotButtonCommand: Handler_1.BotButtonCommandHandler
    };
    return ICQ;
}());
exports.default = ICQ;
//# sourceMappingURL=index.js.map