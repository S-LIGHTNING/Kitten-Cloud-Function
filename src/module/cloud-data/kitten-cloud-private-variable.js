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
exports.KittenCloudPrivateVariable = void 0;
var kitten_cloud_variable_1 = require("./kitten-cloud-variable");
var kitten_cloud_data_update_source_1 = require("./update/kitten-cloud-data-update-source");
var kitten_cloud_private_variable_set_command_1 = require("./update/command/kitten-cloud-private-variable-set-command");
var codemao_user_1 = require("../../codemao/user/codemao-user");
var other_1 = require("../../utils/other");
/**
 * 私有云变量。
 */
var KittenCloudPrivateVariable = /** @class */ (function (_super) {
    __extends(KittenCloudPrivateVariable, _super);
    function KittenCloudPrivateVariable(connection, group, cvid, name, value) {
        var _this = _super.call(this, connection, group, cvid, name, value) || this;
        _this.group = group;
        _this.getRankingListResolveArray = [];
        _this.getRankingListRejectArray = [];
        return _this;
    }
    KittenCloudPrivateVariable.prototype.update = function (value) {
        this.updateManager.addUpdateCommand(new kitten_cloud_private_variable_set_command_1.KittenCloudPrivateVariableSetCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, this, value));
    };
    /**
     * 设置私有云变量的值。
     *
     * @param value 要设置的值
     */
    KittenCloudPrivateVariable.prototype.set = function (value) {
        value = this.singleValueProcess(value);
        this.updateManager.addUpdateCommand(new kitten_cloud_private_variable_set_command_1.KittenCloudPrivateVariableSetCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, this, value));
    };
    /**
     * 获取排名列表。
     *
     * @param limit 限制数量，列表的长度不超过限制数量
     * @param order 排名顺序，1 为顺序，-1 为逆序
     * @returns 排名列表
     */
    KittenCloudPrivateVariable.prototype.getRankingList = function (limit, order) {
        var _this = this;
        if (limit <= 0) {
            throw new Error("限制必须大于 0");
        }
        if (order != 1 && order != -1) {
            throw new Error("顺序只能为 1（顺序） 或 -1（逆序）");
        }
        this.group.sendGetRankingList(this, {
            cvid: this.cvid,
            limit: limit,
            order_type: order
        });
        return new Promise(function (resolve, reject) {
            _this.getRankingListResolveArray.push(resolve);
            _this.getRankingListRejectArray.push(reject);
        });
    };
    KittenCloudPrivateVariable.prototype.handleReceiveRankingList = function (data) {
        var resolve = this.getRankingListResolveArray.shift(), reject = this.getRankingListRejectArray.shift();
        if (data == other_1.None) {
            reject(new Error("收到了空排名数据"));
            return;
        }
        if (typeof data != "object") {
            reject(new Error("无法识别的排名数据：" + data));
            return;
        }
        if (!("items" in data && Array.isArray(data.items))) {
            reject(new Error("无法识别的排名数据：" + JSON.stringify(data)));
            return;
        }
        var list = data.items;
        var result = [];
        var errorArray = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item == other_1.None) {
                errorArray.push(new Error("排名数据为空"));
            }
            else if (typeof item != "object") {
                errorArray.push(new Error("无法识别的排名数据：" + item));
            }
            else if (!("value" in item && typeof item.value == "number" &&
                "nickname" in item && typeof item.nickname == "string" &&
                "avatar_url" in item && typeof item.avatar_url == "string" &&
                "identifier" in item && typeof item.identifier == "string")) {
                errorArray.push(new Error("无法识别的排名数据：" + JSON.stringify(item)));
            }
            else {
                result.push({
                    value: item.value,
                    user: new codemao_user_1.CodemaoUser({
                        id: parseInt(item.identifier),
                        nickname: item.nickname,
                        avatarURL: item.avatar_url,
                    })
                });
            }
        }
        resolve(result);
        if (errorArray.length > 0) {
            reject(errorArray);
        }
    };
    return KittenCloudPrivateVariable;
}(kitten_cloud_variable_1.KittenCloudVariable));
exports.KittenCloudPrivateVariable = KittenCloudPrivateVariable;
