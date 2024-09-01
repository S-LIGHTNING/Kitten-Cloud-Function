"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGroup = void 0;
var other_1 = require("../other");
var CommandGroup = /** @class */ (function () {
    function CommandGroup(commandArray) {
        if (commandArray === void 0) { commandArray = []; }
        this.commandArray = commandArray;
    }
    CommandGroup.prototype.execute = function () {
        for (var _i = 0, _a = this.commandArray; _i < _a.length; _i++) {
            var command = _a[_i];
            command.execute();
        }
    };
    Object.defineProperty(CommandGroup.prototype, "length", {
        get: function () {
            return this.commandArray.length;
        },
        enumerable: false,
        configurable: true
    });
    CommandGroup.prototype.add = function (command) {
        var lastCommand = this.commandArray.slice(-1)[0];
        if (lastCommand != other_1.None && "merge" in lastCommand && typeof lastCommand.merge == "function") {
            try {
                lastCommand.merge(command);
            }
            catch (error) {
                this.commandArray.push(command);
            }
        }
        else {
            this.commandArray.push(command);
        }
    };
    CommandGroup.prototype.addAll = function (commands) {
        if (commands instanceof CommandGroup) {
            commands = commands.commandArray;
        }
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var command = commands_1[_i];
            this.add(command);
        }
    };
    CommandGroup.prototype.isEmpty = function () {
        return this.commandArray.length == 0;
    };
    CommandGroup.prototype.first = function () {
        return this.commandArray[0];
    };
    CommandGroup.prototype.last = function () {
        return this.commandArray.slice(-1)[0];
    };
    CommandGroup.prototype.shift = function () {
        return this.commandArray.shift();
    };
    CommandGroup.prototype.pop = function () {
        return this.commandArray.pop();
    };
    return CommandGroup;
}());
exports.CommandGroup = CommandGroup;
