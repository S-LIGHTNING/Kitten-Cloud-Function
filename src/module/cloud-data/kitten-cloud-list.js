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
exports.KittenCloudList = void 0;
var other_1 = require("../../utils/other");
var signal_1 = require("../../utils/signal");
var kitten_cloud_data_1 = require("./kitten-cloud-data");
var kitten_cloud_list_add_command_1 = require("./update/command/kitten-cloud-list-add-command");
var kitten_cloud_list_empty_command_1 = require("./update/command/kitten-cloud-list-empty-command");
var kitten_cloud_list_pop_command_1 = require("./update/command/kitten-cloud-list-pop-command");
var kitten_cloud_list_push_command_1 = require("./update/command/kitten-cloud-list-push-command");
var kitten_cloud_list_remove_command_1 = require("./update/command/kitten-cloud-list-remove-command");
var kitten_cloud_list_replace_command_1 = require("./update/command/kitten-cloud-list-replace-command");
var kitten_cloud_list_replace_last_command_1 = require("./update/command/kitten-cloud-list-replace-last-command");
var kitten_cloud_list_unshift_command_1 = require("./update/command/kitten-cloud-list-unshift-command");
var kitten_cloud_data_update_source_1 = require("./update/kitten-cloud-data-update-source");
var diff_1 = require("diff");
/**
 * 云列表。
 */
