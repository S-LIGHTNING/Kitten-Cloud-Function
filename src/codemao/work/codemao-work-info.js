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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodemaoWorkInfo = void 0;
var other_1 = require("../../utils/other");
var codemao_community_api_1 = require("../codemao-community-api");
var codemao_work_type_1 = require("./codemao-work-type");
/**
 * ## 编程猫作品信息类
 *
 * - 用于获取编程猫作品信息。
 * - 所有属性均为`Promise`对象，当属性获取失败时访问该属性的值会被拒绝。
 *
 * 提供的作品信息详见类属性
 *
 * ### 具有以下特性：
 * - 集成多个API接口，以确保在部分API接口信息获取失败时仍能提供尽可能完整的作品信息。
 * - 内置懒加载和缓存机制，以减少不必要的请求。
 *
 * ### 集成API接口
 *
 * #### 已经集成的API接口
 * - {@link getWorkInfo}
 * - {@link getWorkDetail}
 * - {@link getNemoWorkPublicResource}
 * - {@link getKittenWorkPublicResource}
 *
 * #### 将来可能集成的API接口：
 * - {@link searchWorkByName}
 *
 * #### API优先级：
 * - 优先使用 {@link getWorkInfo} 接口获取作品信息，该接口包含了作品的全部信息，但是容易出错。
 * - 如果 {@link getWorkInfo} 接口获取失败，则使用 {@link getWorkDetail} 接口获取作品的大部分信息。
 * - 如果 {@link getWorkDetail} 接口获取失败，则使用 {@link getNemoWorkPublicResource} 和 {@link getKittenWorkPublicResource} 接口获取作品的少部分信息。
 * - 如果所有接口都获取失败，则抛出异常，对应属性的值会被拒绝。
 */
