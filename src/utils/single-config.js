"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleConfig = void 0;
var other_1 = require("./other");
var signal_1 = require("./signal");
var SingleConfig = /** @class */ (function () {
    function SingleConfig(upper, value) {
        var _this = this;
        this.changed = new signal_1.Signal();
        this.upper = upper;
        this.store = value;
        if (upper instanceof SingleConfig) {
            upper.changed.connect(function (change) {
                if (_this.store == other_1.None) {
                    _this.changed.emit(change);
                }
            });
        }
    }
    Object.defineProperty(SingleConfig.prototype, "config", {
        get: function () {
            return this.store;
        },
        set: function (value) {
            var originalValue = this.value;
            this.store = value;
            var newValue = this.value;
            if (originalValue != value) {
                this.changed.emit({ originalValue: originalValue, newValue: newValue });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleConfig.prototype, "value", {
        get: function () {
            if (this.store != other_1.None) {
                return this.store;
            }
            if (this.upper instanceof SingleConfig) {
                return this.upper.value;
            }
            return this.upper;
        },
        set: function (value) {
            this.config = value;
        },
        enumerable: false,
        configurable: true
    });
    return SingleConfig;
}());
exports.SingleConfig = SingleConfig;
