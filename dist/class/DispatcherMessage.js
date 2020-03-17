"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DispatcherMessage = (function () {
    function DispatcherMessage(bot) {
        this.bot = bot;
        this.handlers = [];
    }
    DispatcherMessage.prototype.getBot = function () {
        return this.bot;
    };
    DispatcherMessage.prototype.getHandlers = function () {
        return this.handlers;
    };
    DispatcherMessage.prototype.addHandler = function (handler) {
        if (this.handlers.findIndex(function (h) { return h === handler; }) >= 0)
            return;
        this.handlers.push(handler);
        // console.log("handler", this.handlers.length);
    };
    DispatcherMessage.prototype.removeHandler = function (handler) {
        if (this.handlers.indexOf(handler) != -1) {
            this.handlers = this.handlers.filter(function (r) { return r !== handler; });
        }
    };
    DispatcherMessage.prototype.dispatch = function (event) {
        var _this = this;
        try {
            console.log("Dispatching event.", event.type, this.handlers.filter(function (r) { return r.check(event, _this); }));
            for (var _i = 0, _a = this.handlers.filter(function (r) { return r.check(event, _this); }); _i < _a.length; _i++) {
                var h = _a[_i];
                h.handle(event, this);
            }
        }
        catch (ex) {
            console.error("Caught '" + ex + "' exception, stopping dispatching.");
            this.bot.stop();
        }
    };
    return DispatcherMessage;
}());
exports.DispatcherMessage = DispatcherMessage;
//# sourceMappingURL=DispatcherMessage.js.map