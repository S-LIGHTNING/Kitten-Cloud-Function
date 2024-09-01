"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KittenCloudOnlineUserNumber = void 0;
var signal_1 = require("../utils/signal");
/**
 * 提供在线用户数相关功能。
 */
var KittenCloudOnlineUserNumber = /** @class */ (function () {
    function KittenCloudOnlineUserNumber(
    /**
     * 当前在线用户数。
     */
    value) {
        this.value = value;
        this.changed = new signal_1.Signal();
    }
    KittenCloudOnlineUserNumber.prototype.update = function (_a) {
        var total = _a.total;
        var originalNumber = this.value;
        var newNumber = total;
        this.value = newNumber;
        this.changed.emit({
            originalNumber: originalNumber,
            newNumber: newNumber
        });
    };
    return KittenCloudOnlineUserNumber;
}());
exports.KittenCloudOnlineUserNumber = KittenCloudOnlineUserNumber;
