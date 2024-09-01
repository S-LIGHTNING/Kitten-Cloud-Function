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
exports.KittenCloudPrivateVariableSetCommand = void 0;
var kitten_cloud_variable_set_command_1 = require("./kitten-cloud-variable-set-command");
var KittenCloudPrivateVariableSetCommand = /** @class */ (function (_super) {
    __extends(KittenCloudPrivateVariableSetCommand, _super);
    function KittenCloudPrivateVariableSetCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KittenCloudPrivateVariableSetCommand.prototype.toCloudJSON = function () {
        return {
            cvid: this.variable.cvid,
            value: this.value,
            param_type: typeof this.value
        };
    };
    return KittenCloudPrivateVariableSetCommand;
}(kitten_cloud_variable_set_command_1.KittenCloudVariableSetCommand));
exports.KittenCloudPrivateVariableSetCommand = KittenCloudPrivateVariableSetCommand;
