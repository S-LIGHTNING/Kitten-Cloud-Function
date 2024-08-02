import { CodemaoUserInfo, CodemaoUserInfoObject } from "./codemao-user-info"

/**
 * 编程猫用户。
 */
export class CodemaoUser {

    /**
     * 用户信息，详见{@link CodemaoUserInfo}。
     */
    public info: CodemaoUserInfo

    /**
     * @param info 已知用户信息。
     */
    public constructor(info: CodemaoUserInfoObject = {}) {
        this.info = new CodemaoUserInfo(info)
    }
}
