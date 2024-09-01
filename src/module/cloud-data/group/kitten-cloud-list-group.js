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
exports.KittenCloudListGroup = void 0;
var other_1 = require("../../../utils/other");
var kitten_cloud_send_message_type_1 = require("../../network/kitten-cloud-send-message-type");
var kitten_cloud_list_1 = require("../kitten-cloud-list");
var kitten_cloud_data_update_command_group_1 = require("../update/command/kitten-cloud-data-update-command-group");
var kitten_cloud_list_add_command_1 = require("../update/command/kitten-cloud-list-add-command");
var kitten_cloud_list_empty_command_1 = require("../update/command/kitten-cloud-list-empty-command");
var kitten_cloud_list_pop_command_1 = require("../update/command/kitten-cloud-list-pop-command");
var kitten_cloud_list_push_command_1 = require("../update/command/kitten-cloud-list-push-command");
var kitten_cloud_list_remove_command_1 = require("../update/command/kitten-cloud-list-remove-command");
var kitten_cloud_list_replace_command_1 = require("../update/command/kitten-cloud-list-replace-command");
var kitten_cloud_list_replace_last_command_1 = require("../update/command/kitten-cloud-list-replace-last-command");
var kitten_cloud_list_unshift_command_1 = require("../update/command/kitten-cloud-list-unshift-command");
var kitten_cloud_data_update_source_1 = require("../update/kitten-cloud-data-update-source");
var kitten_cloud_data_group_1 = require("./kitten-cloud-data-group");
var KittenCloudListGroup = /** @class */ (function (_super) {
    __extends(KittenCloudListGroup, _super);
    function KittenCloudListGroup(connection) {
        var _this = _super.call(this, connection, {
            localPreupdate: false
        }) || this;
        _this.dataTypeName = "云列表";
        _this.dataUpdateSendMessageType = kitten_cloud_send_message_type_1.KittenCloudSendMessageType.UPDATE_LIST;
        return _this;
    }
    KittenCloudListGroup.prototype.createData = function (cvid, name, value) {
        return new kitten_cloud_list_1.KittenCloudList(this.connection, this, cvid, name, value);
    };
    KittenCloudListGroup.prototype.toCloudUploadMessage = function (message) {
        var _a, _b;
        var newMessage = {};
        for (var cvid in message) {
            if ((_a = message[cvid]) === null || _a === void 0 ? void 0 : _a.isEmpty()) {
                continue;
            }
            newMessage[cvid] = (_b = message[cvid]) === null || _b === void 0 ? void 0 : _b.toCloudJSON();
        }
        return newMessage;
    };
    KittenCloudListGroup.prototype.toUploadMessage = function (message) {
        if (message == other_1.None) {
            throw new Error("更新数据为空");
        }
        if (!(typeof message == "object")) {
            throw new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(message));
        }
        var result = {};
        var errorArray = [];
        for (var cvid in message) {
            var data = this.dataMap.get(cvid);
            if (data == other_1.None) {
                errorArray.push(new Error("\u672A\u627E\u5230\u6570\u636E\uFF1A".concat(cvid)));
                continue;
            }
            var item = message[cvid];
            result[cvid] = new kitten_cloud_data_update_command_group_1.KittenCloudDataUpdateCommandGroup();
            if (item == other_1.None) {
                errorArray.push(new Error("更新数据为空"));
            }
            else if (!Array.isArray(item)) {
                errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(item))));
            }
            else {
                for (var _i = 0, item_1 = item; _i < item_1.length; _i++) {
                    var singleMessage = item_1[_i];
                    if (singleMessage == other_1.None) {
                        errorArray.push(new Error("更新数据为空"));
                    }
                    else if (!(typeof singleMessage == "object" &&
                        "action" in singleMessage && typeof singleMessage.action == "string")) {
                        errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(singleMessage))));
                    }
                    else {
                        switch (singleMessage.action) {
                            case "append":
                                if ("value" in singleMessage &&
                                    (typeof singleMessage.value == "number" ||
                                        typeof singleMessage.value == "string")) {
                                    result[cvid].add(new kitten_cloud_list_push_command_1.KittenCloudListPushCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, data, singleMessage.value));
                                }
                                else {
                                    errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(singleMessage))));
                                }
                                break;
                            case "unshift":
                                if ("value" in singleMessage &&
                                    (typeof singleMessage.value == "number" ||
                                        typeof singleMessage.value == "string")) {
                                    result[cvid].add(new kitten_cloud_list_unshift_command_1.KittenCloudListUnshiftCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, data, singleMessage.value));
                                }
                                else {
                                    errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(singleMessage))));
                                }
                                break;
                            case "insert":
                                if ("nth" in singleMessage && typeof singleMessage.nth == "number" &&
                                    "value" in singleMessage &&
                                    (typeof singleMessage.value == "number" ||
                                        typeof singleMessage.value == "string")) {
                                    result[cvid].add(new kitten_cloud_list_add_command_1.KittenCloudListAddCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, data, singleMessage.nth - 1, singleMessage.value));
                                }
                                else {
                                    errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(singleMessage))));
                                }
                                break;
                            case "delete":
                                if (!("nth" in singleMessage)) {
                                    errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(singleMessage))));
                                }
                                else if (singleMessage.nth == "last") {
                                    result[cvid].add(new kitten_cloud_list_pop_command_1.KittenCloudListPopCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, data));
                                }
                                else if (singleMessage.nth == "all") {
                                    result[cvid].add(new kitten_cloud_list_empty_command_1.KittenCloudListEmptyCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, data));
                                }
                                else {
                                    if (typeof singleMessage.nth != "number") {
                                        errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(singleMessage))));
                                    }
                                    result[cvid].add(new kitten_cloud_list_remove_command_1.KittenCloudListRemoveCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, data, singleMessage.nth - 1));
                                }
                                break;
                            case "replace":
                                if (!("nth" in singleMessage)) {
                                    errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(singleMessage))));
                                    break;
                                }
                                if (!("value" in singleMessage &&
                                    (typeof singleMessage.value == "number" ||
                                        typeof singleMessage.value == "string"))) {
                                    errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(singleMessage))));
                                    break;
                                }
                                if (singleMessage.nth == "last") {
                                    result[cvid].add(new kitten_cloud_list_replace_last_command_1.KittenCloudListReplaceLastCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, data, singleMessage.value));
                                }
                                else {
                                    if (typeof singleMessage.nth != "number") {
                                        errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(singleMessage))));
                                        break;
                                    }
                                    result[cvid].add(new kitten_cloud_list_replace_command_1.KittenCloudListReplaceCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, data, singleMessage.nth - 1, singleMessage.value));
                                }
                                break;
                            default:
                                errorArray.push(new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(JSON.stringify(singleMessage))));
                                break;
                        }
                    }
                }
            }
        }
        return result;
    };
    return KittenCloudListGroup;
}(kitten_cloud_data_group_1.KittenCloudDataGroup));
exports.KittenCloudListGroup = KittenCloudListGroup;
