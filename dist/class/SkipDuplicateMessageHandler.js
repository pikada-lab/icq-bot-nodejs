"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipDuplicateMessageHandler = void 0;
var Handler_1 = require("../interfaces/Handler");
/**
 * Пропускает повторяющиеся транзакции сверяя их номера (сообщений) с номерами в кэше
 */
var SkipDuplicateMessageHandler = /** @class */ (function (_super) {
    __extends(SkipDuplicateMessageHandler, _super);
    /**
     *
     * @param cache Это объект типа ключ значение, где ключ это номер в виде строки, а значение - текст сообщения
     */
    function SkipDuplicateMessageHandler(cache) {
        var _this = _super.call(this, null, null) || this;
        _this.cache = cache;
        if (!_this.cache)
            _this.cache = {};
        return _this;
    }
    SkipDuplicateMessageHandler.prototype.check = function (event, dispatcher) {
        if (_super.prototype.check.call(this, event, dispatcher)) {
            for (var i in this.cache) {
                //    console.log(i,(event.data as NewMessageEvent).msgId, this.cache[i], event.text)
                if (i && i == event.data.msgId && this.cache[i] == event.text) {
                    // return false;
                    throw new Error("Caught StopDispatching id'" + i + "' exception, stopping dispatching.");
                }
            }
            this.cache[event.data.msgId] = event.text;
        }
        return true;
    };
    return SkipDuplicateMessageHandler;
}(Handler_1.MessageHandler));
exports.SkipDuplicateMessageHandler = SkipDuplicateMessageHandler;
//# sourceMappingURL=SkipDuplicateMessageHandler.js.map