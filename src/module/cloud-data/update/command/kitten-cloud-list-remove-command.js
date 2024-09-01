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
exports.KittenCloudListRemoveCommand = void 0;
var other_1 = require("../../../../utils/other");
var kitten_cloud_data_update_source_1 = require("../kitten-cloud-data-update-source");
var kitten_cloud_list_update_command_1 = require("./kitten-cloud-list-update-command");
var KittenCloudListRemoveCommand = /** @class */ (function (_super) {
    __extends(KittenCloudListRemoveCommand, _super);
    function KittenCloudListRemoveCommand(source, list, index) {
        var _this = _super.call(this, source, list) || this;
        _this.list = list;
        _this.index = index;
        _this.effective = other_1.None;
        _this.backup = 0;
        return _this;
    }
    KittenCloudListRemoveCommand.prototype.execute = function () {
        if (this.effective != other_1.None) {
            throw new Error("无法执行命令：命令已被执行，不能重复执行");
        }
        this.effective = 0 <= this.index && this.index < this.list.length;
        if (this.effective) {
            this.backup = this.list.value.splice(this.index, 1)[0];
            this.effective = true;
            this.list.removed.emit({
                source: this.source,
                index: this.index,
                item: this.backup
            });
        }
    };
    KittenCloudListRemoveCommand.prototype.revoke = function () {
        if (this.effective == other_1.None) {
            throw new Error("无法撤销命令：命令尚未执行");
        }
        if (this.effective) {
            this.list.value.splice(this.index, 0, this.backup);
            this.list.added.emit({
                source: kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.REVOKE,
                index: this.index,
                item: this.backup
            });
        }
        this.effective = other_1.None;
    };
    KittenCloudListRemoveCommand.prototype.isEffective = function () {
        return this.effective == other_1.None ? 0 <= this.index && this.index < this.list.length : this.effective;
    };
    KittenCloudListRemoveCommand.prototype.isLegal = function () {
        return 0 <= this.index && this.index < this.data.listLengthLimit.value;
    };
    KittenCloudListRemoveCommand.prototype.toJSON = function () {
        return {
            method: "remove",
            index: this.index
        };
    };
    KittenCloudListRemoveCommand.prototype.toCloudJSON = function () {
        return {
            action: "delete",
            cvid: this.list.cvid,
            nth: this.index + 1
        };
    };
    return KittenCloudListRemoveCommand;
}(kitten_cloud_list_update_command_1.KittenCloudListUpdateCommand));
exports.KittenCloudListRemoveCommand = KittenCloudListRemoveCommand;