var KittenCloudList = /** @class */ (function (_super) {
    __extends(KittenCloudList, _super);
    function KittenCloudList(connection, group, cvid, name, value) {
        var _this = _super.call(this, connection, group, cvid, name) || this;
        _this.group = group;
        _this.value = value;
        _this.pushed = new signal_1.Signal();
        _this.unshifted = new signal_1.Signal();
        _this.added = new signal_1.Signal();
        _this.popped = new signal_1.Signal();
        _this.removed = new signal_1.Signal();
        _this.emptied = new signal_1.Signal();
        _this.replacedLast = new signal_1.Signal();
        _this.replaced = new signal_1.Signal();
        _this.replacedAll = new signal_1.Signal();
        return _this;
    }
    KittenCloudList.prototype.update = function (value) {
        var diff = this.compareTo(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, value);
        for (var _i = 0, diff_2 = diff; _i < diff_2.length; _i++) {
            var command = diff_2[_i];
            this.updateManager.addUpdateCommand(command);
        }
    };
    KittenCloudList.prototype.compareTo = function (source, value) {
        var diff = (0, diff_1.diffArrays)(this.value, value);
        var position = 0;
        var result = [];
        for (var _i = 0, diff_3 = diff; _i < diff_3.length; _i++) {
            var change = diff_3[_i];
            if (!change.removed && !change.added) {
                position += change.value.length;
            }
            else if (change.removed) {
                for (var i = 0; i < change.value.length; i++) {
                    result.push(new kitten_cloud_list_remove_command_1.KittenCloudListRemoveCommand(source, this, position));
                }
            }
            else if (change.added) {
                var value_1 = other_1.None;
                var length_1 = change.value.length;
                while ((value_1 = change.value.pop()) != other_1.None) {
                    result.push(new kitten_cloud_list_add_command_1.KittenCloudListAddCommand(source, this, position, value_1));
                }
                position += length_1;
            }
            else {
                throw new Error("未预期的数组差异");
            }
        }
        return result;
    };
    /**
     * 添加新的项到尾部。
     *
     * @param value 添加的新的项的值
     */
    KittenCloudList.prototype.push = function (value) {
        value = this.singleValueProcess(value);
        this.updateManager.addUpdateCommand(new kitten_cloud_list_push_command_1.KittenCloudListPushCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, this, value));
    };
    /**
     * 添加新的项到头部。
     *
     * @param value 添加的新的项的值
     */
    KittenCloudList.prototype.unshift = function (value) {
        value = this.singleValueProcess(value);
        this.updateManager.addUpdateCommand(new kitten_cloud_list_unshift_command_1.KittenCloudListUnshiftCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, this, value));
    };
    /**
     * 添加新的项到指定位置。
     *
     * @param index 位置索引，从 0 开始
     * @param value 添加的新的项的值
     */
    KittenCloudList.prototype.add = function (index, value) {
        value = this.singleValueProcess(value);
        this.updateManager.addUpdateCommand(new kitten_cloud_list_add_command_1.KittenCloudListAddCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, this, index, value));
    };
    /**
     * 移除最后一项。
     */
    KittenCloudList.prototype.pop = function () {
        this.updateManager.addUpdateCommand(new kitten_cloud_list_pop_command_1.KittenCloudListPopCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, this));
    };
    /**
     * 移除指项。
     *
     * @param index 位置索引，从 0 开始
     */
    KittenCloudList.prototype.remove = function (index) {
        this.updateManager.addUpdateCommand(new kitten_cloud_list_remove_command_1.KittenCloudListRemoveCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, this, index));
    };
    /**
     * 清空列表。
     */
    KittenCloudList.prototype.empty = function () {
        this.updateManager.addUpdateCommand(new kitten_cloud_list_empty_command_1.KittenCloudListEmptyCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, this));
    };
    /**
     * 替换最后一项。
     *
     * @param value 新的值
     */
    KittenCloudList.prototype.replaceLast = function (value) {
        value = this.singleValueProcess(value);
        this.updateManager.addUpdateCommand(new kitten_cloud_list_replace_last_command_1.KittenCloudListReplaceLastCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, this, value));
    };
    /**
     * 替换指定项。
     *
     * @param index 位置索引，从 0 开始
     * @param value 新的值
     */
    KittenCloudList.prototype.replace = function (index, value) {
        value = this.singleValueProcess(value);
        this.updateManager.addUpdateCommand(new kitten_cloud_list_replace_command_1.KittenCloudListReplaceCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, this, index, value));
    };
    /**
     * 从源列表复制所有项。
     *
     * 该操作会对比源列表和当前列表，并将差异应用到当前列表。
     *
     * @param source 源列表
     */
    KittenCloudList.prototype.copyFrom = function (source) {
        var _this = this;
        if (source instanceof KittenCloudList) {
            source = source.value;
        }
        source = source.map(function (item) {
            return _this.singleValueProcess(item);
        });
        var diff = this.compareTo(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, source);
        for (var _i = 0, diff_4 = diff; _i < diff_4.length; _i++) {
            var command = diff_4[_i];
            this.updateManager.addUpdateCommand(command);
        }
    };
    /**
     * 获取一份当前列表的副本数组。
     *
     * @returns 当前列表的副本数组
     */
    KittenCloudList.prototype.copy = function () {
        return this.value.slice();
    };
    /**
     * 获取指定位置的项。
     *
     * @param index 位置索引，从 0 开始
     * @returns 指定位置的项，如果索引越界则返回 `None`
     */
    KittenCloudList.prototype.get = function (index) {
        return this.value[index];
    };
    Object.defineProperty(KittenCloudList.prototype, "length", {
        /**
         * 获取列表的长度。
         *
         * @returns 列表的长度
         */
        get: function () {
            return this.value.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取指定项在列表中第一次出现的位置。
     *
     * @param item 要查找的项
     * @returns 指定项在列表中第一次出现的位置，如果不存在则返回 `-1`
     */
    KittenCloudList.prototype.indexOf = function (item) {
        return this.value.indexOf(item);
    };
    /**
     * 获取指定项在列表中最后一次出现的位置。
     *
     * @param item 要查找的项
     * @returns 指定项在列表中最后一次出现的位置，如果不存在则返回 `-1`
     */
    KittenCloudList.prototype.lastIndexOf = function (item) {
        return this.value.lastIndexOf(item);
    };
    /**
     * 判断指定项是否在列表中。
     *
     * @param item 要查找的项
     * @returns 指定项是否在列表中
     */
    KittenCloudList.prototype.includes = function (item) {
        return this.value.includes(item);
    };
    /**
     * 用指定字符串连接列表中的所有项。
     *
     * @param separator 项之间的分隔符
     * @returns 连接后的字符串
     */
    KittenCloudList.prototype.join = function (separator) {
        return this.value.join(separator);
    };
    return KittenCloudList;
}(kitten_cloud_data_1.KittenCloudData));
exports.KittenCloudList = KittenCloudList;
