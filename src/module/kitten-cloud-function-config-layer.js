"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KittenCloudFunctionConfigLayer = void 0;
var other_1 = require("../utils/other");
var single_config_1 = require("../utils/single-config");
/**
 * 源码云功能的配置层，用于管理源码云功能的配置项。
 */
var KittenCloudFunctionConfigLayer = /** @class */ (function () {
    function KittenCloudFunctionConfigLayer(upper, _a) {
        if (upper === void 0) { upper = other_1.None; }
        var _b = _a === void 0 ? {} : _a, localPreupdate = _b.localPreupdate, cacheTime = _b.cacheTime, updateIntervalTime = _b.updateIntervalTime, stringLengthLimit = _b.stringLengthLimit, listLengthLimit = _b.listLengthLimit;
        var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        this.localPreupdate = new single_config_1.SingleConfig((_d = (_c = upper === null || upper === void 0 ? void 0 : upper.localPreupdate) !== null && _c !== void 0 ? _c : localPreupdate) !== null && _d !== void 0 ? _d : true, localPreupdate);
        this.cacheTime = new single_config_1.SingleConfig((_f = (_e = upper === null || upper === void 0 ? void 0 : upper.cacheTime) !== null && _e !== void 0 ? _e : cacheTime) !== null && _f !== void 0 ? _f : 0, cacheTime);
        this.uploadIntervalTime = new single_config_1.SingleConfig((_h = (_g = upper === null || upper === void 0 ? void 0 : upper.uploadIntervalTime) !== null && _g !== void 0 ? _g : updateIntervalTime) !== null && _h !== void 0 ? _h : 0, updateIntervalTime);
        this.stringLengthLimit = new single_config_1.SingleConfig((_k = (_j = upper === null || upper === void 0 ? void 0 : upper.stringLengthLimit) !== null && _j !== void 0 ? _j : stringLengthLimit) !== null && _k !== void 0 ? _k : 1024, stringLengthLimit);
        this.listLengthLimit = new single_config_1.SingleConfig((_m = (_l = upper === null || upper === void 0 ? void 0 : upper.listLengthLimit) !== null && _l !== void 0 ? _l : listLengthLimit) !== null && _m !== void 0 ? _m : 1000, listLengthLimit);
    }
    return KittenCloudFunctionConfigLayer;
}());
exports.KittenCloudFunctionConfigLayer = KittenCloudFunctionConfigLayer;
