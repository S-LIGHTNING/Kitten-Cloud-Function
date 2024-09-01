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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = getUserProfile;
exports.getThisUserDetail = getThisUserDetail;
exports.getUserDetail = getUserDetail;
exports.getUserHonor = getUserHonor;
exports.getWorkInfo = getWorkInfo;
exports.getWorkDetail = getWorkDetail;
exports.getNemoWorkPublicResource = getNemoWorkPublicResource;
exports.getKittenWorkPublicResource = getKittenWorkPublicResource;
var axios_1 = require("axios");
var other_1 = require("../utils/other");
function codemaoAxios(argument) {
    return __awaiter(this, void 0, void 0, function () {
        var data, error, error_1, request, response, status_1, data;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, axios_1.default)(argument)];
                case 1:
                    data = (_c.sent()).data;
                    if (data != other_1.None && typeof data == "object" &&
                        "code" in data && typeof data.code == "number" &&
                        "msg" in data && typeof data.msg == "string" &&
                        "description" in data && typeof data.description == "string" &&
                        "data" in data) {
                        if (data.code != 200) {
                            error = new Error();
                            Object.assign(error, {
                                request: argument,
                                response: {
                                    status: data.code,
                                    statusText: "未知错误",
                                    data: data
                                }
                            });
                            throw error;
                        }
                        return [2 /*return*/, data.data];
                    }
                    return [2 /*return*/, data];
                case 2:
                    error_1 = _c.sent();
                    if (!axios_1.default.isAxiosError(error_1)) {
                        throw error_1;
                    }
                    request = error_1.request, response = error_1.response;
                    try {
                        if (request == other_1.None) {
                            throw new Error("请求发送失败");
                        }
                        else if (response == other_1.None) {
                            throw new Error("请求已发出，但未收到响应");
                        }
                        else {
                            status_1 = response.status, data = response.data;
                            if (!(typeof data == "object" &&
                                ("error_message" in data || "error" in data || "msg" in data))) {
                                throw new Error(status_1.toString());
                            }
                            throw new Error("".concat(status_1, "\uFF0C").concat((_b = (_a = data.error_message) !== null && _a !== void 0 ? _a : data.error) !== null && _b !== void 0 ? _b : data.msg));
                        }
                    }
                    catch (error) {
                        if (!(error instanceof Error)) {
                            throw error;
                        }
                        throw new Error("".concat(argument.method, " ").concat(argument.url, " \u5931\u8D25\uFF1A").concat(error.message));
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * https://api.codemao.cn/tiger/v3/web/accounts/profile
 * @param authorization 用户凭证，留空则使用浏览器 Cookie
 * @returns 用户信息
 */
function getUserProfile(authorization) {
    return __awaiter(this, void 0, void 0, function () {
        var headers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = authorization == null ? {} : { Cookie: "Authorization=".concat(authorization) };
                    return [4 /*yield*/, codemaoAxios({
                            method: "GET",
                            url: "https://api.codemao.cn/tiger/v3/web/accounts/profile",
                            withCredentials: true,
                            headers: headers
                        })];
                case 1: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
/**
 * https://api.codemao.cn/web/users/details
 *
 * 用户被封号时该 API 不可用。
 *
 * @param authorization 用户凭证，留空则使用浏览器 Cookie
 */
function getThisUserDetail(authorization) {
    var headers = authorization == null ? {} : { Cookie: "Authorization=".concat(authorization) };
    return codemaoAxios({
        method: "GET",
        url: "https://api.codemao.cn/web/users/details",
        withCredentials: true,
        headers: headers
    });
}
/**
 * https://api.codemao.cn/api/user/info/detail/${userID}
 */
function getUserDetail(userID) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, codemaoAxios({
                        method: "GET",
                        url: "https://api.codemao.cn/api/user/info/detail/".concat(userID),
                        withCredentials: true
                    })];
                case 1: return [2 /*return*/, (_a.sent()).userInfo];
            }
        });
    });
}
/**
 * https://api.codemao.cn/creation-tools/v1/user/center/honor?user_id=${userID}
 */
function getUserHonor(userID) {
    return codemaoAxios({
        method: "GET",
        url: "https://api.codemao.cn/creation-tools/v1/user/center/honor?user_id=".concat(userID)
    });
}
/**
 * https://api.codemao.cn/creation-tools/v1/works/${workID}
 */
function getWorkInfo(workID) {
    return codemaoAxios({
        method: "GET",
        url: "https://api.codemao.cn/creation-tools/v1/works/".concat(workID)
    });
}
/**
 * https://api.codemao.cn/api/work/info/${workID}
 */
function getWorkDetail(workID) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, codemaoAxios({
                        method: "GET",
                        url: "https://api.codemao.cn/api/work/info/".concat(workID)
                    })];
                case 1: return [2 /*return*/, (_a.sent()).workDetail];
            }
        });
    });
}
/**
 * https://api.codemao.cn/creation-tools/v1/works/${workID}/source/public
 */
function getNemoWorkPublicResource(workID) {
    return codemaoAxios({
        method: "GET",
        url: "https://api.codemao.cn/creation-tools/v1/works/".concat(workID, "/source/public")
    });
}
/**
 * https://api-creation.codemao.cn/kitten/r2/work/player/load/${workID}
 */
function getKittenWorkPublicResource(workID) {
    return codemaoAxios({
        method: "GET",
        url: "https://api-creation.codemao.cn/kitten/r2/work/player/load/".concat(workID)
    });
}
