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
exports.CodemaoUserInfo = void 0;
var other_1 = require("../../utils/other");
var codemao_community_api_1 = require("../codemao-community-api");
var codemao_user_sex_1 = require("./codemao-user-sex");
/**
 * 编程猫用户信息类。
 *
 * - 用于获取编程猫用户信息。
 * - 所有属性均为`Promise`对象，当属性获取失败时访问该属性的值会被拒绝。
 *
 * 提供的用户信息详见类属性。
 *
 * ### 具有以下特性：
 * - 集成多个API接口，以确保在部分API接口信息获取失败时仍能提供尽可能完整的用户信息。
 * - 内置懒加载和缓存机制，以减少不必要的请求。
 *
 * ### 集成API接口
 *
 * #### 已经集成的API接口
 * - {@link getUserProfile}
 * - {@link getThisUserDetail}
 * - {@link getUserDetail}
 * - {@link getUserHonor}
 *
 * #### 将来可能集成的API接口：
 * - {@link searchUserByName}
 *
 * #### API优先级：
 * {@link getUserProfile} > {@link getThisUserDetail} > {@link getUserDetail} > {@link getUserHonor}
 */
var CodemaoUserInfo = /** @class */ (function () {
    /**
     * @param info 已知的用户信息。
     */
    function CodemaoUserInfo(info) {
        this._profile = other_1.None;
        this._thisDetail = other_1.None;
        this._detail = other_1.None;
        this._honor = other_1.None;
        this._authorization = other_1.None;
        this._id = other_1.None;
        this._username = other_1.None;
        this._nickname = other_1.None;
        this._realname = other_1.None;
        this._avatarURL = other_1.None;
        this._coverURL = other_1.None;
        this._description = other_1.None;
        this._doing = other_1.None;
        this._email = other_1.None;
        this._level = other_1.None;
        this._grade = other_1.None;
        this._birthday = other_1.None;
        this._sex = other_1.None;
        this._viewTimes = other_1.None;
        this._praiseTimes = other_1.None;
        this._collectTimes = other_1.None;
        this._forkTimes = other_1.None;
        if (Object.keys(info).length == 0) {
            this._authorization = Promise.resolve(other_1.None);
        }
        else {
            this.set(info);
        }
    }
    Object.defineProperty(CodemaoUserInfo.prototype, "profile", {
        get: function () {
            var _this = this;
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this._profile == other_1.None)) return [3 /*break*/, 2];
                            this._profile = (function () { return __awaiter(_this, void 0, void 0, function () {
                                var profile, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = codemao_community_api_1.getUserProfile;
                                            return [4 /*yield*/, this.authorization];
                                        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                                        case 2:
                                            profile = _b.sent();
                                            return [2 /*return*/, {
                                                    id: profile.id,
                                                    nickname: profile.nickname,
                                                    avatarURL: profile.avatar_url,
                                                    description: profile.description,
                                                    grade: profile.grade,
                                                    birthday: new Date(profile.birthday * 1000),
                                                }];
                                    }
                                });
                            }); })();
                            _a = this.set;
                            return [4 /*yield*/, this._profile];
                        case 1:
                            _a.apply(this, [_b.sent()]);
                            _b.label = 2;
                        case 2: return [2 /*return*/, this._profile];
                    }
                });
            }); })();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "thisDetail", {
        get: function () {
            var _this = this;
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this._thisDetail == other_1.None)) return [3 /*break*/, 2];
                            this._thisDetail = (function () { return __awaiter(_this, void 0, void 0, function () {
                                var userDetail, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = codemao_community_api_1.getThisUserDetail;
                                            return [4 /*yield*/, this.authorization];
                                        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                                        case 2:
                                            userDetail = _b.sent();
                                            return [2 /*return*/, {
                                                    id: userDetail.id,
                                                    username: userDetail.username,
                                                    nickname: userDetail.nickname,
                                                    realname: userDetail.real_name,
                                                    avatarURL: userDetail.avatar_url,
                                                    description: userDetail.description,
                                                    email: userDetail.email,
                                                    birthday: new Date(userDetail.birthday * 1000),
                                                    sex: codemao_user_sex_1.CodemaoUserSex.from(userDetail.sex),
                                                }];
                                    }
                                });
                            }); })();
                            _a = this.set;
                            return [4 /*yield*/, this._thisDetail];
                        case 1:
                            _a.apply(this, [_b.sent()]);
                            _b.label = 2;
                        case 2: return [2 /*return*/, this._thisDetail];
                    }
                });
            }); })();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "detail", {
        get: function () {
            var _this = this;
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this._detail == other_1.None)) return [3 /*break*/, 2];
                            this._detail = (function () { return __awaiter(_this, void 0, void 0, function () {
                                var userDetail, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = codemao_community_api_1.getUserDetail;
                                            return [4 /*yield*/, this.id];
                                        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                                        case 2:
                                            userDetail = _b.sent();
                                            return [2 /*return*/, {
                                                    id: userDetail.user.id,
                                                    nickname: userDetail.user.nickname,
                                                    avatarURL: userDetail.user.avatar,
                                                    description: userDetail.user.description,
                                                    doing: userDetail.user.doing,
                                                    level: userDetail.user.level,
                                                    sex: codemao_user_sex_1.CodemaoUserSex.from(userDetail.user.sex),
                                                    viewTimes: userDetail.viewTimes,
                                                    praiseTimes: userDetail.praiseTimes,
                                                    forkTimes: userDetail.forkedTimes,
                                                }];
                                    }
                                });
                            }); })();
                            _a = this.set;
                            return [4 /*yield*/, this._detail];
                        case 1:
                            _a.apply(this, [_b.sent()]);
                            _b.label = 2;
                        case 2: return [2 /*return*/, this._detail];
                    }
                });
            }); })();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "honor", {
        get: function () {
            var _this = this;
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this._honor == other_1.None)) return [3 /*break*/, 2];
                            this._honor = (function () { return __awaiter(_this, void 0, void 0, function () {
                                var honor, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = codemao_community_api_1.getUserHonor;
                                            return [4 /*yield*/, this.id];
                                        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                                        case 2:
                                            honor = _b.sent();
                                            return [2 /*return*/, {
                                                    id: honor.user_id,
                                                    nickname: honor.nickname,
                                                    avatarURL: honor.avatar_url,
                                                    coverURL: honor.user_cover,
                                                    description: honor.user_description,
                                                    doing: honor.doing,
                                                    level: honor.author_level,
                                                    viewTimes: honor.view_times,
                                                    praiseTimes: honor.liked_total,
                                                    collectTimes: honor.collect_times,
                                                    forkTimes: honor.re_created_total,
                                                }];
                                    }
                                });
                            }); })();
                            _a = this.set;
                            return [4 /*yield*/, this._honor];
                        case 1:
                            _a.apply(this, [_b.sent()]);
                            _b.label = 2;
                        case 2: return [2 /*return*/, this._honor];
                    }
                });
            }); })();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "authorization", {
        /**
         * 身份信息。
         */
        get: function () {
            if (this._authorization == other_1.None) {
                this._authorization = Promise.reject(new Error("没有提供身份信息"));
            }
            return this._authorization;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "id", {
        /**
         * 用户ID。
         */
        get: function () {
            var _this = this;
            if (this._id == other_1.None) {
                this._id = Promise.any([
                    Promise.reject(new Error("没有提供ID")),
                    this.profile
                        .catch(function (error0) {
                        return _this.thisDetail.catch(function (error1) { return Promise.reject([error0, error1]); });
                    })
                        .then(function (info) { return info.id; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "username", {
        /**
         * 用户名，用户名可以用于登录编程猫账号。如果用户没有设置用户名，则返回空字符串。
         */
        get: function () {
            if (this._username == other_1.None) {
                this._username = Promise.any([
                    Promise.reject(new Error("没有提供用户名")),
                    this.thisDetail.then(function (info) { return info.username; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._username;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "nickname", {
        /**
         * 用户昵称。
         */
        get: function () {
            var _this = this;
            if (this._nickname == other_1.None) {
                this._nickname = Promise.any([
                    Promise.reject(new Error("没有提供昵称")),
                    this.profile
                        .catch(function (error0) {
                        return _this.thisDetail.catch(function (error1) {
                            return _this.detail.catch(function (error2) {
                                return _this.honor.catch(function (error3) {
                                    return Promise.reject([error0, error1, error2, error3]);
                                });
                            });
                        });
                    })
                        .then(function (info) { return info.nickname; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._nickname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "realname", {
        /**
         * 用户真实姓名。如果用户没有填写真实姓名，则返回空字符串。
         */
        get: function () {
            if (this._realname == other_1.None) {
                this._realname = Promise.any([
                    Promise.reject(new Error("没有提供真实姓名")),
                    this.thisDetail.then(function (info) { return info.realname; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._realname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "avatarURL", {
        /**
         * 用户头像地址。
         */
        get: function () {
            var _this = this;
            if (this._avatarURL == other_1.None) {
                this._avatarURL = Promise.any([
                    Promise.reject(new Error("没有提供头像地址")),
                    this.profile
                        .catch(function (error0) {
                        return _this.thisDetail.catch(function (error1) {
                            return _this.detail.catch(function (error2) {
                                return _this.honor.catch(function (error3) {
                                    return Promise.reject([error0, error1, error2, error3]);
                                });
                            });
                        });
                    })
                        .then(function (info) { return info.avatarURL; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._avatarURL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "coverURL", {
        /**
         * 用户背景图片地址。
         */
        get: function () {
            if (this._coverURL == other_1.None) {
                this._coverURL = Promise.any([
                    Promise.reject(new Error("没有提供背景图片地址")),
                    this.honor.then(function (info) { return info.coverURL; })
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._coverURL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "description", {
        /**
         * 用户描述。
         */
        get: function () {
            var _this = this;
            if (this._description == other_1.None) {
                this._description = Promise.any([
                    Promise.reject(new Error("没有提供描述")),
                    this.profile
                        .catch(function (error0) {
                        return _this.thisDetail.catch(function (error1) {
                            return _this.detail.catch(function (error2) {
                                return _this.honor.catch(function (error3) {
                                    return Promise.reject([error0, error1, error2, error3]);
                                });
                            });
                        });
                    })
                        .then(function (info) { return info.description; }),
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
    Object.defineProperty(CodemaoUserInfo.prototype, "doing", {
        /**
         * 用户正在做什么。
         */
        get: function () {
            if (this._doing == other_1.None) {
                this._doing = Promise.any([
                    Promise.reject(new Error("没有提供正在做什么")),
                    this.detail.then(function (info) { return info.doing; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._doing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "email", {
        /**
         * 用户邮箱地址。
         */
        get: function () {
            if (this._email == other_1.None) {
                this._email = Promise.any([
                    Promise.reject(new Error("没有提供邮箱")),
                    this.thisDetail.then(function (info) { return info.email; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "level", {
        /**
         * 用户级别。
         */
        get: function () {
            if (this._level == other_1.None) {
                this._level = Promise.any([
                    Promise.reject(new Error("没有提供级别")),
                    this.detail.then(function (info) { return info.level; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._level;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "grade", {
        /**
         * 用户等级。
         */
        get: function () {
            if (this._grade == other_1.None) {
                this._grade = Promise.any([
                    Promise.reject(new Error("没有提供等级")),
                    this.profile.then(function (info) { return info.grade; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._grade;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "birthday", {
        /**
         * 用户生日。
         */
        get: function () {
            var _this = this;
            if (this._birthday == other_1.None) {
                this._birthday = Promise.any([
                    Promise.reject(new Error("没有提供生日")),
                    this.profile
                        .catch(function (error0) {
                        return _this.thisDetail.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    })
                        .then(function (info) { return info.birthday; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._birthday;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "sex", {
        /**
         * 用户性别。详见 {@link CodemaoUserSex}。
         */
        get: function () {
            var _this = this;
            if (this._sex == other_1.None) {
                this._sex = Promise.any([
                    Promise.reject(new Error("没有提供性别")),
                    this.thisDetail
                        .catch(function (error0) {
                        return _this.detail.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    })
                        .then(function (info) { return info.sex; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._sex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "viewTimes", {
        /**
         * 用户所有作品被浏览的次数总和。
         */
        get: function () {
            var _this = this;
            if (this._viewTimes == other_1.None) {
                this._viewTimes = Promise.any([
                    Promise.reject(new Error("没有提供浏览次数")),
                    this.detail
                        .catch(function (error0) {
                        return _this.honor.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    })
                        .then(function (info) { return info.viewTimes; }),
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
    Object.defineProperty(CodemaoUserInfo.prototype, "praiseTimes", {
        /**
         * 用户所有作品被点赞的次数总和。
         */
        get: function () {
            var _this = this;
            if (this._praiseTimes == other_1.None) {
                this._praiseTimes = Promise.any([
                    Promise.reject(new Error("没有提供点赞次数")),
                    this.detail
                        .catch(function (error0) {
                        return _this.honor.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    })
                        .then(function (info) { return info.praiseTimes; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._praiseTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "collectTimes", {
        /**
         * 用户所有作品被收藏的次数总和。
         */
        get: function () {
            if (this._collectTimes == other_1.None) {
                this._collectTimes = Promise.any([
                    Promise.reject(new Error("没有提供收藏次数")),
                    this.honor.then(function (info) { return info.collectTimes; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(errors);
                });
            }
            return this._collectTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodemaoUserInfo.prototype, "forkTimes", {
        /**
         * 用户所有作品被再创作的次数总和。
         */
        get: function () {
            var _this = this;
            if (this._forkTimes == other_1.None) {
                this._forkTimes = Promise.any([
                    Promise.reject(new Error("没有提供再创作次数")),
                    this.honor
                        .catch(function (error0) {
                        return _this.detail.catch(function (error1) {
                            return Promise.reject([error0, error1]);
                        });
                    })
                        .then(function (info) { return info.forkTimes; }),
                ]).catch(function (_a) {
                    var errors = _a.errors;
                    return Promise.reject(__spreadArray([errors[0]], errors[1], true));
                });
            }
            return this._forkTimes;
        },
        enumerable: false,
        configurable: true
    });
    CodemaoUserInfo.prototype.set = function (info) {
        if (info.authorization != other_1.None)
            this._authorization = Promise.resolve(info.authorization);
        if (info.id != other_1.None)
            this._id = Promise.resolve(info.id);
        if (info.username != other_1.None)
            this._username = Promise.resolve(info.username);
        if (info.nickname != other_1.None)
            this._nickname = Promise.resolve(info.nickname);
        if (info.realname != other_1.None)
            this._nickname = Promise.resolve(info.realname);
        if (info.avatarURL != other_1.None)
            this._avatarURL = Promise.resolve(info.avatarURL);
        if (info.coverURL != other_1.None)
            this._coverURL = Promise.resolve(info.coverURL);
        if (info.description != other_1.None)
            this._description = Promise.resolve(info.description);
        if (info.doing != other_1.None)
            this._doing = Promise.resolve(info.doing);
        if (info.email != other_1.None)
            this._email = Promise.resolve(info.email);
        if (info.level != other_1.None)
            this._level = Promise.resolve(info.level);
        if (info.grade != other_1.None)
            this._grade = Promise.resolve(info.grade);
        if (info.birthday != other_1.None)
            this._birthday = Promise.resolve(info.birthday);
        if (info.sex != other_1.None)
            this._sex = Promise.resolve(info.sex);
        if (info.viewTimes != other_1.None)
            this._viewTimes = Promise.resolve(info.viewTimes);
        if (info.praiseTimes != other_1.None)
            this._praiseTimes = Promise.resolve(info.praiseTimes);
        if (info.collectTimes != other_1.None)
            this._collectTimes = Promise.resolve(info.collectTimes);
        if (info.forkTimes != other_1.None)
            this._forkTimes = Promise.resolve(info.forkTimes);
    };
    return CodemaoUserInfo;
}());
exports.CodemaoUserInfo = CodemaoUserInfo;
