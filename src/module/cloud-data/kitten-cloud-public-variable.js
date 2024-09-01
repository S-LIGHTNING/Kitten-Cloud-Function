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
exports.KittenCloudPublicVariable = void 0;
var kitten_cloud_variable_1 = require("./kitten-cloud-variable");
var kitten_cloud_data_update_source_1 = require("./update/kitten-cloud-data-update-source");
var kitten_cloud_public_variable_set_command_1 = require("./update/command/kitten-cloud-public-variable-set-command");
/**
 * 公有云变量。
 */
var KittenCloudPublicVariable = /** @class */ (function (_super) {
    __extends(KittenCloudPublicVariable, _super);
    function KittenCloudPublicVariable(connection, group, cvid, name, value) {
        var _this = _super.call(this, connection, group, cvid, name, value) || this;
        _this.group = group;
        return _this;
    }
    KittenCloudPublicVariable.prototype.update = function (value) {
        value = this.singleValueProcess(value);
        this.updateManager.addUpdateCommand(new kitten_cloud_public_variable_set_command_1.KittenCloudPublicVariableSetCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD, this, value));
    };
    /**
     * 设置公有云变量的值。
     *
     * @param value 要设置的值
     */
    KittenCloudPublicVariable.prototype.set = function (value) {
        this.updateManager.addUpdateCommand(new kitten_cloud_public_variable_set_command_1.KittenCloudPublicVariableSetCommand(kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL, this, value));
    };
    return KittenCloudPublicVariable;
}(kitten_cloud_variable_1.KittenCloudVariable));
exports.KittenCloudPublicVariable = KittenCloudPublicVariable;
