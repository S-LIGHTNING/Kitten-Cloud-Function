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
var kitten_cloud_function_1 = require("../kitten-cloud-function");
var codemao_work_1 = require("../codemao/work/codemao-work");
var other_1 = require("../utils/other");
var kitten_cloud_variable_1 = require("../module/cloud-data/kitten-cloud-variable");
var codemao_user_1 = require("../codemao/user/codemao-user");
var kitten_cloud_private_variable_1 = require("../module/cloud-data/kitten-cloud-private-variable");
var kitten_cloud_list_1 = require("../module/cloud-data/kitten-cloud-list");
var project = require("../../project").project;
var Color;
(function (Color) {
    Color["BLACK"] = "#000000";
    Color["PURPLE"] = "#C571D8";
    Color["BROWN"] = "#D67B18";
    Color["RED"] = "#DB6656";
    Color["YELLOW"] = "#C7C100";
})(Color || (Color = {}));
var ValueType;
(function (ValueType) {
    ValueType["NUMBER"] = "number";
    ValueType["STRING"] = "string";
    ValueType["BOOLEAN"] = "boolean";
    ValueType["ARRAY"] = "array";
    ValueType["OBJECT"] = "object";
})(ValueType || (ValueType = {}));
var VariableValueType = [ValueType.NUMBER, ValueType.STRING];
var ListItemValueType = [ValueType.NUMBER, ValueType.STRING];
var types = {
    type: "SLIGHTNING_KITTEN_CLOUD_FUNCTION_WIDGET",
    title: project.name,
    author: project.author,
    icon: "icon-widget-cloud-room",
    version: project.version,
    license: project.license,
    docs: project.docs,
    isInvisibleWidget: true,
    isGlobalWidget: true,
    properties: [],
    methods: [
        {
            key: "group",
            label: "连接",
            color: Color.PURPLE
        }, {
            key: "connect",
            label: "连接到",
            params: [
                {
                    key: "workID",
                    valueType: ValueType.NUMBER,
                    defaultValue: 0
                }
            ]
        }, {
            key: "close",
            label: "关闭连接",
            params: []
        }, {
            key: "isConnected",
            label: "已连接",
            params: [],
            valueType: ValueType.BOOLEAN
        }, {
            key: "connectedWorkID",
            label: "已连接作品编号",
            params: [],
            valueType: ValueType.NUMBER,
            blockOptions: {
                space: 40
            }
        }, {
            key: "getConnectionConfigValue",
            label: "获取连接",
            params: [
                {
                    key: "type",
                    dropdown: [
                        { label: "自动重连间隔时间", value: "autoReconnectIntervalTime" },
                        { label: "本地预更新", value: "localPreupdate" },
                        { label: "缓存时间", value: "cacheTime" },
                        { label: "上传间隔时间", value: "uploadIntervalTime" },
                        { label: "字符串长度限制", value: "stringLengthLimit" },
                        { label: "列表长度限制", value: "listLengthLimit" }
                    ]
                }
            ],
            valueType: [ValueType.NUMBER, ValueType.BOOLEAN]
        }, {
            key: "setConnectionConfig",
            label: "设置连接",
            params: [
                {
                    key: "type",
                    dropdown: [
                        { label: "自动重连间隔时间", value: "autoReconnectIntervalTime" },
                        { label: "本地预更新", value: "localPreupdate" },
                        { label: "缓存时间", value: "cacheTime" },
                        { label: "上传间隔时间", value: "uploadIntervalTime" },
                        { label: "字符串长度限制", value: "stringLengthLimit" },
                        { label: "列表长度限制", value: "listLengthLimit" }
                    ]
                }, {
                    key: "value",
                    label: "为",
                    valueType: [ValueType.NUMBER, ValueType.BOOLEAN],
                    defaultValue: 0
                }
            ]
        }, {
            key: "group",
            label: "云变量",
            color: Color.BROWN
        }, {
            key: "getPrivateVariableList",
            label: "私有云变量列表",
            params: [],
            valueType: ValueType.ARRAY
        }, {
            key: "getPrivateVariableConfigValue",
            label: "获取私有云变量",
            params: [
                {
                    key: "type",
                    dropdown: [
                        { label: "本地预更新", value: "localPreupdate" },
                        { label: "缓存时间", value: "cacheTime" },
                        { label: "上传间隔时间", value: "uploadIntervalTime" },
                        { label: "字符串长度限制", value: "stringLengthLimit" }
                    ]
                }
            ],
            valueType: [ValueType.NUMBER, ValueType.STRING]
        }, {
            key: "setPrivateVariableConfig",
            label: "设置私有云变量",
            params: [
                {
                    key: "type",
                    dropdown: [
                        { label: "本地预更新", value: "localPreupdate" },
                        { label: "缓存时间", value: "cacheTime" },
                        { label: "上传间隔时间", value: "uploadIntervalTime" },
                        { label: "字符串长度限制", value: "stringLengthLimit" }
                    ]
                }, {
                    key: "value",
                    label: "为",
                    valueType: [ValueType.NUMBER, ValueType.STRING],
                    defaultValue: 0
                }
            ],
            blockOptions: {
                space: 40
            }
        }, {
            key: "getPublicVariableList",
            label: "公有云变量列表",
            params: [],
            valueType: ValueType.ARRAY
        }, {
            key: "getPublicVariableConfigValue",
            label: "获取公有云变量",
            params: [
                {
                    key: "type",
                    dropdown: [
                        { label: "本地预更新", value: "localPreupdate" },
                        { label: "缓存时间", value: "cacheTime" },
                        { label: "上传间隔时间", value: "uploadIntervalTime" },
                        { label: "字符串长度限制", value: "stringLengthLimit" }
                    ]
                }
            ],
            valueType: [ValueType.NUMBER, ValueType.STRING]
        }, {
            key: "setPublicVariableConfig",
            label: "设置公有云变量",
            params: [
                {
                    key: "type",
                    dropdown: [
                        { label: "本地预更新", value: "localPreupdate" },
                        { label: "缓存时间", value: "cacheTime" },
                        { label: "上传间隔时间", value: "uploadIntervalTime" },
                        { label: "字符串长度限制", value: "stringLengthLimit" }
                    ]
                }, {
                    key: "value",
                    label: "为",
                    valueType: [ValueType.NUMBER, ValueType.STRING],
                    defaultValue: 0
                }
            ],
            blockOptions: {
                space: 40
            }
        }, {
            key: "variableGet",
            params: [
                {
                    key: "name",
                    valueType: ValueType.STRING,
                    defaultValue: "云变量"
                }
            ],
            valueType: VariableValueType
        }, {
            key: "variableSet",
            label: "设置",
            params: [
                {
                    key: "name",
                    labelAfter: "的值",
                    valueType: ValueType.STRING,
                    defaultValue: "云变量"
                }, {
                    key: "value",
                    label: "为",
                    valueType: VariableValueType,
                    defaultValue: "新的值"
                }
            ],
            blockOptions: {
                space: 40
            }
        }, {
            key: "getRankingList",
            params: [
                {
                    key: "name",
                    valueType: ValueType.STRING,
                    defaultValue: "私有云变量"
                }, {
                    key: "limit",
                    label: "前",
                    labelAfter: "名",
                    valueType: ValueType.NUMBER,
                    defaultValue: 31
                }, {
                    key: "order",
                    labelAfter: "排行榜",
                    dropdown: [
                        { label: "逆序", value: -1 },
                        { label: "正序", value: 1 }
                    ]
                }
            ],
            valueType: ValueType.ARRAY
        }, {
            key: "group",
            label: "用户信息",
            color: Color.RED
        }, {
            key: "isUserLogged",
            label: "用户已登录",
            params: [],
            valueType: ValueType.BOOLEAN
        }, {
            key: "getUserInfo",
            params: [
                {
                    key: "userID",
                    label: "ID 为",
                    labelAfter: "的用户",
                    valueType: ValueType.NUMBER,
                    defaultValue: 0
                }, {
                    key: "type",
                    label: "的",
                    dropdown: [
                        { label: "ID", value: "id" },
                        { label: "用户名", value: "username" },
                        { label: "昵称", value: "nickname" },
                        { label: "真实姓名", value: "realname" },
                        { label: "头像地址", value: "avatarURL" },
                        { label: "背景图片地址", value: "coverURL" },
                        { label: "描述", value: "description" },
                        { label: "正在做", value: "doing" },
                        { label: "邮箱", value: "email" },
                        { label: "级别", value: "level" },
                        { label: "等级", value: "grade" },
                        { label: "生日", value: "birthday" },
                        { label: "性别", value: "sex" },
                        { label: "总被浏览次数", value: "viewTimes" },
                        { label: "总被点赞次数", value: "praiseTimes" },
                        { label: "总被收藏次数", value: "collectTimes" },
                        { label: "总被再创作次数", value: "forkTimes" }
                    ]
                }
            ],
            valueType: [ValueType.STRING, ValueType.NUMBER]
        }, {
            key: "getOnlineUsersNumber",
            label: "在线用户数",
            params: [],
            valueType: ValueType.NUMBER
        }, {
            key: "group",
            label: "云列表",
            color: Color.YELLOW
        }, {
            key: "getListList",
            label: "云列表列表",
            params: [],
            valueType: ValueType.ARRAY
        }, {
            key: "getListConfigValue",
            label: "获取云列表",
            params: [
                {
                    key: "type",
                    dropdown: [
                        { label: "本地预更新", value: "localPreupdate" },
                        { label: "缓存时间", value: "cacheTime" },
                        { label: "上传间隔时间", value: "uploadIntervalTime" },
                        { label: "字符串长度限制", value: "stringLengthLimit" },
                        { label: "列表长度限制", value: "listLengthLimit" }
                    ]
                }
            ],
            valueType: [ValueType.NUMBER, ValueType.STRING]
        }, {
            key: "setListConfig",
            label: "设置云列表",
            params: [
                {
                    key: "type",
                    dropdown: [
                        { label: "本地预更新", value: "localPreupdate" },
                        { label: "缓存时间", value: "cacheTime" },
                        { label: "上传间隔时间", value: "uploadIntervalTime" },
                        { label: "字符串长度限制", value: "stringLengthLimit" },
                        { label: "列表长度限制", value: "listLengthLimit" }
                    ]
                }, {
                    key: "value",
                    label: "为",
                    valueType: [ValueType.NUMBER, ValueType.STRING],
                    defaultValue: 0
                }
            ],
            blockOptions: {
                space: 40
            }
        }, {
            key: "getListCopy",
            params: [
                {
                    key: "name",
                    labelAfter: "副本",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }
            ],
            valueType: ValueType.ARRAY
        }, {
            key: "listAppend",
            label: "添加",
            params: [
                {
                    key: "value",
                    valueType: ValueType.STRING,
                    defaultValue: "值"
                }, {
                    key: "name",
                    label: "到",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }, {
                    key: "position",
                    dropdown: [
                        { label: "头部", value: "head" },
                        { label: "尾部", value: "tail" }
                    ]
                }
            ]
        }, {
            key: "listAdd",
            label: "添加",
            params: [
                {
                    key: "value",
                    valueType: ListItemValueType,
                    defaultValue: "值"
                }, {
                    key: "name",
                    label: "到",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }, {
                    key: "indexingMode",
                    dropdown: [
                        { label: "正数", value: "forward" },
                        { label: "倒数", value: "backward" }
                    ]
                }, {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: ValueType.NUMBER,
                    defaultValue: 1
                }
            ]
        }, {
            key: "listRemove",
            label: "移除",
            params: [
                {
                    key: "name",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }, {
                    key: "indexingMode",
                    dropdown: [
                        { label: "正数", value: "forward" },
                        { label: "倒数", value: "backward" }
                    ]
                }, {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: ValueType.NUMBER,
                    defaultValue: 1
                }
            ]
        }, {
            key: "listEmpty",
            label: "清空",
            params: [
                {
                    key: "name",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }
            ]
        }, {
            key: "listReplace",
            label: "替换",
            params: [
                {
                    key: "name",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }, {
                    key: "indexingMode",
                    dropdown: [
                        { label: "正数", value: "forward" },
                        { label: "倒数", value: "backward" }
                    ]
                }, {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: ValueType.NUMBER,
                    defaultValue: 1
                }, {
                    key: "value",
                    label: "为",
                    valueType: ListItemValueType,
                    defaultValue: "值"
                }
            ]
        }, {
            key: "listCopy",
            label: "复制",
            params: [
                {
                    key: "list1name",
                    valueType: [ValueType.STRING, ValueType.ARRAY],
                    defaultValue: "列表（可放入本地列表）"
                }, {
                    key: "list2name",
                    label: "到",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }
            ],
            blockOptions: {
                space: 40
            }
        }, {
            key: "listGet",
            params: [
                {
                    key: "name",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }, {
                    key: "indexingMode",
                    dropdown: [
                        { label: "正数", value: "forward" },
                        { label: "倒数", value: "backward" }
                    ]
                }, {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: ValueType.NUMBER,
                    defaultValue: 1
                }
            ],
            valueType: ListItemValueType
        }, {
            key: "listLength",
            params: [
                {
                    key: "name",
                    labelAfter: "的项数",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }
            ],
            valueType: ValueType.NUMBER
        }, {
            key: "listFind",
            params: [
                {
                    key: "name",
                    labelAfter: "中",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }, {
                    key: "countingMode",
                    dropdown: [
                        { label: "正数", value: "forward" },
                        { label: "倒数", value: "backward" }
                    ]
                }, {
                    key: "count",
                    label: "第",
                    labelAfter: "个",
                    valueType: ValueType.NUMBER,
                    defaultValue: 1
                }, {
                    key: "value",
                    labelAfter: "的位置",
                    valueType: ValueType.STRING,
                    defaultValue: "值"
                }
            ],
            valueType: ValueType.NUMBER
        }, {
            key: "listContain",
            params: [
                {
                    key: "name",
                    labelAfter: "中",
                    valueType: ValueType.STRING,
                    defaultValue: "云列表"
                }, {
                    key: "value",
                    label: "包含",
                    valueType: ValueType.STRING,
                    defaultValue: "值"
                }
            ],
            valueType: ValueType.BOOLEAN
        }
    ],
    events: [
        {
            key: "onOpen",
            label: "连接打开",
            params: []
        }, {
            key: "onClose",
            label: "连接关闭",
            params: []
        }, {
            key: "onError",
            label: "出现错误",
            params: [
                {
                    key: "message",
                    label: "信息",
                    valueType: ValueType.STRING
                }
            ]
        }, {
            key: "onPublicVariableValueChanged",
            label: "公有云变量值改变",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: ValueType.STRING
                }, {
                    key: "source",
                    label: "来源",
                    valueType: ValueType.STRING
                }, {
                    key: "originalValue",
                    label: "原值",
                    valueType: VariableValueType
                }, {
                    key: "newValue",
                    label: "新值",
                    valueType: VariableValueType
                }
            ]
        }, {
            key: "onOnlineUsersNumberChanged",
            label: "在线用户数改变",
            params: [
                {
                    key: "originalNumber",
                    label: "原数量",
                    valueType: ValueType.NUMBER
                }, {
                    key: "newNumber",
                    label: "新数量",
                    valueType: ValueType.NUMBER
                }
            ]
        }, {
            key: "onListPushed",
            label: "云列表添加到尾项",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: ValueType.STRING
                }, {
                    key: "source",
                    label: "来源",
                    valueType: ValueType.STRING
                }, {
                    key: "item",
                    label: "项",
                    valueType: ListItemValueType
                }
            ]
        }, {
            key: "onListUnshifted",
            label: "云列表添加到首项",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: ValueType.STRING
                }, {
                    key: "source",
                    label: "来源",
                    valueType: ValueType.STRING
                }, {
                    key: "item",
                    label: "项",
                    valueType: ListItemValueType
                }
            ]
        }, {
            key: "onListAdd",
            label: "云列表添加项",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: ValueType.STRING
                }, {
                    key: "source",
                    label: "来源",
                    valueType: ValueType.STRING
                }, {
                    key: "position",
                    label: "位置",
                    valueType: ValueType.STRING
                }, {
                    key: "item",
                    label: "项",
                    valueType: ListItemValueType
                }
            ]
        }, {
            key: "onListPopped",
            label: "云列表移除尾项",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: ValueType.STRING
                }, {
                    key: "source",
                    label: "来源",
                    valueType: ValueType.STRING
                }, {
                    key: "item",
                    label: "项",
                    valueType: ListItemValueType
                }
            ]
        }, {
            key: "onListRemove",
            label: "云列表移除项",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: ValueType.STRING
                }, {
                    key: "source",
                    label: "来源",
                    valueType: ValueType.STRING
                }, {
                    key: "position",
                    label: "位置",
                    valueType: ValueType.STRING
                }, {
                    key: "item",
                    label: "项",
                    valueType: ListItemValueType
                }
            ]
        }, {
            key: "onListEmptied",
            label: "云列表清空",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: ValueType.STRING
                }, {
                    key: "source",
                    label: "来源",
                    valueType: ValueType.STRING
                }, {
                    key: "list",
                    label: "列表",
                    valueType: ValueType.ARRAY
                }
            ]
        }, {
            key: "onListReplacedLast",
            label: "云列表替换尾项",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: ValueType.STRING
                }, {
                    key: "source",
                    label: "来源",
                    valueType: ValueType.STRING
                }, {
                    key: "originalItem",
                    label: "原项",
                    valueType: ListItemValueType
                }, {
                    key: "newItem",
                    label: "新项",
                    valueType: ListItemValueType
                }
            ]
        }, {
            key: "onListReplaced",
            label: "云列表替换项",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: ValueType.STRING
                }, {
                    key: "source",
                    label: "来源",
                    valueType: ValueType.STRING
                }, {
                    key: "position",
                    label: "位置",
                    valueType: ValueType.STRING
                }, {
                    key: "originalItem",
                    label: "原项",
                    valueType: ListItemValueType
                }, {
                    key: "newItem",
                    label: "新项",
                    valueType: ListItemValueType
                }
            ]
        }
    ]
};
(function () {
    var defaultGroup = {
        key: "group",
        label: "未分类",
        color: Color.BLACK,
        callMethodLabel: false
    };
    var group = defaultGroup;
    var original = types.methods;
    types.methods = [];
    var last = other_1.None, isFirst = true;
    for (var _i = 0, original_1 = original; _i < original_1.length; _i++) {
        var method = original_1[_i];
        if (method.key == "group") {
            if (last != other_1.None) {
                last.blockOptions.space = 40;
            }
            group = (0, other_1.merge)(method, defaultGroup);
            isFirst = true;
            continue;
        }
        (0, other_1.merge)(method, {
            blockOptions: {
                color: group.color,
                callMethodLabel: group.callMethodLabel
            }
        });
        if (isFirst) {
            isFirst = false;
            (0, other_1.merge)(method, {
                blockOptions: {
                    line: group.label
                }
            });
        }
        last = method;
        types.methods.push(method);
    }
})();
var userMap = new Map();
userMap.set(0, kitten_cloud_function_1.KittenCloudFunction.user);
function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    else if (Array.isArray(error)) {
        return error.map(getErrorMessage).join("\n");
    }
    else if (typeof error == "string") {
        return error;
    }
    else {
        return JSON.stringify(error);
    }
}
var KittenCloudWidget = /** @class */ (function (_super) {
    __extends(KittenCloudWidget, _super);
    function KittenCloudWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.isOpened = false;
        _this.handleClose = function () {
            _this.connection = other_1.None;
            _this.emit("onClose");
        };
        var _loop_1 = function (method) {
            var original = this_1[method.key];
            if (original == null || !(original instanceof Function)) {
                original = function () {
                    throw new Error("该功能暂未实现");
                };
            }
            var getTaskName = function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var taskName = method.label || (method.valueType == ValueType.BOOLEAN ? "判断" : "获取");
                var _loop_2 = function (i) {
                    var param = method.params[i];
                    if ("label" in param) {
                        taskName += param.label;
                    }
                    if ("dropdown" in param) {
                        var item = (_a = param.dropdown) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.value == args[i]; });
                        taskName += " ".concat(item == null ? args[i] : item.label, " ");
                    }
                    else {
                        taskName += " ".concat(JSON.stringify(args[i]), " ");
                    }
                    if ("labelAfter" in param) {
                        taskName += param.labelAfter;
                    }
                };
                for (var i = 0; i < method.params.length; i++) {
                    _loop_2(i);
                }
                return taskName;
            };
            this_1[method.key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(this, void 0, void 0, function () {
                    var error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, original.apply(this, args)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                error_1 = _a.sent();
                                if (error_1 instanceof Error) {
                                    error_1.message = "".concat(getTaskName.apply(this, args), "\u5931\u8D25\uFF1A").concat(error_1.message);
                                }
                                else {
                                    if (!Array.isArray(error_1) && typeof error_1 != "string") {
                                        error_1 = JSON.stringify(error_1);
                                    }
                                    error_1 = [getTaskName.apply(this, args) + "失败", error_1];
                                }
                                this.error(error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
        };
        var this_1 = this;
        for (var _i = 0, _a = types.methods; _i < _a.length; _i++) {
            var method = _a[_i];
            _loop_1(method);
        }
        return _this;
    }
    KittenCloudWidget.prototype.warn = function (message) {
        this.widgetWarn(message);
    };
    KittenCloudWidget.prototype.error = function (error) {
        var message = getErrorMessage(error);
        if (error instanceof Error) {
            error.message = "".concat(types.title, "\uFF1A").concat(error.message);
        }
        else if (typeof error == "string") {
            error = "".concat(types.title, "\uFF1A").concat(error);
        }
        else {
            error = [types.title, error];
        }
        console.error(error);
        this.widgetError(message);
        this.emit("onError", message);
    };
    KittenCloudWidget.prototype.getConnection = function () {
        if (this.connection == other_1.None) {
            throw new Error("当前未连接，请连接后再试");
        }
        return this.connection;
    };
    KittenCloudWidget.prototype.connect = function (workID) {
        var _this = this;
        if (this.connection != other_1.None) {
            this.close();
            this.warn("上一个连接未断开，已自动断开");
        }
        this.isOpened = false;
        this.connection = new kitten_cloud_function_1.KittenCloudFunction(new codemao_work_1.CodemaoWork({ id: workID }));
        this.connection.publicVariable.getAll().then(function (variableArray) {
            var _loop_3 = function (variable) {
                variable.changed.connect(function (_a) {
                    var source = _a.source, originalValue = _a.originalValue, newValue = _a.newValue;
                    _this.emit("onPublicVariableValueChanged", variable.name, source.name, originalValue, newValue);
                });
            };
            for (var _i = 0, variableArray_1 = variableArray; _i < variableArray_1.length; _i++) {
                var variable = variableArray_1[_i];
                _loop_3(variable);
            }
        });
        this.connection.onlineUserNumber.then(function (onlineUserNumber) {
            onlineUserNumber.changed.connect(function (_a) {
                var originalNumber = _a.originalNumber, newNumber = _a.newNumber;
                _this.emit("onOnlineUsersNumberChanged", originalNumber, newNumber);
            });
        });
        this.connection.list.getAll().then(function (listArray) {
            var _loop_4 = function (list) {
                list.pushed.connect(function (_a) {
                    var source = _a.source, item = _a.item;
                    _this.emit("onListPushed", list.name, source.name, item);
                });
                list.unshifted.connect(function (_a) {
                    var source = _a.source, item = _a.item;
                    _this.emit("onListUnshifted", list.name, source.name, item);
                });
                list.added.connect(function (_a) {
                    var source = _a.source, index = _a.index, item = _a.item;
                    _this.emit("onListAdd", list.name, source.name, index, item);
                });
                list.popped.connect(function (_a) {
                    var source = _a.source, item = _a.item;
                    _this.emit("onListPopped", list.name, source.name, item);
                });
                list.removed.connect(function (_a) {
                    var source = _a.source, index = _a.index, item = _a.item;
                    _this.emit("onListRemove", list.name, source.name, index, item);
                });
                list.emptied.connect(function (_a) {
                    var source = _a.source, listValue = _a.list;
                    _this.emit("onListEmptied", list.name, source.name, listValue);
                });
                list.replacedLast.connect(function (_a) {
                    var source = _a.source, originalItem = _a.originalItem, newItem = _a.newItem;
                    _this.emit("onListReplacedLast", list.name, source.name, originalItem, newItem);
                });
                list.replaced.connect(function (_a) {
                    var source = _a.source, index = _a.index, originalItem = _a.originalItem, newItem = _a.newItem;
                    _this.emit("onListReplaced", list.name, source.name, index, originalItem, newItem);
                });
            };
            for (var _i = 0, listArray_1 = listArray; _i < listArray_1.length; _i++) {
                var list = listArray_1[_i];
                _loop_4(list);
            }
        });
        this.connection.opened.connect(function () {
            _this.isOpened = true;
            _this.emit("onOpen");
        });
        this.connection.errored.connect(function (error) {
            console.log(_this.isOpened);
            if (!_this.isOpened) {
                _this.connection = other_1.None;
            }
            _this.error(error);
        });
        this.connection.closed.connect(this.handleClose);
    };
    KittenCloudWidget.prototype.close = function () {
        var connection = this.getConnection();
        connection.close();
        connection.closed.disconnect(this.handleClose);
        this.connection = other_1.None;
    };
    KittenCloudWidget.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connection != other_1.None];
            });
        });
    };
    KittenCloudWidget.prototype.connectedWorkID = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection().work.info.id];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    KittenCloudWidget.prototype.getConnectionConfigValue = function (type) {
        var connection = this.getConnection();
        switch (type) {
            case "autoReconnectIntervalTime": return connection.autoReconnectIntervalTime.value;
            case "localPreupdate": return connection.localPreupdate.value;
            case "cacheTime": return connection.cacheTime.value;
            case "uploadIntervalTime": return connection.uploadIntervalTime.value;
            case "stringLengthLimit": return connection.stringLengthLimit.value;
            case "listLengthLimit": return connection.listLengthLimit.value;
            default: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u8FDE\u63A5\u914D\u7F6E\u7C7B\u578B\uFF1A".concat(type));
        }
    };
    KittenCloudWidget.prototype.setConnectionConfig = function (type, value) {
        var connection = this.getConnection();
        switch (type) {
            case "autoReconnectIntervalTime":
                connection.autoReconnectIntervalTime.value = value;
                break;
            case "localPreupdate":
                if (typeof value != "boolean") {
                    throw new Error("本地预更新值必须为布尔值");
                }
                connection.localPreupdate.config = value;
                break;
            case "cacheTime":
                connection.cacheTime.config = value;
                break;
            case "uploadIntervalTime":
                connection.uploadIntervalTime.config = value;
                break;
            case "stringLengthLimit":
                if (typeof value != "number") {
                    throw new Error("字符串长度限制值必须为数字");
                }
                connection.stringLengthLimit.config = value;
                break;
            case "listLengthLimit":
                if (typeof value != "number") {
                    throw new Error("列表长度限制值必须为数字");
                }
                connection.listLengthLimit.config = value;
                break;
            default: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u8FDE\u63A5\u914D\u7F6E\u7C7B\u578B\uFF1A".concat(type));
        }
    };
    KittenCloudWidget.prototype.getVariable = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection().get(index)];
                    case 1:
                        data = _a.sent();
                        if (!(data instanceof kitten_cloud_variable_1.KittenCloudVariable)) {
                            throw new Error("".concat(index, " \u4E0D\u662F\u4E91\u53D8\u91CF"));
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    KittenCloudWidget.prototype.getPrivateVariableList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getConnection().privateVariable.getAll().then(function (variableArray) {
                        return variableArray.map(function (variable) {
                            return {
                                "名称": variable.name,
                                "值": variable.value
                            };
                        });
                    })];
            });
        });
    };
    KittenCloudWidget.prototype.getPrivateVariableConfigValue = function (type) {
        var group = this.getConnection().privateVariable;
        switch (type) {
            case "localPreupdate": return group.localPreupdate.value;
            case "cacheTime": return group.cacheTime.value;
            case "uploadIntervalTime": return group.uploadIntervalTime.value;
            case "stringLengthLimit": return group.stringLengthLimit.value;
            default: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u79C1\u6709\u4E91\u53D8\u91CF\u914D\u7F6E\u7C7B\u578B\uFF1A".concat(type));
        }
    };
    KittenCloudWidget.prototype.setPrivateVariableConfig = function (type, value) {
        var group = this.getConnection().privateVariable;
        switch (type) {
            case "localPreupdate":
                if (typeof value != "boolean") {
                    throw new Error("本地预更新值必须为布尔值");
                }
                group.localPreupdate.config = value;
                break;
            case "cacheTime":
                group.cacheTime.config = value;
                break;
            case "uploadIntervalTime":
                group.uploadIntervalTime.config = value;
                break;
            case "stringLengthLimit":
                if (typeof value != "number") {
                    throw new Error("字符串长度限制值必须为数字");
                }
                group.stringLengthLimit.config = value;
                break;
            default: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u79C1\u6709\u4E91\u53D8\u91CF\u914D\u7F6E\u7C7B\u578B\uFF1A".concat(type));
        }
    };
    KittenCloudWidget.prototype.getPublicVariableList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getConnection().publicVariable.getAll().then(function (variableArray) {
                        return variableArray.map(function (variable) {
                            return {
                                "名称": variable.name,
                                "值": variable.value
                            };
                        });
                    })];
            });
        });
    };
    KittenCloudWidget.prototype.getPublicVariableConfigValue = function (type) {
        var group = this.getConnection().publicVariable;
        switch (type) {
            case "localPreupdate": return group.localPreupdate.value;
            case "cacheTime": return group.cacheTime.value;
            case "uploadIntervalTime": return group.uploadIntervalTime.value;
            case "stringLengthLimit": return group.stringLengthLimit.value;
            default: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u516C\u6709\u4E91\u53D8\u91CF\u914D\u7F6E\u7C7B\u578B\uFF1A".concat(type));
        }
    };
    KittenCloudWidget.prototype.setPublicVariableConfig = function (type, value) {
        var group = this.getConnection().publicVariable;
        switch (type) {
            case "localPreupdate":
                if (typeof value != "boolean") {
                    throw new Error("本地预更新值必须为布尔值");
                }
                group.localPreupdate.config = value;
                break;
            case "cacheTime":
                group.cacheTime.config = value;
                break;
            case "uploadIntervalTime":
                group.uploadIntervalTime.config = value;
                break;
            case "stringLengthLimit":
                if (typeof value != "number") {
                    throw new Error("字符串长度限制值必须为数字");
                }
                group.stringLengthLimit.config = value;
                break;
            default: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u516C\u6709\u4E91\u53D8\u91CF\u914D\u7F6E\u7C7B\u578B\uFF1A".concat(type));
        }
    };
    KittenCloudWidget.prototype.variableGet = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVariable(name)];
                    case 1: return [2 /*return*/, (_a.sent()).get()];
                }
            });
        });
    };
    KittenCloudWidget.prototype.variableSet = function (name, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVariable(name)];
                    case 1:
                        (_a.sent()).set(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    KittenCloudWidget.prototype.getRankingList = function (name, limit, order) {
        return __awaiter(this, void 0, void 0, function () {
            var variable, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getVariable(name)];
                    case 1:
                        variable = _c.sent();
                        if (!(variable instanceof kitten_cloud_private_variable_1.KittenCloudPrivateVariable)) {
                            throw new Error("".concat(name, " \u4E0D\u662F\u79C1\u6709\u4E91\u53D8\u91CF"));
                        }
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, variable.getRankingList(limit, parseInt(order))];
                    case 2: return [2 /*return*/, _b.apply(_a, [(_c.sent()).map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, _c;
                                var _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            _b = (_a = userMap).set;
                                            return [4 /*yield*/, item.user.info.id];
                                        case 1:
                                            _b.apply(_a, [_e.sent(), item.user]);
                                            _d = { "值": item.value };
                                            _c = "用户";
                                            return [4 /*yield*/, item.user.info.id];
                                        case 2: return [2 /*return*/, (_d[_c] = _e.sent(), _d)];
                                    }
                                });
                            }); })])];
                }
            });
        });
    };
    KittenCloudWidget.prototype.isUserLogged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, kitten_cloud_function_1.KittenCloudFunction.user.info.id];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    KittenCloudWidget.prototype.getUserInfo = function (userID, type) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = userMap.get(userID);
                        if (user == other_1.None) {
                            user = new codemao_user_1.CodemaoUser({ id: userID });
                            userMap.set(userID, user);
                        }
                        _a = type;
                        switch (_a) {
                            case "id": return [3 /*break*/, 1];
                            case "username": return [3 /*break*/, 3];
                            case "nickname": return [3 /*break*/, 5];
                            case "realname": return [3 /*break*/, 7];
                            case "avatarURL": return [3 /*break*/, 9];
                            case "coverURL": return [3 /*break*/, 11];
                            case "description": return [3 /*break*/, 13];
                            case "doing": return [3 /*break*/, 15];
                            case "email": return [3 /*break*/, 17];
                            case "level": return [3 /*break*/, 19];
                            case "grade": return [3 /*break*/, 21];
                            case "birthday": return [3 /*break*/, 23];
                            case "sex": return [3 /*break*/, 25];
                            case "viewTimes": return [3 /*break*/, 27];
                            case "praiseTimes": return [3 /*break*/, 29];
                            case "collectTimes": return [3 /*break*/, 31];
                            case "forkTimes": return [3 /*break*/, 33];
                        }
                        return [3 /*break*/, 35];
                    case 1: return [4 /*yield*/, user.info.id];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, user.info.username];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, user.info.nickname];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: return [4 /*yield*/, user.info.realname];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9: return [4 /*yield*/, user.info.avatarURL];
                    case 10: return [2 /*return*/, _b.sent()];
                    case 11: return [4 /*yield*/, user.info.coverURL];
                    case 12: return [2 /*return*/, _b.sent()];
                    case 13: return [4 /*yield*/, user.info.description];
                    case 14: return [2 /*return*/, _b.sent()];
                    case 15: return [4 /*yield*/, user.info.doing];
                    case 16: return [2 /*return*/, _b.sent()];
                    case 17: return [4 /*yield*/, user.info.email];
                    case 18: return [2 /*return*/, _b.sent()];
                    case 19: return [4 /*yield*/, user.info.level];
                    case 20: return [2 /*return*/, _b.sent()];
                    case 21: return [4 /*yield*/, user.info.grade];
                    case 22: return [2 /*return*/, _b.sent()];
                    case 23: return [4 /*yield*/, user.info.birthday];
                    case 24: return [2 /*return*/, (_b.sent()).toLocaleString()];
                    case 25: return [4 /*yield*/, user.info.sex];
                    case 26: return [2 /*return*/, (_b.sent()).name];
                    case 27: return [4 /*yield*/, user.info.viewTimes];
                    case 28: return [2 /*return*/, _b.sent()];
                    case 29: return [4 /*yield*/, user.info.praiseTimes];
                    case 30: return [2 /*return*/, _b.sent()];
                    case 31: return [4 /*yield*/, user.info.collectTimes];
                    case 32: return [2 /*return*/, _b.sent()];
                    case 33: return [4 /*yield*/, user.info.forkTimes];
                    case 34: return [2 /*return*/, _b.sent()];
                    case 35: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u7528\u6237\u4FE1\u606F\u7C7B\u578B\uFF1A".concat(type));
                }
            });
        });
    };
    KittenCloudWidget.prototype.getOnlineUsersNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection().onlineUserNumber];
                    case 1: return [2 /*return*/, (_a.sent()).value];
                }
            });
        });
    };
    KittenCloudWidget.prototype.getList = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection().get(index)];
                    case 1:
                        data = _a.sent();
                        if (!(data instanceof kitten_cloud_list_1.KittenCloudList)) {
                            throw new Error("".concat(index, " \u4E0D\u662F\u4E91\u5217\u8868"));
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    KittenCloudWidget.prototype.getListConfigValue = function (type) {
        var group = this.getConnection().list;
        switch (type) {
            case "localPreupdate": return group.localPreupdate.value;
            case "cacheTime": return group.cacheTime.value;
            case "uploadIntervalTime": return group.uploadIntervalTime.value;
            case "stringLengthLimit": return group.stringLengthLimit.value;
            case "listLengthLimit": return group.listLengthLimit.value;
            default: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u5217\u8868\u914D\u7F6E\u7C7B\u578B\uFF1A".concat(type));
        }
    };
    KittenCloudWidget.prototype.setListConfig = function (type, value) {
        var group = this.getConnection().list;
        switch (type) {
            case "localPreupdate":
                if (typeof value != "boolean") {
                    throw new Error("本地预更新值必须为布尔值");
                }
                group.localPreupdate.config = value;
                break;
            case "cacheTime":
                group.cacheTime.config = value;
                break;
            case "uploadIntervalTime":
                group.uploadIntervalTime.config = value;
                break;
            case "stringLengthLimit":
                if (typeof value != "number") {
                    throw new Error("字符串长度限制值必须为数字");
                }
                group.stringLengthLimit.config = value;
                break;
            case "listLengthLimit":
                if (typeof value != "number") {
                    throw new Error("列表长度限制值必须为数字");
                }
                group.listLengthLimit.config = value;
                break;
            default: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u5217\u8868\u914D\u7F6E\u7C7B\u578B\uFF1A".concat(type));
        }
    };
    KittenCloudWidget.prototype.listIndex = function (list, indexingMode, index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (indexingMode) {
                    case "forward": return [2 /*return*/, index - 1];
                    case "backward": return [2 /*return*/, list.length - index];
                    default: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u7D22\u5F15\u6A21\u5F0F\uFF1A".concat(indexingMode));
                }
                return [2 /*return*/];
            });
        });
    };
    KittenCloudWidget.prototype.getListList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getConnection().list.getAll().then(function (listArray) {
                        return listArray.map(function (list) {
                            return {
                                "名称": list.name,
                                "值": list.copy()
                            };
                        });
                    })];
            });
        });
    };
    KittenCloudWidget.prototype.getListCopy = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getList(name)];
                    case 1: return [2 /*return*/, (_a.sent()).copy()];
                }
            });
        });
    };
    KittenCloudWidget.prototype.listAppend = function (value, name, position) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = position;
                        switch (_a) {
                            case "head": return [3 /*break*/, 1];
                            case "tail": return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.getList(name)];
                    case 2:
                        (_b.sent()).push(value);
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.getList(name)];
                    case 4:
                        (_b.sent()).unshift(value);
                        return [3 /*break*/, 6];
                    case 5: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u4F4D\u7F6E\uFF1A".concat(position));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    KittenCloudWidget.prototype.listAdd = function (value, name, indexingMode, index) {
        return __awaiter(this, void 0, void 0, function () {
            var list, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getList(name)];
                    case 1:
                        list = _c.sent();
                        _b = (_a = list).add;
                        return [4 /*yield*/, this.listIndex(list, indexingMode, index)];
                    case 2:
                        _b.apply(_a, [_c.sent(), value]);
                        return [2 /*return*/];
                }
            });
        });
    };
    KittenCloudWidget.prototype.listRemove = function (name, indexingMode, index) {
        return __awaiter(this, void 0, void 0, function () {
            var list, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getList(name)];
                    case 1:
                        list = _c.sent();
                        if (!(indexingMode == "backward" && index == 1)) return [3 /*break*/, 2];
                        list.pop();
                        return [3 /*break*/, 4];
                    case 2:
                        _b = (_a = list).remove;
                        return [4 /*yield*/, this.listIndex(list, indexingMode, index)];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    KittenCloudWidget.prototype.listEmpty = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getList(name)];
                    case 1:
                        (_a.sent()).empty();
                        return [2 /*return*/];
                }
            });
        });
    };
    KittenCloudWidget.prototype.listReplace = function (name, indexingMode, index, value) {
        return __awaiter(this, void 0, void 0, function () {
            var list, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getList(name)];
                    case 1:
                        list = _c.sent();
                        if (!(indexingMode == "backward" && index == 1)) return [3 /*break*/, 2];
                        list.replaceLast(value);
                        return [3 /*break*/, 4];
                    case 2:
                        _b = (_a = list).replace;
                        return [4 /*yield*/, this.listIndex(list, indexingMode, index)];
                    case 3:
                        _b.apply(_a, [_c.sent(), value]);
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    KittenCloudWidget.prototype.listCopy = function (list1, list2name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof list1 == "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getList(list1)];
                    case 1:
                        list1 = (_a.sent()).value;
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.getList(list2name)];
                    case 3:
                        (_a.sent()).copyFrom(list1);
                        return [2 /*return*/];
                }
            });
        });
    };
    KittenCloudWidget.prototype.listGet = function (name, indexingMode, index) {
        return __awaiter(this, void 0, void 0, function () {
            var list, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.getList(name)];
                    case 1:
                        list = _d.sent();
                        _b = (_a = list).get;
                        return [4 /*yield*/, this.listIndex(list, indexingMode, index)];
                    case 2: return [2 /*return*/, (_c = _b.apply(_a, [_d.sent()])) !== null && _c !== void 0 ? _c : 0];
                }
            });
        });
    };
    KittenCloudWidget.prototype.listLength = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getList(name)];
                    case 1: return [2 /*return*/, (_a.sent()).length];
                }
            });
        });
    };
    KittenCloudWidget.prototype.listFind = function (name, countingMode, count, value) {
        return __awaiter(this, void 0, void 0, function () {
            var list, nowCount0, i, nowCount1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getList(name)];
                    case 1:
                        list = _a.sent();
                        switch (countingMode) {
                            case "forward":
                                nowCount0 = 0;
                                for (i = 0; i < list.length; i++) {
                                    if (list.get(i) == value) {
                                        nowCount0++;
                                        if (nowCount0 == count) {
                                            return [2 /*return*/, i + 1];
                                        }
                                    }
                                }
                                return [2 /*return*/, 0];
                            case "backward":
                                nowCount1 = 0;
                                for (i = list.length - 1; i >= 0; i--) {
                                    if (list.get(i) == value) {
                                        nowCount1++;
                                        if (nowCount1 == count) {
                                            return [2 /*return*/, i + 1];
                                        }
                                    }
                                }
                                return [2 /*return*/, 0];
                            default: throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u8BA1\u6570\u6A21\u5F0F\uFF1A".concat(countingMode));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    KittenCloudWidget.prototype.listContain = function (name, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getList(name)];
                    case 1: return [2 /*return*/, (_a.sent()).includes(value)];
                }
            });
        });
    };
    return KittenCloudWidget;
}(InvisibleWidget));
exports.types = types;
exports.widget = KittenCloudWidget;
