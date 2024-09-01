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
exports.KittenCloudFunction = void 0;
var codemao_work_1 = require("./codemao/work/codemao-work");
var kitten_cloud_online_user_number_1 = require("./module/kitten-cloud-online-user-number");
var kitten_cloud_web_socket_1 = require("./module/network/web-socket/kitten-cloud-web-socket");
var signal_1 = require("./utils/signal");
var kitten_cloud_function_config_layer_1 = require("./module/kitten-cloud-function-config-layer");
var kitten_cloud_public_variable_group_1 = require("./module/cloud-data/group/kitten-cloud-public-variable-group");
var kitten_cloud_data_type_1 = require("./module/cloud-data/kitten-cloud-data-type");
var kitten_cloud_send_message_type_1 = require("./module/network/kitten-cloud-send-message-type");
var kitten_cloud_receive_message_type_1 = require("./module/network/kitten-cloud-receive-message-type");
var kitten_cloud_private_variable_group_1 = require("./module/cloud-data/group/kitten-cloud-private-variable-group");
var single_config_1 = require("./utils/single-config");
var codemao_user_1 = require("./codemao/user/codemao-user");
var other_1 = require("./utils/other");
var kitten_cloud_list_group_1 = require("./module/cloud-data/group/kitten-cloud-list-group");
/**
 * 源码云功能主类，用于管理源码云的连接、数据、事件等。
 */
