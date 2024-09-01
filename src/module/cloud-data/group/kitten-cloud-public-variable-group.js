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
exports.KittenCloudPublicVariableGroup = void 0;
var other_1 = require("../../../utils/other");
var kitten_cloud_send_message_type_1 = require("../../network/kitten-cloud-send-message-type");
var kitten_cloud_public_variable_1 = require("../kitten-cloud-public-variable");
var kitten_cloud_data_update_command_group_1 = require("../update/command/kitten-cloud-data-update-command-group");
var kitten_cloud_public_variable_set_command_1 = require("../update/command/kitten-cloud-public-variable-set-command");
var kitten_cloud_data_update_source_1 = require("../update/kitten-cloud-data-update-source");
var kitten_cloud_variable_group_1 = require("./kitten-cloud-variable-group");
var KittenCloudPublicVariableGroup = /** @class */ (function (_super) {
    __extends(KittenCloudPublicVariableGroup, _super);
    function KittenCloudPublicVariableGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataTypeName = "公有云变量";
        _this.dataUpdateSendMessageType = kitten_cloud_send_message_type_1.KittenCloudSendMessageType.UPDATE_PUBLIC_VARIABLE;
        return _this;
    }
    KittenCloudPublicVariableGroup.prototype.createData = function (cvid, name, value) {
        return new kitten_cloud_public_variable_1.KittenCloudPublicVariable(this.connection, this, cvid, name, value);
    };
    KittenCloudPublicVariableGroup.prototype.toUploadMessage = function (message) {
        if (message == "fail") {
            throw new Error("更新失败");
        }
        if (!Array.isArray(message)) {
            throw new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(message));
        }
        var errorArray = [];
        var result = {};
        for (var _i = 0, message_1 = message; _i < message_1.length; _i++) {
            var singleMessage = message_1[_i];
            if (typeof singleMessage != "object") {
                errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(message)));
                continue;
            }
            var data = this.dataMap.get(singleMessage.cvid);
            if (data == other_1.None) {
                errorArray.push(new Error("\u627E\u4E0D\u5230 cvid \u4E3A ".concat(singleMessage.cvid, " \u7684\u516C\u6709\u4E91\u53D8\u91CF")));
                continue;
            }
            result[singleMessage.cvid] = new kitten_cloud_data_update_command_group_1.KittenCloudDataUpdateCommandGroup([
                new kitten_cloud_public_variable_set_command_1.KittenCloudPublicVariableSetCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, data, singleMessage.value)
            ]);
        }
        if (errorArray.length != 0) {
            Object.assign(errorArray, {
                message: result
            });
            throw errorArray;
        }
        return result;
    };
    return KittenCloudPublicVariableGroup;
}(kitten_cloud_variable_group_1.KittenCloudVariableGroup));
exports.KittenCloudPublicVariableGroup = KittenCloudPublicVariableGroup;
