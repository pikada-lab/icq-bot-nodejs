"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("./Events/Event");
var HandlerBase = (function () {
    function HandlerBase(filters, callback) {
        this.filters = filters;
        this.callback = callback;
    }
    HandlerBase.prototype.check = function (event, dispatcher) {
        return (!this.filters || this.filters.filter(event));
    };
    HandlerBase.prototype.handle = function (event, dispatcher) {
        if (this.callback) {
            this.callback(dispatcher.getBot(), event);
        }
    };
    return HandlerBase;
}());
exports.HandlerBase = HandlerBase;
var DefaultHandler = (function (_super) {
    __extends(DefaultHandler, _super);
    function DefaultHandler(callback) {
        if (callback === void 0) { callback = null; }
        return _super.call(this, null, callback) || this;
    }
    DefaultHandler.prototype.check = function (event, dispatcher) {
        return _super.prototype.check.call(this, event, dispatcher) && !this.any(event, dispatcher);
    };
    DefaultHandler.prototype.any = function (event, dispatcher) {
        for (var _i = 0, _a = dispatcher.getHandlers(); _i < _a.length; _i++) {
            var h = _a[_i];
            if (h != this) {
                if (h.check(event, dispatcher))
                    return true;
            }
        }
        return false;
    };
    DefaultHandler.prototype.handle = function (event, dispatcher) {
        throw new Error("DefaultHandler");
    };
    return DefaultHandler;
}(HandlerBase));
exports.DefaultHandler = DefaultHandler;
var NewChatMembersHandler = (function (_super) {
    __extends(NewChatMembersHandler, _super);
    function NewChatMembersHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewChatMembersHandler.prototype.check = function (event, dispatcher) {
        return (_super.prototype.check.call(this, event, dispatcher) && event.type == Event_1.EventType.NEW_CHAT_MEMBERS);
    };
    return NewChatMembersHandler;
}(HandlerBase));
exports.NewChatMembersHandler = NewChatMembersHandler;
var LeftChatMembersHandler = (function (_super) {
    __extends(LeftChatMembersHandler, _super);
    function LeftChatMembersHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeftChatMembersHandler.prototype.check = function (event, dispatcher) {
        return (_super.prototype.check.call(this, event, dispatcher) && event.type == Event_1.EventType.LEFT_CHAT_MEMBERS);
    };
    return LeftChatMembersHandler;
}(HandlerBase));
exports.LeftChatMembersHandler = LeftChatMembersHandler;
var PinnedMessageHandler = (function (_super) {
    __extends(PinnedMessageHandler, _super);
    function PinnedMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PinnedMessageHandler.prototype.check = function (event, dispatcher) {
        return (_super.prototype.check.call(this, event, dispatcher) && event.type == Event_1.EventType.PINNED_MESSAGE);
    };
    return PinnedMessageHandler;
}(HandlerBase));
exports.PinnedMessageHandler = PinnedMessageHandler;
var UnPinnedMessageHandler = (function (_super) {
    __extends(UnPinnedMessageHandler, _super);
    function UnPinnedMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnPinnedMessageHandler.prototype.check = function (event, dispatcher) {
        return (_super.prototype.check.call(this, event = event, dispatcher = dispatcher) && event.type == Event_1.EventType.UNPINNED_MESSAGE);
    };
    return UnPinnedMessageHandler;
}(HandlerBase));
exports.UnPinnedMessageHandler = UnPinnedMessageHandler;
var MessageHandler = (function (_super) {
    __extends(MessageHandler, _super);
    function MessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageHandler.prototype.check = function (event, dispatcher) {
        return (_super.prototype.check.call(this, event, dispatcher) && event.type == Event_1.EventType.NEW_MESSAGE);
    };
    return MessageHandler;
}(HandlerBase));
exports.MessageHandler = MessageHandler;
var EditedMessageHandler = (function (_super) {
    __extends(EditedMessageHandler, _super);
    function EditedMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditedMessageHandler.prototype.check = function (event, dispatcher) {
        return (_super.prototype.check.call(this, event, dispatcher) &&
            event.type == Event_1.EventType.EDITED_MESSAGE);
    };
    return EditedMessageHandler;
}(HandlerBase));
exports.EditedMessageHandler = EditedMessageHandler;
var DeletedMessageHandler = (function (_super) {
    __extends(DeletedMessageHandler, _super);
    function DeletedMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeletedMessageHandler.prototype.check = function (event, dispatcher) {
        return (_super.prototype.check.call(this, event, dispatcher) && event.type == Event_1.EventType.DELETED_MESSAGE);
    };
    return DeletedMessageHandler;
}(HandlerBase));
exports.DeletedMessageHandler = DeletedMessageHandler;
var CommandHandler = (function (_super) {
    __extends(CommandHandler, _super);
    function CommandHandler(command, filters, callback) {
        if (command === void 0) { command = null; }
        if (filters === void 0) { filters = null; }
        if (callback === void 0) { callback = null; }
        var _this = _super.call(this, filters, callback) || this;
        _this.filters = (filters) ? filters : null; //  Filter.command if filters is None else Filter.command & filters,
        _this.callback = callback;
        _this.command = command;
        return _this;
    }
    CommandHandler.prototype.check = function (event, dispatcher) {
        if (_super.prototype.check.call(this, event, dispatcher)) {
            if (!this.command)
                return true;
            var command_1 = event.data["text"].split(" ")[0].toLowerCase();
            if (Array.isArray(this.command))
                return this.command.findIndex(function (c) { return c.toLowerCase() == command_1; }) >= 0;
            return this.command == command_1;
        }
    };
    return CommandHandler;
}(MessageHandler));
exports.CommandHandler = CommandHandler;
var HelpCommandHandler = (function (_super) {
    __extends(HelpCommandHandler, _super);
    function HelpCommandHandler(filters, callback) {
        return _super.call(this, "help", filters, callback) || this;
    }
    return HelpCommandHandler;
}(CommandHandler));
exports.HelpCommandHandler = HelpCommandHandler;
var StartCommandHandler = (function (_super) {
    __extends(StartCommandHandler, _super);
    function StartCommandHandler(filters, callback) {
        return _super.call(this, "start", filters, callback) || this;
    }
    return StartCommandHandler;
}(CommandHandler));
exports.StartCommandHandler = StartCommandHandler;
var FeedbackCommandHandler = (function (_super) {
    __extends(FeedbackCommandHandler, _super);
    function FeedbackCommandHandler(target, message, reply, error_reply, command, filters) {
        if (message === void 0) { message = "Feedback from {source}: {message}"; }
        if (reply === void 0) { reply = "Got it!"; }
        if (error_reply === void 0) { error_reply = null; }
        if (command === void 0) { command = "feedback"; }
        if (filters === void 0) { filters = null; }
        var _this = _super.call(this, command, filters) || this;
        _this.callback = _this.message_cb;
        _this.target = target;
        _this.message = message;
        _this.reply = reply;
        _this.error_reply = error_reply;
        return _this;
    }
    FeedbackCommandHandler.prototype.message_cb = function (bot, event) {
        return __awaiter(this, void 0, void 0, function () {
            var source, chunks, feedback_text, result, result_1, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = event.data['chat']['chatId'];
                        chunks = event.data["text"].split(" ");
                        chunks.shift();
                        feedback_text = chunks.join(' ').trim();
                        if (!feedback_text) return [3 /*break*/, 4];
                        return [4 /*yield*/, bot.sendText(this.target, this.message.replace(/\{source\}/i, source).replace(/\{message\}/i, feedback_text))];
                    case 1:
                        result = _a.sent();
                        if (!result.ok)
                            console.log("Не удалось отправить запрос sendText");
                        if (!(this.reply != "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, bot.sendText(source, this.reply)];
                    case 2:
                        result_1 = _a.sent();
                        if (!result_1.ok)
                            console.log("Не удалось отправить запрос sendText");
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        if (!(this.error_reply != "")) return [3 /*break*/, 6];
                        return [4 /*yield*/, bot.sendText(source, this.error_reply)];
                    case 5:
                        result = _a.sent();
                        if (!result.ok)
                            console.log("Не удалось отправить запрос sendText");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return FeedbackCommandHandler;
}(CommandHandler));
exports.FeedbackCommandHandler = FeedbackCommandHandler;
var UnknownCommandHandler = (function (_super) {
    __extends(UnknownCommandHandler, _super);
    function UnknownCommandHandler(filters, callback) {
        return _super.call(this, null, filters, callback) || this;
    }
    UnknownCommandHandler.prototype.check = function (event, dispatcher) {
        var _this = this;
        return _super.prototype.check.call(this, event, dispatcher) &&
            dispatcher.handlers.findIndex(function (h) { return h != _this && h.check(event, dispatcher); }) == -1;
    };
    UnknownCommandHandler.prototype.handle = function (event, dispatcher) {
        _super.prototype.handle.call(this, event, dispatcher);
        throw new Error("UnknownCommandHandler");
    };
    return UnknownCommandHandler;
}(CommandHandler));
exports.UnknownCommandHandler = UnknownCommandHandler;
var BotButtonCommandHandler = (function (_super) {
    __extends(BotButtonCommandHandler, _super);
    function BotButtonCommandHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BotButtonCommandHandler.prototype.check = function (event, dispatcher) {
        return _super.prototype.check.call(this, event, dispatcher) && event.type == Event_1.EventType.CALLBACK_QUERY;
    };
    return BotButtonCommandHandler;
}(HandlerBase));
exports.BotButtonCommandHandler = BotButtonCommandHandler;
//# sourceMappingURL=Handler.js.map