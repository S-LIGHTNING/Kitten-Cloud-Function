"use strict";
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KittenCloudWebSocket = void 0;
var web_socket_proxy_1 = require("../../../utils/web-socket-proxy");
var codemao_work_type_1 = require("../../../codemao/work/codemao-work-type");
var codemao_work_1 = require("../../../codemao/work/codemao-work");
var signal_1 = require("../../../utils/signal");
var kitten_cloud_web_socket_message_type_1 = require("./kitten-cloud-web-socket-message-type");
var other_1 = require("../../../utils/other");
var KITTEN_WEB_SOCKET_URL_PARAMS = (_a = {},
    _a[codemao_work_type_1.CodemaoWorkType.NEMO.symbol] = {
        authorization_type: 5,
        stag: 2,
        EIO: 3,
        transport: "websocket"
    },
    _a[codemao_work_type_1.CodemaoWorkType.KITTEN.symbol] = {
        authorization_type: 1,
        stag: 1,
        EIO: 3,
        transport: "websocket"
    },
    _a);
var KittenCloudWebSocket = /** @class */ (function () {
    function KittenCloudWebSocket(argument) {
        var _a;
        this.autoReconnect = true;
        this.autoReconnectIntervalTime = 8000;
        this.isOpened = false;
        this.socketResolve = other_1.None;
        this.manage = argument instanceof codemao_work_1.CodemaoWork;
        this.sended = new signal_1.Signal();
        this.opened = new signal_1.Signal();
        this.disconnected = new signal_1.Signal();
        this.received = new signal_1.Signal();
        this.errored = new signal_1.Signal();
        this.closed = new signal_1.Signal();
        this.pingHandlerArray = [];
        if (argument instanceof codemao_work_1.CodemaoWork) {
            this.work = argument;
        }
        else {
            this.work = new codemao_work_1.CodemaoWork({
                id: parseInt((_a = new URL(argument.url).searchParams.get("session_id")) !== null && _a !== void 0 ? _a : "0")
            });
        }
        this.setSocket(argument);
    }
    KittenCloudWebSocket.prototype.changeWebSocket = function (argument) {
        this.setSocket(argument);
    };
    KittenCloudWebSocket.prototype.setSocket = function (argument) {
        var _this = this;
        this.socket = this.getSocket(argument);
        if (this.socketResolve != other_1.None) {
            this.socketResolve(this.socket);
            this.socketResolve = other_1.None;
        }
        this.socket.then(function (socket) {
            socket.sended.connect(function (message) { _this.sended.emit(message); });
            socket.received.connect(function (message) { _this.handleReceived(message.data); });
            socket.errored.connect(function (error) { _this.errored.emit(error); });
            socket.closed.connect(function (event) { _this.handleClose(event); });
        }).catch(function (reason) {
            _this.errored.emit(reason);
        });
    };
    KittenCloudWebSocket.prototype.getSocket = function (argument) {
        return __awaiter(this, void 0, void 0, function () {
            var url, socket;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(argument instanceof codemao_work_1.CodemaoWork)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                                var scheme, host, port, path, particularParams, _a, _b, _c, params, _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            scheme = window.location.protocol == "https:" ? "wss" : "ws";
                                            host = ["socketcv", "codemao", "cn"].join(".");
                                            port = 9096;
                                            path = "/cloudstorage/";
                                            _a = KITTEN_WEB_SOCKET_URL_PARAMS;
                                            return [4 /*yield*/, argument.info.type];
                                        case 1:
                                            particularParams = _a[(_e.sent()).symbol];
                                            if (!(particularParams == other_1.None)) return [3 /*break*/, 3];
                                            _b = Error.bind;
                                            _c = "\u4E0D\u652F\u6301\u7684\u4F5C\u54C1\u7C7B\u578B: ".concat;
                                            return [4 /*yield*/, argument.info.type];
                                        case 2: throw new (_b.apply(Error, [void 0, _c.apply("\u4E0D\u652F\u6301\u7684\u4F5C\u54C1\u7C7B\u578B: ", [(_e.sent()).name])]))();
                                        case 3:
                                            _d = "session_id=".concat;
                                            return [4 /*yield*/, argument.info.id];
                                        case 4:
                                            params = _d.apply("session_id=", [_e.sent(), "&"]).concat(Object.entries(particularParams)
                                                .map(function (_a) {
                                                var key = _a[0], value = _a[1];
                                                return "".concat(key, "=").concat(value);
                                            })
                                                .join("&"));
                                            return [2 /*return*/, "".concat(scheme, "://").concat(host, ":").concat(port).concat(path, "?").concat(params)];
                                    }
                                });
                            }); })()];
                    case 1:
                        url = _a.sent();
                        socket = new web_socket_proxy_1.WebSocketProxy(url);
                        return [2 /*return*/, socket];
                    case 2:
                        if (argument instanceof WebSocket) {
                            return [2 /*return*/, new web_socket_proxy_1.WebSocketProxy(argument)];
                        }
                        else {
                            return [2 /*return*/, argument];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    KittenCloudWebSocket.prototype.handleReceived = function (message) {
        var _a, _b;
        try {
            var type = parseInt((_b = (_a = /^[0-9]+/.exec(message)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "-1");
            var data = message.length == type.toString().length ?
                other_1.None : JSON.parse(message.slice(type.toString().length));
            if (!this.manage && type != kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.MESSAGE) {
                return;
            }
            switch (type) {
                case kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.UPGRADE:
                    if (data == other_1.None) {
                        throw new Error("升级数据为空");
                    }
                    if (typeof data != "object" ||
                        !("pingInterval" in data) ||
                        !("pingTimeout" in data) ||
                        typeof data.pingInterval != "number" ||
                        typeof data.pingTimeout != "number") {
                        throw new Error("无法识别的升级数据格式");
                    }
                    this.startPing(data.pingInterval, data.pingTimeout);
                    break;
                case kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.ERROR:
                    this.handleServerError();
                    break;
                case kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.PONG:
                    clearTimeout(this.pingHandlerArray.shift());
                    break;
                case kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.CONNECT:
                    this.opened.emit();
                    break;
                case kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.CLOSE:
                    this.handleServerClose();
                    break;
                case kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.MESSAGE:
                    if (data == other_1.None) {
                        throw new Error("消息数据为空");
                    }
                    if (!Array.isArray(data) ||
                        data.length != 2 ||
                        typeof data[0] != "string") {
                        throw new Error("无法识别的消息格式");
                    }
                    if (typeof data[1] == "string") {
                        try {
                            data[1] = JSON.parse(data[1]);
                        }
                        catch (error) { }
                    }
                    this.received.emit(data);
                    break;
                default:
                    throw new Error("\u672A\u77E5\u6D88\u606F\u7C7B\u578B: ".concat(type));
            }
        }
        catch (error) {
            this.errored.emit(error);
        }
    };
    KittenCloudWebSocket.prototype.startPing = function (interval, timeout) {
        var _this = this;
        if (this.pingHandler != other_1.None) {
            this.stopPing();
        }
        this.pingHandlerArray = [];
        this.pingHandler = setInterval(function () {
            _this.socket.then(function (socket) {
                socket.send(kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.PING.toString());
                _this.pingHandlerArray.push(setTimeout(function () {
                    _this.clientErrorClose(new Error("保活超时"));
                }, timeout));
            });
        }, interval);
    };
    KittenCloudWebSocket.prototype.stopPing = function () {
        if (this.pingHandler != other_1.None) {
            clearInterval(this.pingHandler);
        }
        for (var _i = 0, _a = this.pingHandlerArray; _i < _a.length; _i++) {
            var timeout = _a[_i];
            clearTimeout(timeout);
        }
    };
    KittenCloudWebSocket.prototype.send = function (message) {
        var _this = this;
        this.socket.then(function (socket) {
            if (typeof message != "string") {
                message = JSON.stringify(message);
            }
            socket.send("".concat(kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.MESSAGE.toString()).concat(message));
        }).catch(function (reason) {
            _this.errored.emit(reason);
        });
    };
    KittenCloudWebSocket.prototype.handleClose = function (event) {
        var _this = this;
        this.disconnected.emit();
        if (!this.autoReconnect) {
            this.closed.emit(event);
            return;
        }
        if (this.isOpened) {
            this.isOpened = false;
            if (this.manage) {
                var url_1;
                this.socket.then(function (socket) {
                    url_1 = socket.url;
                });
                this.socket = new Promise(function (resolve) {
                    setTimeout(function () {
                        _this.socketResolve = resolve;
                        _this.setSocket(new web_socket_proxy_1.WebSocketProxy(url_1));
                    }, _this.autoReconnectIntervalTime);
                });
            }
            else {
                this.socket = new Promise(function (resolve, reject) {
                    _this.socketResolve = resolve;
                    setTimeout(function () {
                        _this.closed.emit(event);
                        reject(new Error("重连等待超时"));
                    });
                });
            }
        }
    };
    KittenCloudWebSocket.prototype.handleServerError = function () {
        this.errored.emit(new Error("服务器错误"));
        this.socket.then(function (socket) {
            try {
                socket.close();
            }
            catch (error) { }
        });
    };
    KittenCloudWebSocket.prototype.clientErrorClose = function (error) {
        this.errored.emit(error);
        this.socket.then(function (socket) {
            socket.send(kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.ERROR.toString());
            socket.close();
        });
    };
    KittenCloudWebSocket.prototype.handleServerClose = function () {
        this.socket.then(function (socket) {
            try {
                socket.close();
            }
            catch (error) { }
        });
    };
    KittenCloudWebSocket.prototype.close = function () {
        var _this = this;
        this.socket.then(function (socket) {
            socket.send(kitten_cloud_web_socket_message_type_1.KittenCloudWebSocketMessageType.CLOSE.toString());
            _this.isOpened = false;
            socket.close();
        }).catch(function (reason) {
            _this.errored.emit(reason);
        });
    };
    return KittenCloudWebSocket;
}());
exports.KittenCloudWebSocket = KittenCloudWebSocket;
