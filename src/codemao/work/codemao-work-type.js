"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodemaoWorkType = void 0;
/** 作品类型。*/ var CodemaoWorkType = /** @class */ (function () {
    function CodemaoWorkType(name) {
        this.name = name;
        this.symbol = Symbol(name);
    }
    CodemaoWorkType.from = function (argument) {
        if (argument instanceof CodemaoWorkType) {
            return argument;
        }
        return CodemaoWorkType.parse(argument);
    };
    CodemaoWorkType.parse = function (type) {
        type = type.toUpperCase();
        if (!(type in typeMap)) {
            throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u4F5C\u54C1\u7C7B\u578B\uFF1A".concat(type));
        }
        return typeMap[type];
    };
    CodemaoWorkType.prototype.toString = function () {
        return this.name;
    };
    /** 作品使用 NEMO 创作。*/ CodemaoWorkType.NEMO = new CodemaoWorkType("NEMO");
    /** 作品使用 KITTEN 创作。*/ CodemaoWorkType.KITTEN = new CodemaoWorkType("KITTEN");
    return CodemaoWorkType;
}());
exports.CodemaoWorkType = CodemaoWorkType;
var typeMap = {
    "NEMO": CodemaoWorkType.NEMO,
    "KITTEN": CodemaoWorkType.KITTEN,
    "KITTEN2": CodemaoWorkType.KITTEN,
    "KITTEN3": CodemaoWorkType.KITTEN,
    "KITTEN4": CodemaoWorkType.KITTEN
};
