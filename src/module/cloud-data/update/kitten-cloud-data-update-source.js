"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KittenCloudDataUpdateSource = void 0;
/** 更新来源。*/ var KittenCloudDataUpdateSource = /** @class */ (function () {
    function KittenCloudDataUpdateSource(name) {
        this.name = name;
        this.symbol = Symbol(name);
    }
    KittenCloudDataUpdateSource.prototype.toString = function () {
        return this.name;
    };
    /** 更新来源于本地。*/ KittenCloudDataUpdateSource.LOCAL = new KittenCloudDataUpdateSource("本地");
    /** 更新来源于云端。*/ KittenCloudDataUpdateSource.CLOUD = new KittenCloudDataUpdateSource("云端");
    /** 更新来源于撤销。*/ KittenCloudDataUpdateSource.REVOKE = new KittenCloudDataUpdateSource("撤销");
    return KittenCloudDataUpdateSource;
}());
exports.KittenCloudDataUpdateSource = KittenCloudDataUpdateSource;
