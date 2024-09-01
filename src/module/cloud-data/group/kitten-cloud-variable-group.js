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
exports.KittenCloudVariableGroup = void 0;
var kitten_cloud_data_group_1 = require("./kitten-cloud-data-group");
var KittenCloudVariableGroup = /** @class */ (function (_super) {
    __extends(KittenCloudVariableGroup, _super);
    function KittenCloudVariableGroup(connection, config) {
        if (config === void 0) { config = {}; }
        return _super.call(this, connection, config) || this;
    }
    KittenCloudVariableGroup.prototype.toCloudUploadMessage = function (message) {
        var result = [];
        for (var _i = 0, _a = Object.values(message); _i < _a.length; _i++) {
            var singleDataMessage = _a[_i];
            for (var _b = 0, _c = singleDataMessage.toCloudJSON(); _b < _c.length; _b++) {
                var singleMessage = _c[_b];
                result.push(singleMessage);
            }
        }
        return result;
    };
    return KittenCloudVariableGroup;
}(kitten_cloud_data_group_1.KittenCloudDataGroup));
exports.KittenCloudVariableGroup = KittenCloudVariableGroup;
