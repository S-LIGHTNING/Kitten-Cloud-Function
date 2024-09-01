"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KittenCloudDataUpdateCommand = void 0;
var KittenCloudDataUpdateCommand = /** @class */ (function () {
    function KittenCloudDataUpdateCommand(source, data) {
        this.source = source;
        this.data = data;
    }
    KittenCloudDataUpdateCommand.prototype.toCloudString = function () {
        return JSON.stringify(this.toCloudJSON());
    };
    return KittenCloudDataUpdateCommand;
}());
exports.KittenCloudDataUpdateCommand = KittenCloudDataUpdateCommand;
