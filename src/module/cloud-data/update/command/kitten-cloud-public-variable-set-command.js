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
exports.KittenCloudPublicVariableSetCommand = void 0;
var kitten_cloud_variable_set_command_1 = require("./kitten-cloud-variable-set-command");
var KittenCloudPublicVariableSetCommand = /** @class */ (function (_super) {
    __extends(KittenCloudPublicVariableSetCommand, _super);
    function KittenCloudPublicVariableSetCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KittenCloudPublicVariableSetCommand.prototype.toCloudJSON = function () {
        return {
            action: "set",
            cvid: this.variable.cvid,
            value: this.value,
            param_type: typeof this.value
        };
    };
    return KittenCloudPublicVariableSetCommand;
}(kitten_cloud_variable_set_command_1.KittenCloudVariableSetCommand));
exports.KittenCloudPublicVariableSetCommand = KittenCloudPublicVariableSetCommand;
