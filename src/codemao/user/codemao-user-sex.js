"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodemaoUserSex = void 0;
/** 用户性别。*/ var CodemaoUserSex = /** @class */ (function () {
    function CodemaoUserSex(name) {
        this.name = name;
        this.symbol = Symbol(name);
    }
    CodemaoUserSex.from = function (argument) {
        if (argument instanceof CodemaoUserSex) {
            return argument;
        }
        return CodemaoUserSex.parse(argument);
    };
    CodemaoUserSex.parse = function (type) {
        if (typeof type == "number") {
            type = type.toString();
        }
        type = type.toUpperCase();
        if (!(type in typeMap)) {
            throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u7528\u6237\u6027\u522B\uFF1A".concat(type));
        }
        return typeMap[type];
    };
    CodemaoUserSex.prototype.toString = function () {
        return this.name;
    };
    /** 用户为男性。*/ CodemaoUserSex.MALE = new CodemaoUserSex("男");
    /** 用户为女性。*/ CodemaoUserSex.FEMALE = new CodemaoUserSex("女");
    return CodemaoUserSex;
}());
exports.CodemaoUserSex = CodemaoUserSex;
var typeMap = {
    "1": CodemaoUserSex.MALE,
    "MALE": CodemaoUserSex.MALE,
    "0": CodemaoUserSex.FEMALE,
    "FEMALE": CodemaoUserSex.FEMALE
};
