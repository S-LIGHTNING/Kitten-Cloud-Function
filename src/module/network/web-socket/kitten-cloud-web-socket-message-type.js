"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KittenCloudWebSocketMessageType = void 0;
var KittenCloudWebSocketMessageType;
(function (KittenCloudWebSocketMessageType) {
    KittenCloudWebSocketMessageType[KittenCloudWebSocketMessageType["UPGRADE"] = 0] = "UPGRADE";
    KittenCloudWebSocketMessageType[KittenCloudWebSocketMessageType["ERROR"] = 1] = "ERROR";
    KittenCloudWebSocketMessageType[KittenCloudWebSocketMessageType["PING"] = 2] = "PING";
    KittenCloudWebSocketMessageType[KittenCloudWebSocketMessageType["PONG"] = 3] = "PONG";
    KittenCloudWebSocketMessageType[KittenCloudWebSocketMessageType["CONNECT"] = 40] = "CONNECT";
    KittenCloudWebSocketMessageType[KittenCloudWebSocketMessageType["CLOSE"] = 41] = "CLOSE";
    KittenCloudWebSocketMessageType[KittenCloudWebSocketMessageType["MESSAGE"] = 42] = "MESSAGE";
})(KittenCloudWebSocketMessageType || (exports.KittenCloudWebSocketMessageType = KittenCloudWebSocketMessageType = {}));