var KittenCloudFunction = /** @class */ (function (_super) {
    __extends(KittenCloudFunction, _super);
    function KittenCloudFunction(argument) {
        var _this = _super.call(this) || this;
        _this.autoReconnectIntervalTime = new single_config_1.SingleConfig(8000, 8000);
        var work = argument instanceof codemao_work_1.CodemaoWork ? argument : null;
        if (!(argument instanceof kitten_cloud_web_socket_1.KittenCloudWebSocket)) {
            argument = new kitten_cloud_web_socket_1.KittenCloudWebSocket(argument);
        }
        _this.socket = argument;
        _this.work = _this.socket.work;
        _this.autoReconnectIntervalTime.changed.connect(function (_a) {
            var newValue = _a.newValue;
            if (typeof newValue == "boolean") {
                _this.socket.autoReconnect = newValue;
                return;
            }
            _this.socket.autoReconnect = true;
            _this.socket.autoReconnectIntervalTime = newValue;
        });
        _this.socket.opened.connect(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(work != null)) return [3 /*break*/, 2];
                        _a = this.send;
                        _b = [kitten_cloud_send_message_type_1.KittenCloudSendMessageType.JOIN];
                        return [4 /*yield*/, work.info.id];
                    case 1:
                        _a.apply(this, _b.concat([(_c.sent()).toString()]));
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        _this.socket.received.connect(function (message) {
            _this.handleReceived(message);
        });
        _this.opened = new signal_1.Signal();
        _this.disconnected = new signal_1.Signal();
        _this.closed = new signal_1.Signal();
        _this.errored = new signal_1.Signal();
        _this.socket.disconnected.connect(function () {
            _this.disconnected.emit();
        });
        _this.socket.closed.connect(function () {
            _this.closed.emit();
        });
        _this.socket.errored.connect(function (error) {
            _this.errored.emit(error);
        });
        _this.onlineUserNumber = new Promise(function (resolve, reject) {
            _this.onlineUserNumberResolve = resolve;
            _this.onlineUserNumberReject = reject;
        });
        _this.socket.errored.connect(function (error) {
            var _a;
            (_a = _this.onlineUserNumberReject) === null || _a === void 0 ? void 0 : _a.call(_this, error);
        });
        _this.privateVariable = new kitten_cloud_private_variable_group_1.KittenCloudPrivateVariableGroup(_this);
        _this.publicVariable = new kitten_cloud_public_variable_group_1.KittenCloudPublicVariableGroup(_this);
        _this.list = new kitten_cloud_list_group_1.KittenCloudListGroup(_this);
        return _this;
    }
    Object.defineProperty(KittenCloudFunction, "caught", {
        /**
         * 当从全局 WebSocket 中捕获到源码云的连接，会将其转换为 KittenCloudFunction 实例并通过该信号通知。
         *
         * 该功能会污染全局 WebSocket，仅在该信号被访问时才会启用。
         */
        get: function () {
            if (KittenCloudFunction._caught == null) {
                KittenCloudFunction._caught = new signal_1.Signal();
                KittenCloudFunction.startCatch();
            }
            return KittenCloudFunction._caught;
        },
        enumerable: false,
        configurable: true
    });
    KittenCloudFunction.startCatch = function () {
        var originalWebSocket = new Function("return " + ["Web", "Socket"].join(""))();
        new Function("webSocket", "\n            webSocket.prototype = ".concat("Web").concat("Socket", ".prototype;\n            ").concat("Web").concat("Socket", " = webSocket;\n        "))(function (url) {
            var _a;
            var socket = new originalWebSocket(url);
            if (typeof url == "string") {
                url = new URL(url);
            }
            if (!KittenCloudFunction.caught.isEmpty() &&
                url.hostname == ["socketcv", "codemao", "cn"].join(".") &&
                url.pathname == "/cloudstorage/") {
                var workID = parseInt((_a = url.searchParams.get("session_id")) !== null && _a !== void 0 ? _a : "0");
                var instance = KittenCloudFunction._caughtInstance.get(workID);
                if (instance == null) {
                    instance = new KittenCloudFunction(socket);
                    KittenCloudFunction._caughtInstance.set(workID, instance);
                }
                else {
                    instance.socket.changeWebSocket(socket);
                }
                KittenCloudFunction.caught.emit(instance);
            }
            return socket;
        });
    };
    KittenCloudFunction.prototype.close = function () {
        this.socket.close();
    };
    KittenCloudFunction.prototype.send = function (type, message) {
        this.socket.send([type, message]);
    };
    KittenCloudFunction.prototype.handleReceived = function (message) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var type, data, _a, dataArray, privateVariableArray, publicVariableArray, listArray, _i, dataArray_1, item, cvid, name_1, value, type_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        type = message[0], data = message[1];
                        _a = type;
                        switch (_a) {
                            case kitten_cloud_receive_message_type_1.KittenCloudReceiveMessageType.JOIN: return [3 /*break*/, 1];
                            case kitten_cloud_receive_message_type_1.KittenCloudReceiveMessageType.RECEIVE_ALL_DATA: return [3 /*break*/, 2];
                            case kitten_cloud_receive_message_type_1.KittenCloudReceiveMessageType.UPDATE_PRIVATE_VARIABLE: return [3 /*break*/, 3];
                            case kitten_cloud_receive_message_type_1.KittenCloudReceiveMessageType.RECEIVE_PRIVATE_VARIABLE_RANKING_LIST: return [3 /*break*/, 4];
                            case kitten_cloud_receive_message_type_1.KittenCloudReceiveMessageType.UPDATE_PUBLIC_VARIABLE: return [3 /*break*/, 5];
                            case kitten_cloud_receive_message_type_1.KittenCloudReceiveMessageType.UPDATE_LIST: return [3 /*break*/, 6];
                            case kitten_cloud_receive_message_type_1.KittenCloudReceiveMessageType.UPDATE_ONLINE_USER_NUMBER: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 11];
                    case 1:
                        this.send(kitten_cloud_send_message_type_1.KittenCloudSendMessageType.GET_ALL_DATA, {});
                        return [3 /*break*/, 12];
                    case 2:
                        if (data == null) {
                            throw new Error("获取全部数据数据为空");
                        }
                        if (typeof data != "object" || !Array.isArray(data)) {
                            throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u83B7\u53D6\u5168\u90E8\u6570\u636E\u6570\u636E\uFF1A".concat(data));
                        }
                        dataArray = data;
                        privateVariableArray = [], publicVariableArray = [], listArray = [];
                        for (_i = 0, dataArray_1 = dataArray; _i < dataArray_1.length; _i++) {
                            item = dataArray_1[_i];
                            if (item == null) {
                                continue;
                            }
                            if (typeof item != "object") {
                                throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u83B7\u53D6\u5168\u90E8\u6570\u636E\u6570\u636E\u4E2D\u7684\u6570\u636E\uFF1A".concat(item));
                            }
                            if (!("cvid" in item && typeof item.cvid == "string" &&
                                "name" in item && typeof item.name == "string" &&
                                "value" in item && typeof (item.value == "string" || item.value == "number" || Array.isArray(item.value)) &&
                                "type" in item && typeof item.type == "number")) {
                                throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u83B7\u53D6\u5168\u90E8\u6570\u636E\u6570\u636E\u4E2D\u7684\u6570\u636E\uFF1A".concat(item));
                            }
                            cvid = item.cvid, name_1 = item.name, value = item.value, type_1 = item.type;
                            if (type_1 == kitten_cloud_data_type_1.KittenCloudDataType.PRIVATE_VARIABLE) {
                                privateVariableArray.push({ cvid: cvid, name: name_1, value: value });
                            }
                            else if (type_1 == kitten_cloud_data_type_1.KittenCloudDataType.PUBLIC_VARIABLE) {
                                publicVariableArray.push({ cvid: cvid, name: name_1, value: value });
                            }
                            else if (type_1 == kitten_cloud_data_type_1.KittenCloudDataType.LIST) {
                                listArray.push({ cvid: cvid, name: name_1, value: value });
                            }
                            else {
                                throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u83B7\u53D6\u5168\u90E8\u6570\u636E\u6570\u636E\u4E2D\u7684\u6570\u636E\u6570\u636E\uFF1A".concat(item, "\uFF0C\u6570\u636E\u7C7B\u578B ").concat(type_1, " \u4E0D\u652F\u6301"));
                            }
                        }
                        this.privateVariable.update(privateVariableArray);
                        this.publicVariable.update(publicVariableArray);
                        this.list.update(listArray);
                        this.opened.emit();
                        return [3 /*break*/, 12];
                    case 3:
                        this.privateVariable.handleCloudUpdate(data);
                        return [3 /*break*/, 12];
                    case 4:
                        this.privateVariable.handleReceiveRankingList(data);
                        return [3 /*break*/, 12];
                    case 5:
                        this.publicVariable.handleCloudUpdate(data);
                        return [3 /*break*/, 12];
                    case 6:
                        this.list.handleCloudUpdate(data);
                        return [3 /*break*/, 12];
                    case 7:
                        if (data == null) {
                            throw new Error("在线用户数量数据为空");
                        }
                        if (typeof data != "object" ||
                            !("total" in data) ||
                            typeof data.total != "number") {
                            throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u5728\u7EBF\u7528\u6237\u6570\u91CF\u6570\u636E\uFF1A".concat(data));
                        }
                        if (!(this.onlineUserNumberResolve != null)) return [3 /*break*/, 8];
                        this.onlineUserNumberResolve(new kitten_cloud_online_user_number_1.KittenCloudOnlineUserNumber(data.total));
                        delete this.onlineUserNumberResolve;
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.onlineUserNumber];
                    case 9:
                        (_b.sent()).update({ total: data.total });
                        _b.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u6D88\u606F\u7C7B\u578B\uFF1A".concat(type));
                    case 12: return [2 /*return*/];
                }
            });
        }); })().catch(function (error) { _this.errored.emit(error); });
    };
    /**
     * 获取云数据实例。
     *
     * @param index 该数据的名称或 cvid
     * @returns 对应云数据实例
     * @throws 如果不存在该云数据实例，则抛出异常
     */
    KittenCloudFunction.prototype.get = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var groupArray, _i, groupArray_1, group, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupArray = [
                            this.privateVariable, this.publicVariable, this.list
                        ];
                        _i = 0, groupArray_1 = groupArray;
                        _a.label = 1;
                    case 1:
                        if (!(_i < groupArray_1.length)) return [3 /*break*/, 6];
                        group = groupArray_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, group.get(index)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: throw new Error("\u4E91\u6570\u636E ".concat(index, " \u4E0D\u5B58\u5728"));
                }
            });
        });
    };
    KittenCloudFunction.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var groupArray, result, _i, groupArray_2, group, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        groupArray = [
                            this.privateVariable, this.publicVariable, this.list
                        ];
                        result = [];
                        _i = 0, groupArray_2 = groupArray;
                        _d.label = 1;
                    case 1:
                        if (!(_i < groupArray_2.length)) return [3 /*break*/, 4];
                        group = groupArray_2[_i];
                        _b = (_a = result.push).apply;
                        _c = [result];
                        return [4 /*yield*/, group.getAll()];
                    case 2:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    Object.defineProperty(KittenCloudFunction, "user", {
        /**
         * 当前用户。
         *
         * @returns CodemaoUser
         */
        get: function () {
            if (KittenCloudFunction._user == other_1.None) {
                KittenCloudFunction._user = new codemao_user_1.CodemaoUser();
            }
            return KittenCloudFunction._user;
        },
        enumerable: false,
        configurable: true
    });
    KittenCloudFunction._caughtInstance = new Map();
    KittenCloudFunction._user = other_1.None;
    return KittenCloudFunction;
}(kitten_cloud_function_config_layer_1.KittenCloudFunctionConfigLayer));
exports.KittenCloudFunction = KittenCloudFunction;
