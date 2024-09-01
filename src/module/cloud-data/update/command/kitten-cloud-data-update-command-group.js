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
exports.KittenCloudDataUpdateCommandGroup = void 0;
var revocable_command_group_1 = require("../../../../utils/command/revocable-command-group");
var other_1 = require("../../../../utils/other");
var KittenCloudDataUpdateCommandGroup = /** @class */ (function (_super) {
    __extends(KittenCloudDataUpdateCommandGroup, _super);
    function KittenCloudDataUpdateCommandGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KittenCloudDataUpdateCommandGroup.prototype.removeFrontIneffective = function () {
        var firstCommand;
        while ((firstCommand = this.first()) != other_1.None) {
            if (firstCommand.isEffective()) {
                break;
            }
            else {
                this.shift();
            }
        }
    };
    KittenCloudDataUpdateCommandGroup.prototype.removeBackIneffective = function () {
        var lastCommand;
        while ((lastCommand = this.last()) != other_1.None) {
            if (lastCommand.isEffective()) {
                break;
            }
            else {
                this.pop();
            }
        }
    };
    KittenCloudDataUpdateCommandGroup.prototype.toCloudJSON = function () {
        var result = [];
        for (var _i = 0, _a = this.commandArray; _i < _a.length; _i++) {
            var command = _a[_i];
            if (command.isLegal()) {
                result.push(command.toCloudJSON());
            }
        }
        return result;
    };
    KittenCloudDataUpdateCommandGroup.prototype.toCloudString = function () {
        return JSON.stringify(this.toCloudJSON());
    };
    return KittenCloudDataUpdateCommandGroup;
}(revocable_command_group_1.RevocableCommandGroup));
exports.KittenCloudDataUpdateCommandGroup = KittenCloudDataUpdateCommandGroup;
