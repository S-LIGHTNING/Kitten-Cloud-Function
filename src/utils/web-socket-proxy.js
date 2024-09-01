"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketProxy = void 0;
var signal_1 = require("./signal");
var WebSocketProxy = /** @class */ (function () {
    function WebSocketProxy(argument) {
        var _this = this;
        var _a, _b, _c, _d;
        if (typeof argument == "string" || argument instanceof URL) {
            this.url = argument.toString();
            this.socket = new WebSocket(this.url);
        }
        else {
            this.url = argument.url;
            this.socket = argument;
        }
        this.sended = new signal_1.Signal();
        this.opened = new signal_1.Signal();
        this.received = new signal_1.Signal();
        this.errored = new signal_1.Signal();
        this.closed = new signal_1.Signal();
        var originalSend = this.socket.send;
        var originalOnOpen = (_a = this.socket.onopen) !== null && _a !== void 0 ? _a : (function () { });
        var originalOnMessage = (_b = this.socket.onmessage) !== null && _b !== void 0 ? _b : (function () { });
        var originalOnError = (_c = this.socket.onerror) !== null && _c !== void 0 ? _c : (function () { });
        var originalOnClose = (_d = this.socket.onclose) !== null && _d !== void 0 ? _d : (function () { });
        this.socket.send = function (message) {
            originalSend.call(_this.socket, message);
            _this.sended.emit(message);
        };
        this.socket.onopen = function (event) {
            originalOnOpen.call(_this.socket, event);
            _this.opened.emit(event);
        };
        this.socket.onmessage = function (event) {
            originalOnMessage.call(_this.socket, event);
            _this.received.emit(event);
        };
        this.socket.onerror = function (event) {
            originalOnError.call(_this.socket, event);
            _this.errored.emit(event);
        };
        this.socket.onclose = function (event) {
            originalOnClose.call(_this.socket, event);
            _this.closed.emit(event);
        };
    }
    WebSocketProxy.prototype.send = function (message) {
        this.socket.send(message);
    };
    WebSocketProxy.prototype.close = function () {
        this.socket.close();
    };
    return WebSocketProxy;
}());
exports.WebSocketProxy = WebSocketProxy;
