"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signal = void 0;
/**
 * 信号，用于向外界发送消息。
 */
var Signal = /** @class */ (function () {
    function Signal() {
        this.slots = [];
    }
    /**
     * 连接一个消息接收函数，当有消息被发送时，该函数将被调用。
     *
     * @param slot 接收函数
     */
    Signal.prototype.connect = function (slot) {
        this.slots.push(slot);
    };
    /**
     * 断开一个消息接收函数，使其不再接收消息。如果该函数不在接收列表中，则什么也不做。
     *
     * @param slot 要断开的接收函数
     */
    Signal.prototype.disconnect = function (slot) {
        var index = this.slots.indexOf(slot);
        if (index >= 0) {
            this.slots.splice(index, 1);
        }
    };
    Signal.prototype.clear = function () {
        this.slots = [];
    };
    Signal.prototype.isEmpty = function () {
        return this.slots.length == 0;
    };
    Signal.prototype.emit = function (message) {
        this.slots.slice().forEach(function (slot) {
            slot(message);
        });
    };
    /**
     * 等待消息被发送或超时。
     *
     * @param timeout 超时时间（毫秒），`0` 表示永不超时。
     * @returns 一个 Promise 对象，当收到消息时，该对象将被 resolve，如果等待超时，则该对象将被 reject。
     */
    Signal.prototype.wait = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 0; }
        return new Promise(function (resolve, reject) {
            var slot = function (message) {
                _this.disconnect(slot);
                resolve(message);
            };
            _this.connect(slot);
            if (timeout > 0) {
                setTimeout(function () {
                    _this.disconnect(slot);
                    reject(new Error("Timeout"));
                }, timeout);
            }
        });
    };
    return Signal;
}());
exports.Signal = Signal;
