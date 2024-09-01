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
exports.KittenCloudListEmptyCommand = void 0;
var other_1 = require("../../../../utils/other");
var kitten_cloud_data_update_source_1 = require("../kitten-cloud-data-update-source");
var kitten_cloud_list_update_command_1 = require("./kitten-cloud-list-update-command");
var KittenCloudListEmptyCommand = /** @class */ (function (_super) {
    __extends(KittenCloudListEmptyCommand, _super);
    function KittenCloudListEmptyCommand(source, list) {
        var _this = _super.call(this, source, list) || this;
        _this.list = list;
        _this.backup = other_1.None;
        return _this;
    }
    KittenCloudListEmptyCommand.prototype.execute = function () {
        if (this.backup != other_1.None) {
            throw new Error("无法执行命令：命令已被执行，不能重复执行");
        }
        this.backup = this.list.value;
        this.list.value = [];
        this.list.emptied.emit({
            source: this.source,
            list: this.backup.slice()
        });
    };
    KittenCloudListEmptyCommand.prototype.revoke = function () {
        if (this.backup == other_1.None) {
            throw new Error("无法撤销命令：命令尚未执行");
        }
        this.list.value = this.backup;
        this.list.replacedAll.emit({
            source: kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.REVOKE,
            originalList: [],
            newList: this.backup.slice()
        });
        this.backup = other_1.None;
    };
    KittenCloudListEmptyCommand.prototype.isEffective = function () {
        return true;
    };
    KittenCloudListEmptyCommand.prototype.isLegal = function () {
        return true;
    };
    KittenCloudListEmptyCommand.prototype.toJSON = function () {
        return {
            method: "empty"
        };
    };
    KittenCloudListEmptyCommand.prototype.toCloudJSON = function () {
        return {
            action: "delete",
            cvid: this.list.cvid,
            nth: "all"
        };
    };
    return KittenCloudListEmptyCommand;
}(kitten_cloud_list_update_command_1.KittenCloudListUpdateCommand));
exports.KittenCloudListEmptyCommand = KittenCloudListEmptyCommand;
