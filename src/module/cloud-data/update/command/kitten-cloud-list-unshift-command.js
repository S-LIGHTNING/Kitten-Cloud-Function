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
exports.KittenCloudListUnshiftCommand = void 0;
var other_1 = require("../../../../utils/other");
var kitten_cloud_data_update_source_1 = require("../kitten-cloud-data-update-source");
var kitten_cloud_list_update_command_1 = require("./kitten-cloud-list-update-command");
var KittenCloudListUnshiftCommand = /** @class */ (function (_super) {
    __extends(KittenCloudListUnshiftCommand, _super);
    function KittenCloudListUnshiftCommand(source, list, value) {
        var _this = _super.call(this, source, list) || this;
        _this.list = list;
        _this.value = value;
        _this.overflow = other_1.None;
        _this.overflowValue = 0;
        return _this;
    }
    KittenCloudListUnshiftCommand.prototype.execute = function () {
        if (this.overflow != other_1.None) {
            throw new Error("无法执行命令：命令已被执行，不能重复执行");
        }
        this.list.value.unshift(this.value);
        this.overflow = this.list.length > this.list.listLengthLimit.value;
        if (this.overflow) {
            this.overflowValue = this.list.value.pop();
        }
        this.list.unshifted.emit({
            source: this.source,
            item: this.value
        });
    };
    KittenCloudListUnshiftCommand.prototype.revoke = function () {
        if (this.overflow == other_1.None) {
            throw new Error("无法撤销命令：命令尚未执行");
        }
        this.list.value.shift();
        this.overflow = other_1.None;
        this.list.removed.emit({
            source: kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.REVOKE,
            index: 0,
            item: this.overflowValue
        });
        if (this.overflow) {
            this.list.value.push(this.overflowValue);
            this.list.pushed.emit({
                source: kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.REVOKE,
                item: this.overflowValue
            });
        }
    };
    KittenCloudListUnshiftCommand.prototype.isEffective = function () {
        return true;
    };
    KittenCloudListUnshiftCommand.prototype.isLegal = function () {
        return true;
    };
    KittenCloudListUnshiftCommand.prototype.toJSON = function () {
        return {
            method: "unshift",
            value: this.value
        };
    };
    KittenCloudListUnshiftCommand.prototype.toCloudJSON = function () {
        return {
            action: "unshift",
            cvid: this.list.cvid,
            value: this.value
        };
    };
    return KittenCloudListUnshiftCommand;
}(kitten_cloud_list_update_command_1.KittenCloudListUpdateCommand));
exports.KittenCloudListUnshiftCommand = KittenCloudListUnshiftCommand;
