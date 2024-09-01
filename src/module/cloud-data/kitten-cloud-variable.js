"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.KittenCloudVariable = void 0;
var signal_1 = require("../../utils/signal");
var kitten_cloud_data_1 = require("./kitten-cloud-data");
/**
 * 云变量
 */
var KittenCloudVariable = /** @class */ (function (_super) {
    __extends(KittenCloudVariable, _super);
    function KittenCloudVariable(connection, group, cvid, name, value) {
        var _this = _super.call(this, connection, group, cvid, name) || this;
        _this.group = group;
        _this.value = value;
        _this.changed = new signal_1.Signal();
        return _this;
    }
    /**
     * 获取云变量的值。
     *
     * @returns 云变量的值
     */
    KittenCloudVariable.prototype.get = function () {
        return this.value;
    };
    return KittenCloudVariable;
}(kitten_cloud_data_1.KittenCloudData));
exports.KittenCloudVariable = KittenCloudVariable;
