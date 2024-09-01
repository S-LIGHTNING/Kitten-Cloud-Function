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
exports.RevocableCommandGroup = void 0;
var command_group_1 = require("./command-group");
var RevocableCommandGroup = /** @class */ (function (_super) {
    __extends(RevocableCommandGroup, _super);
    function RevocableCommandGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RevocableCommandGroup.prototype.revoke = function () {
        var _a;
        for (var i = this.commandArray.length - 1; i >= 0; i--) {
            (_a = this.commandArray[i]) === null || _a === void 0 ? void 0 : _a.revoke();
        }
    };
    return RevocableCommandGroup;
}(command_group_1.CommandGroup));
exports.RevocableCommandGroup = RevocableCommandGroup;
