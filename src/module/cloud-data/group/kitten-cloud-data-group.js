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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KittenCloudDataGroup = void 0;
var other_1 = require("../../../utils/other");
var signal_1 = require("../../../utils/signal");
var kitten_cloud_function_config_layer_1 = require("../../kitten-cloud-function-config-layer");
/**
 * 云数据组，用于管理云数据实例。
 */
var KittenCloudDataGroup = /** @class */ (function (_super) {
    __extends(KittenCloudDataGroup, _super);
    function KittenCloudDataGroup(connection, config) {
        var _this = _super.call(this, connection, config) || this;
        _this.connection = connection;
        _this.connecting = true;
        _this.connected = new signal_1.Signal();
        _this.dataArray = [];
        _this.dataMap = new Map();
        _this.array = _this.dataArray;
        _this.uploadCount = [];
        return _this;
    }
    KittenCloudDataGroup.prototype.update = function (data) {
        var _this = this;
        this.connecting = false;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var data_2 = this.dataMap.get(item.cvid);
            if (data_2 == null) {
                var newData = this.createData(item.cvid, item.name, item.value);
                this.dataArray.push(newData);
                this.dataMap.set(item.name, newData);
                this.dataMap.set(item.cvid, newData);
                newData.updateManager.neededToUpload.connect(function () {
                    _this.handleUpload();
                });
            }
            else {
                data_2.update(item.value);
            }
        }
        this.connected.emit();
    };
    /**
     * 获取该云数据组指定的云数据实例。
     *
     * @param index 索引，可以是云数据的名称或 cvid
     * @returns 对应的云数据实例
     * @throws 如果不存在该云数据实例，则抛出异常
     */
    KittenCloudDataGroup.prototype.get = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connecting) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connected.wait()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        data = this.dataMap.get(index);
                        if (data == null) {
                            throw new Error("\u83B7\u53D6".concat(this.dataTypeName, "\u5931\u8D25\uFF1A").concat(this.dataTypeName, " ").concat(index, " \u4E0D\u5B58\u5728"));
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取该云数据组中的所有云数据。
     *
     * @returns 由所有云数据组成的数组
     */
    KittenCloudDataGroup.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connecting) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connected.wait()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.dataArray];
                }
            });
        });
    };
    KittenCloudDataGroup.prototype.handleUpload = function () {
        var uploadCount = [];
        var uploadMessage = {};
        for (var _i = 0, _a = this.dataArray; _i < _a.length; _i++) {
            var data = _a[_i];
            var singleUploadMessage = data.updateManager.upload();
            uploadMessage[data.cvid] = singleUploadMessage;
            uploadCount.push(singleUploadMessage.length);
        }
        this.uploadCount.push(uploadCount);
        this.connection.send(this.dataUpdateSendMessageType, this.toCloudUploadMessage(uploadMessage));
    };
    KittenCloudDataGroup.prototype.handleCloudUpdate = function (cloudMessage) {
        var errorArray = [];
        this.uploadCount.shift();
        var message;
        try {
            message = this.toUploadMessage(cloudMessage);
        }
        catch (error) {
            if (!Array.isArray(error)) {
                this.handleCloudUpdateError();
                var message_1;
                if (error instanceof Error) {
                    message_1 = error.message;
                }
                else if (typeof error == "string") {
                    message_1 = error;
                }
                else {
                    message_1 = JSON.stringify(error);
                }
                throw new Error("\u66F4\u65B0".concat(this.dataTypeName, "\u5931\u8D25\uFF1A").concat(message_1));
            }
            for (var _i = 0, error_1 = error; _i < error_1.length; _i++) {
                var singleError = error_1[_i];
                errorArray.push(singleError);
            }
            if (typeof error != "object" || !("message" in error)) {
                errorArray.push(new Error("\u66F4\u65B0".concat(this.dataTypeName, "\u5931\u8D25\uFF1A\u627E\u4E0D\u5230\u66F4\u65B0\u6570\u636E")));
            }
            message = error.message;
        }
        for (var _a = 0, _b = this.dataArray; _a < _b.length; _a++) {
            var data = _b[_a];
            var singleMessage = message[data.cvid];
            if (singleMessage == other_1.None) {
                continue;
            }
            var updateCommand = void 0;
            while ((updateCommand = singleMessage.shift()) != other_1.None) {
                data.updateManager.addUpdateCommand(updateCommand);
            }
        }
    };
    KittenCloudDataGroup.prototype.handleCloudUpdateError = function () {
        var _a;
        var firstUploadCount = this.uploadCount.shift();
        if (firstUploadCount == other_1.None) {
            throw new Error("不存在上传数据");
        }
        for (var i = 0; i < this.dataArray.length; i++) {
            for (;;) {
                var count = firstUploadCount[i];
                if (count == other_1.None || count <= 0) {
                    break;
                }
                (_a = this.dataArray[i]) === null || _a === void 0 ? void 0 : _a.updateManager.handleUploadingError();
                firstUploadCount[i] = count - 1;
            }
        }
    };
    return KittenCloudDataGroup;
}(kitten_cloud_function_config_layer_1.KittenCloudFunctionConfigLayer));
exports.KittenCloudDataGroup = KittenCloudDataGroup;
