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
exports.KittenCloudVariableSetCommand = void 0;
var other_1 = require("../../../../utils/other");
var kitten_cloud_data_update_source_1 = require("../kitten-cloud-data-update-source");
var kitten_cloud_variable_update_command_1 = require("./kitten-cloud-variable-update-command");
var KittenCloudVariableSetCommand = /** @class */ (function (_super) {
    __extends(KittenCloudVariableSetCommand, _super);
    function KittenCloudVariableSetCommand(source, variable, value) {
        var _this = _super.call(this, source, variable) || this;
        _this.value = value;
        _this.backup = other_1.None;
        return _this;
    }
    KittenCloudVariableSetCommand.prototype.execute = function () {
        if (this.backup != other_1.None) {
            throw new Error("\u65E0\u6CD5\u6267\u884C\u547D\u4EE4\uFF1A\u547D\u4EE4\u5DF2\u88AB\u6267\u884C\uFF0C\u4E0D\u80FD\u91CD\u590D\u6267\u884C");
        }
        this.backup = this.variable.value;
        this.variable.value = this.value;
        this.variable.changed.emit({
            source: this.source,
            originalValue: this.backup,
            newValue: this.value
        });
    };
    KittenCloudVariableSetCommand.prototype.revoke = function () {
        if (this.backup == other_1.None) {
            throw new Error("\u65E0\u6CD5\u64A4\u9500\u547D\u4EE4\uFF1A\u547D\u4EE4\u5C1A\u672A\u6267\u884C");
        }
        this.variable.value = this.backup;
        this.variable.changed.emit({
            source: kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.REVOKE,
            originalValue: this.value,
            newValue: this.backup
        });
        this.backup = other_1.None;
    };
    KittenCloudVariableSetCommand.prototype.isEffective = function () {
        return this.backup == other_1.None ? this.value !== this.variable.value : this.value !== this.backup;
    };
    KittenCloudVariableSetCommand.prototype.toJSON = function () {
        return {
            method: "set",
            value: this.value
        };
    };
    KittenCloudVariableSetCommand.prototype.isLegal = function () {
        return true;
    };
    KittenCloudVariableSetCommand.prototype.merge = function (that) {
        if ((this.backup == other_1.None) != (that.backup == other_1.None)) {
            throw new Error("命令执行状态不一致，不能合并");
        }
        this.value = that.value;
    };
    return KittenCloudVariableSetCommand;
}(kitten_cloud_variable_update_command_1.KittenCloudVariableUpdateCommand));
exports.KittenCloudVariableSetCommand = KittenCloudVariableSetCommand;
