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
exports.KittenCloudData = void 0;
var kitten_cloud_function_config_layer_1 = require("../kitten-cloud-function-config-layer");
var kitten_cloud_data_update_manager_1 = require("./update/kitten-cloud-data-update-manager");
/**
 * 云数据。
 */
var KittenCloudData = /** @class */ (function (_super) {
    __extends(KittenCloudData, _super);
    function KittenCloudData(connection, group, cvid, name) {
        var _this = _super.call(this, group) || this;
        _this.connection = connection;
        _this.group = group;
        _this.cvid = cvid;
        _this.name = name;
        _this.updateManager = new kitten_cloud_data_update_manager_1.KittenCloudDataUpdateManager(connection, _this);
        return _this;
    }
    KittenCloudData.prototype.singleValueProcess = function (value) {
        if (typeof value == "number") {
            return value;
        }
        if (typeof value != "string") {
            throw new Error("\u4E0D\u652F\u6301\u7684\u503C\u7C7B\u578B\uFF1A".concat(typeof value));
        }
        var stringValue = value;
        if (stringValue.length > this.stringLengthLimit.value) {
            stringValue = stringValue.slice(0, this.stringLengthLimit.value);
        }
        return stringValue;
    };
    return KittenCloudData;
}(kitten_cloud_function_config_layer_1.KittenCloudFunctionConfigLayer));
exports.KittenCloudData = KittenCloudData;