var CodemaoWorkInfo = /** @class */ (function () {
    /**
     * @param info 已知的作品信息。
     */
    function CodemaoWorkInfo(info) {
        this._workInfo = other_1.None;
        this._workDetail = other_1.None;
        this._nemoPublicResource = other_1.None;
        this._kittenPublicResource = other_1.None;
        this._id = other_1.None;
        this._name = other_1.None;
        this._type = other_1.None;
        this._description = other_1.None;
        this._operationInstruction = other_1.None;
        this._publishTime = other_1.None;
        this._playerURL = other_1.None;
        this._shareURL = other_1.None;
        this._coverURL = other_1.None;
        this._previewURL = other_1.None;
        this._viewTimes = other_1.None;
        this._likeTimes = other_1.None;
        this._collectTimes = other_1.None;
        this._shareTimes = other_1.None;
        this._commentTimes = other_1.None;
        this._openResource = other_1.None;
        this.set(info);
    }
    Object.defineProperty(CodemaoWorkInfo.prototype, "workInfo", {
        get: function () {
            var _this = this;
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this._workInfo == null)) return [3 /*break*/, 2];
                            this._workInfo = (function () { return __awaiter(_this, void 0, void 0, function () {
                                var workInfo, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = codemao_community_api_1.getWorkInfo;
                                            return [4 /*yield*/, this.id];
                                        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                                        case 2:
                                            workInfo = _b.sent();
                                            return [2 /*return*/, {
                                                    id: workInfo.id,
                                                    name: workInfo.work_name,
                                                    type: codemao_work_type_1.CodemaoWorkType.parse(workInfo.type),
                                                    description: workInfo.description,
                                                    operationInstruction: workInfo.operation,
                                                    publishTime: new Date(workInfo.publish_time * 1000),
                                                    playerURL: workInfo.player_url,
                                                    shareURL: workInfo.share_url,
                                                    coverURL: workInfo.preview,
                                                    previewURL: workInfo.screenshot_cover_url,
                                                    viewTimes: workInfo.view_times,
                                                    likeTimes: workInfo.praise_times,
                                                    collectTimes: workInfo.collect_times,
                                                    shareTimes: workInfo.share_times,
                                                    commentTimes: workInfo.comment_times,
                                                    openResource: workInfo.fork_enable
                                                }];
                                    }
                                });
                            }); })();
                            _a = this.set;
                            return [4 /*yield*/, this._workInfo];
                        case 1:
                            _a.apply(this, [_b.sent()]);
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this._workInfo];
                        case 3: return [2 /*return*/, _b.sent()];
                    }
                });
            }); })();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "workDetail", {
        get: function () {
            var _this = this;
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this._workDetail == null)) return [3 /*break*/, 2];
                            this._workDetail = (function () { return __awaiter(_this, void 0, void 0, function () {
                                var _a, workInfo, qrcodeUrl, allowFork, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = codemao_community_api_1.getWorkDetail;
                                            return [4 /*yield*/, this.id];
                                        case 1: return [4 /*yield*/, _b.apply(void 0, [_c.sent()])];
                                        case 2:
                                            _a = _c.sent(), workInfo = _a.workInfo, qrcodeUrl = _a.qrcodeUrl, allowFork = _a.allowFork;
                                            return [2 /*return*/, {
                                                    id: workInfo.id,
                                                    name: workInfo.name,
                                                    description: workInfo.description,
                                                    publishTime: new Date(workInfo.publish_time * 1000),
                                                    shareURL: qrcodeUrl,
                                                    previewURL: workInfo.preview,
                                                    viewTimes: workInfo.view_times,
                                                    likeTimes: workInfo.praise_times,
                                                    collectTimes: workInfo.collection_times,
                                                    openResource: Boolean(allowFork)
                                                }];
                                    }
                                });
                            }); })();
                            _a = this.set;
                            return [4 /*yield*/, this._workDetail];
                        case 1:
                            _a.apply(this, [_b.sent()]);
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this._workDetail];
                        case 3: return [2 /*return*/, _b.sent()];
                    }
                });
            }); })();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "nemoWorkPublicResource", {
        get: function () {
            var _this = this;
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this._nemoPublicResource == null)) return [3 /*break*/, 2];
                            this._nemoPublicResource = (function () { return __awaiter(_this, void 0, void 0, function () {
                                var source, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = codemao_community_api_1.getNemoWorkPublicResource;
                                            return [4 /*yield*/, this.id];
                                        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                                        case 2:
                                            source = _b.sent();
                                            return [2 /*return*/, {
                                                    id: source.work_id,
                                                    name: source.name,
                                                    type: codemao_work_type_1.CodemaoWorkType.NEMO,
                                                    coverURL: source.preview,
                                                    previewURL: source.preview,
                                                    viewTimes: source.view_times,
                                                    likeTimes: source.n_likes
                                                }];
                                    }
                                });
                            }); })();
                            _a = this.set;
                            return [4 /*yield*/, this._nemoPublicResource];
                        case 1:
                            _a.apply(this, [_b.sent()]);
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this._nemoPublicResource];
                        case 3: return [2 /*return*/, _b.sent()];
                    }
                });
            }); })();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "kittenWorkPublicResource", {
        get: function () {
            var _this = this;
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this._kittenPublicResource == null)) return [3 /*break*/, 2];
                            this._kittenPublicResource = (function () { return __awaiter(_this, void 0, void 0, function () {
                                var source, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = codemao_community_api_1.getKittenWorkPublicResource;
                                            return [4 /*yield*/, this.id];
                                        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                                        case 2:
                                            source = _b.sent();
                                            return [2 /*return*/, {
                                                    name: source.name,
                                                    type: codemao_work_type_1.CodemaoWorkType.KITTEN,
                                                    publishTime: new Date(source.updated_time * 1000)
                                                }];
                                    }
                                });
                            }); })();
                            _a = this.set;
                            return [4 /*yield*/, this._kittenPublicResource];
                        case 1:
                            _a.apply(this, [_b.sent()]);
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this._kittenPublicResource];
                        case 3: return [2 /*return*/, _b.sent()];
                    }
                });
            }); })();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "id", {
        /**
         * 作品 ID。
         */
        get: function () {
            if (this._id == null) {
                this._id = Promise.reject(new Error("没有提供ID"));
            }
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "name", {
        /**
         * 作品名称。
         */
        get: function () {
            var _this = this;
            if (this._name == null) {
                this._name = Promise.any([
                    Promise.reject(new Error("没有提供名称")),
                    this.workInfo
                        .catch(function (getWorkInfoError) {
                        return _this.workDetail.catch(function (getWorkDetailError) {
                            return Promise.reject([getWorkInfoError, getWorkDetailError]);
                        });
                    }).catch(function (error0) {
                        return Promise.any([
                            _this.nemoWorkPublicResource,
                            _this.kittenWorkPublicResource
                        ]).catch(function (error1) {
                            return Promise.reject(__spreadArray(__spreadArray([], error0, true), error1.errors, true));
                        });
                    }).then(function (info) { return info.name; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "type", {
        /**
         * 作品类型，详见 {@link CodemaoWorkType}。
         */
        get: function () {
            var _this = this;
            if (this._type == null) {
                this._type = Promise.any([
                    Promise.reject(new Error("没有提供类型")),
                    this.workInfo
                        .catch(function (error0) {
                        return Promise.any([
                            _this.nemoWorkPublicResource,
                            _this.kittenWorkPublicResource
                        ]).catch(function (error1) {
                            return Promise.reject(__spreadArray([error0], error1.errors, true));
                        });
                    }).then(function (info) { return info.type; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "description", {
        /**
         * 作品描述。
         */
        get: function () {
            var _this = this;
            if (this._description == null) {
                this._description = Promise.any([
                    Promise.reject(new Error("没有提供描述")),
                    this.workInfo
                        .catch(function (error0) {
                        return _this.workDetail.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    }).then(function (info) { return info.description; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "operationInstruction", {
        /**
         * 作品操作说明。
         */
        get: function () {
            if (this._operationInstruction == null) {
                this._operationInstruction = Promise.any([
                    Promise.reject(new Error("没有提供操作说明")),
                    this.workInfo.then(function (info) { return info.operationInstruction; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._operationInstruction;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "publishTime", {
        /**
         * 作品发布时间。
         */
        get: function () {
            var _this = this;
            if (this._publishTime == null) {
                this._publishTime = Promise.any([
                    Promise.reject(new Error("没有提供发布时间")),
                    this.workInfo
                        .catch(function (error0) {
                        return _this.kittenWorkPublicResource
                            .catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    }).then(function (info) { return info.publishTime; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._publishTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "playerURL", {
        /**
         * 作品运行器（即 Player）地址。
         */
        get: function () {
            if (this._playerURL == null) {
                this._playerURL = Promise.any([
                    Promise.reject(new Error("没有提供运行器地址")),
                    this.workInfo.then(function (info) { return info.playerURL; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._playerURL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "shareURL", {
        /**
         * 作品分享地址。
         */
        get: function () {
            var _this = this;
            if (this._shareURL == null) {
                this._shareURL = Promise.any([
                    Promise.reject(new Error("没有提供分享地址")),
                    this.workInfo
                        .catch(function (error0) {
                        return _this.workDetail.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    }).then(function (info) { return info.shareURL; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._shareURL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "coverURL", {
        /**
         * 作品封面地址。
         */
        get: function () {
            var _this = this;
            if (this._coverURL == null) {
                this._coverURL = Promise.any([
                    Promise.reject(new Error("没有提供封面地址")),
                    this.workInfo
                        .catch(function (error0) {
                        return _this.nemoWorkPublicResource
                            .catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    }).then(function (info) { return info.coverURL; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._coverURL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "previewURL", {
        /**
         * 作品预览地址。
         */
        get: function () {
            var _this = this;
            if (this._previewURL == null) {
                this._previewURL = Promise.any([
                    Promise.reject(new Error("没有提供预览地址")),
                    this.workInfo
                        .catch(function (error0) {
                        return _this.workDetail.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    }).catch(function (error0) {
                        return _this.nemoWorkPublicResource
                            .catch(function (error1) {
                            return Promise.reject(__spreadArray(__spreadArray([], error0, true), [error1], false));
                        });
                    }).then(function (info) { return info.previewURL; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._previewURL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "viewTimes", {
        /**
         * 作品被浏览的次数。
         */
        get: function () {
            var _this = this;
            if (this._viewTimes == null) {
                this._viewTimes = Promise.any([
                    Promise.reject(new Error("没有提供浏览次数")),
                    this.workInfo
                        .catch(function (error0) {
                        return _this.workDetail.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    }).catch(function (error0) {
                        return _this.nemoWorkPublicResource
                            .catch(function (error1) {
                            return Promise.reject(__spreadArray(__spreadArray([], error0, true), [error1], false));
                        });
                    }).then(function (info) { return info.viewTimes; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._viewTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "likeTimes", {
        /**
         * 点赞该作品的人数。
         */
        get: function () {
            var _this = this;
            if (this._likeTimes == null) {
                this._likeTimes = Promise.any([
                    Promise.reject(new Error("没有提供点赞次数")),
                    this.workInfo
                        .catch(function (error0) {
                        return _this.workDetail.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    }).catch(function (error0) {
                        return _this.nemoWorkPublicResource
                            .catch(function (error1) {
                            return Promise.reject(__spreadArray(__spreadArray([], error0, true), [error1], false));
                        });
                    }).then(function (info) { return info.likeTimes; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._likeTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "collectTimes", {
        /**
         * 收藏该作品的人数。
         */
        get: function () {
            var _this = this;
            if (this._collectTimes == null) {
                this._collectTimes = Promise.any([
                    Promise.reject(new Error("没有提供收藏次数")),
                    this.workInfo
                        .catch(function (error0) {
                        return _this.workDetail.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    }).then(function (info) { return info.collectTimes; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._collectTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "shareTimes", {
        /**
         * 作品被分享的次数。
         */
        get: function () {
            if (this._shareTimes == null) {
                this._shareTimes = Promise.any([
                    Promise.reject(new Error("没有提供分享次数")),
                    this.workInfo.then(function (info) { return info.shareTimes; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._shareTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "commentTimes", {
        /**
         * 作品的评论区中评论的数量，包括二级评论。
         */
        get: function () {
            if (this._commentTimes == null) {
                this._commentTimes = Promise.any([
                    Promise.reject(new Error("没有提供评论次数")),
                    this.workInfo.then(function (info) { return info.commentTimes; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._commentTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoWorkInfo.prototype, "openResource", {
        /**
         * 作品是否是否开源。
         */
        get: function () {
            var _this = this;
            if (this._openResource == null) {
                this._openResource = Promise.any([
                    Promise.reject(new Error("没有提供开源状态")),
                    this.workInfo
                        .catch(function (error0) {
                        return _this.workDetail.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    }).then(function (info) { return info.openResource; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._openResource;
        },
        enumerable: false,
        configurable: true
    });
    CodemaoWorkInfo.prototype.set = function (info) {
        if (info.id != other_1.None)
            this._id = Promise.resolve(info.id);
        if (info.name != other_1.None)
            this._name = Promise.resolve(info.name);
        if (info.type != other_1.None)
            this._type = Promise.resolve(info.type);
        if (info.description != other_1.None)
            this._description = Promise.resolve(info.description);
        if (info.operationInstruction != other_1.None)
            this._operationInstruction = Promise.resolve(info.operationInstruction);
        if (info.publishTime != other_1.None)
            this._publishTime = Promise.resolve(info.publishTime);
        if (info.playerURL != other_1.None)
            this._playerURL = Promise.resolve(info.playerURL);
        if (info.shareURL != other_1.None)
            this._shareURL = Promise.resolve(info.shareURL);
        if (info.coverURL != other_1.None)
            this._coverURL = Promise.resolve(info.coverURL);
        if (info.previewURL != other_1.None)
            this._previewURL = Promise.resolve(info.previewURL);
        if (info.viewTimes != other_1.None)
            this._viewTimes = Promise.resolve(info.viewTimes);
        if (info.likeTimes != other_1.None)
            this._likeTimes = Promise.resolve(info.likeTimes);
        if (info.collectTimes != other_1.None)
            this._collectTimes = Promise.resolve(info.collectTimes);
        if (info.shareTimes != other_1.None)
            this._shareTimes = Promise.resolve(info.shareTimes);
        if (info.commentTimes != other_1.None)
            this._commentTimes = Promise.resolve(info.commentTimes);
        if (info.openResource != other_1.None)
            this._openResource = Promise.resolve(info.openResource);
    };
    return CodemaoWorkInfo;
}());
exports.CodemaoWorkInfo = CodemaoWorkInfo;
