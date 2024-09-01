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
exports.KittenCloudPrivateVariableGroup = void 0;
var other_1 = require("../../../utils/other");
var kitten_cloud_send_message_type_1 = require("../../network/kitten-cloud-send-message-type");
var kitten_cloud_private_variable_1 = require("../kitten-cloud-private-variable");
var kitten_cloud_variable_group_1 = require("./kitten-cloud-variable-group");
var KittenCloudPrivateVariableGroup = /** @class */ (function (_super) {
    __extends(KittenCloudPrivateVariableGroup, _super);
    function KittenCloudPrivateVariableGroup(connection) {
        var _this = _super.call(this, connection, {
            cacheTime: 100,
            updateIntervalTime: 1500
        }) || this;
        _this.dataTypeName = "私有云变量";
        _this.dataUpdateSendMessageType = kitten_cloud_send_message_type_1.KittenCloudSendMessageType.UPDATE_PRIVATE_VARIABLE;
        _this.getRankingListArray = [];
        return _this;
    }
    KittenCloudPrivateVariableGroup.prototype.sendGetRankingList = function (variable, message) {
        this.getRankingListArray.push(variable);
        this.connection.send(kitten_cloud_send_message_type_1.KittenCloudSendMessageType.GET_PRIVATE_VARIABLE_RANKING_LIST, message);
    };
    KittenCloudPrivateVariableGroup.prototype.handleReceiveRankingList = function (data) {
        var first = this.getRankingListArray.shift();
        if (first == other_1.None) {
            throw new Error("没有请求排行榜，却收到了排行榜响应");
        }
        first.handleReceiveRankingList(data);
    };
    KittenCloudPrivateVariableGroup.prototype.createData = function (cvid, name, value) {
        return new kitten_cloud_private_variable_1.KittenCloudPrivateVariable(this.connection, this, cvid, name, value);
    };
    KittenCloudPrivateVariableGroup.prototype.handleCloudUpdate = function (__cloudMessage) {
        var _a;
        try {
            var firstUploadCount = this.uploadCount.shift();
            if (firstUploadCount == other_1.None) {
                throw new Error("不存在上传数据");
            }
            for (var i = 0; i < this.dataArray.length; i++) {
                for (;;) {
                    var count = firstUploadCount[i];
                    if (count == other_1.None || count <= 0) {
                        break;
                    }
                    (_a = this.dataArray[i]) === null || _a === void 0 ? void 0 : _a.updateManager.handleUploadingSuccess();
                    firstUploadCount[i] = count - 1;
                }
            }
        }
        catch (error) {
            this.handleCloudUpdateError();
        }
    };
    KittenCloudPrivateVariableGroup.prototype.toUploadMessage = function (message) {
        if (!(typeof message == "object" && message != null &&
            "code" in message && "msg" in message)) {
            throw new Error("\u65E0\u6CD5\u8BC6\u522B\u66F4\u65B0\u6570\u636E\u683C\u5F0F\uFF1A".concat(message));
        }
        if (message.code == 1 && message.msg == "ok") {
            return {};
        }
        throw new Error("\u79C1\u6709\u4E91\u53D8\u91CF\u66F4\u65B0\u5931\u8D25\uFF1A".concat(JSON.stringify(message)));
    };
    return KittenCloudPrivateVariableGroup;
}(kitten_cloud_variable_group_1.KittenCloudVariableGroup));
exports.KittenCloudPrivateVariableGroup = KittenCloudPrivateVariableGroup;
