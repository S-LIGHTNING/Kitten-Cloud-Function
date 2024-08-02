import { CodemaoWorkInfo, CodemaoWorkInfoObject } from "./codemao-work-info"

/**
 * 编程猫作品。
 */
export class CodemaoWork {

    /**
     * 作品信息，详见{@link CodemaoWorkInfo}。
     */
    public info: CodemaoWorkInfo

    /**
     * @param info 已知作品信息。
     */
    public constructor(info: CodemaoWorkInfoObject) {
        this.info = new CodemaoWorkInfo(info)
    }
}
