"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodemaoUser = void 0;
var codemao_user_info_1 = require("./codemao-user-info");
/**
 * 编程猫用户。
 */
var CodemaoUser = /** @class */ (function () {
    /**
     * @param info 已知用户信息。
     */
    function CodemaoUser(info) {
        if (info === void 0) { info = {}; }
        this.info = new codemao_user_info_1.CodemaoUserInfo(info);
    }
    return CodemaoUser;
}());
exports.CodemaoUser = CodemaoUser;
