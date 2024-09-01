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
exports.KittenCloudListPopCommand = void 0;
var other_1 = require("../../../../utils/other");
var kitten_cloud_data_update_source_1 = require("../kitten-cloud-data-update-source");
var kitten_cloud_list_update_command_1 = require("./kitten-cloud-list-update-command");
var KittenCloudListPopCommand = /** @class */ (function (_super) {
    __extends(KittenCloudListPopCommand, _super);
    function KittenCloudListPopCommand(source, list) {
        var _this = _super.call(this, source, list) || this;
        _this.list = list;
        _this.effective = other_1.None;
        _this.backup = 0;
        return _this;
    }
    KittenCloudListPopCommand.prototype.execute = function () {
        if (this.effective != other_1.None) {
            throw new Error("无法执行命令：命令已被执行，不能重复执行");
        }
        this.effective = this.list.length > 0;
        if (this.effective) {
            this.backup = this.list.value.pop();
            this.list.popped.emit({
                source: this.source,
                item: this.backup
            });
        }
    };
    KittenCloudListPopCommand.prototype.revoke = function () {
        if (this.effective == other_1.None) {
            throw new Error("无法撤销命令：命令尚未执行");
        }
        if (this.effective) {
            this.list.value.push(this.backup);
            this.list.pushed.emit({
                source: kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.REVOKE,
                item: this.backup
            });
        }
        this.effective = other_1.None;
    };
    KittenCloudListPopCommand.prototype.isEffective = function () {
        return this.effective == other_1.None ? this.list.length > 0 : this.effective;
    };
    KittenCloudListPopCommand.prototype.isLegal = function () {
        return true;
    };
    KittenCloudListPopCommand.prototype.toJSON = function () {
        return {
            method: "pop"
        };
    };
    KittenCloudListPopCommand.prototype.toCloudJSON = function () {
        return {
            action: "delete",
            nth: "last"
        };
    };
    return KittenCloudListPopCommand;
}(kitten_cloud_list_update_command_1.KittenCloudListUpdateCommand));
exports.KittenCloudListPopCommand = KittenCloudListPopCommand;
