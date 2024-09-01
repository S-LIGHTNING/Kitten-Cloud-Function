"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodemaoWork = void 0;
var codemao_work_info_1 = require("./codemao-work-info");
/**
 * 编程猫作品。
 */
var CodemaoWork = /** @class */ (function () {
    /**
     * @param info 已知作品信息。
     */
    function CodemaoWork(info) {
        this.info = new codemao_work_info_1.CodemaoWorkInfo(info);
    }
    return CodemaoWork;
}());
exports.CodemaoWork = CodemaoWork;
