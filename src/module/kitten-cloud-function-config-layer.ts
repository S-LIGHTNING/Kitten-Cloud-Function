import { None } from "../utils/other"
import { SingleConfig } from "../utils/single-config"

export type LocalPreupdate = boolean
export type CacheTime = number | boolean
export type UploadIntervalTime = number | boolean
export type ConfigObject = {
    localPreupdate?: LocalPreupdate,
    cacheTime?: CacheTime,
    updateIntervalTime?: UploadIntervalTime,
    stringLengthLimit?: number,
    listLengthLimit?: number
}

/**
 * 源码云功能的配置层，用于管理源码云功能的配置项。
 */
export abstract class KittenCloudFunctionConfigLayer {

    /**
     * 本地预更新。
     *
     * 在没有开启本地预更新时，每次在本地执行数据更新操作时，都会等到该操作同步到云端并收到来自服务器的反馈后再更新本地的数据，这与普通的变量在修改后立即更新其值并不相同。
     *
     * 开启本地预更新后，本地执行数据更新操作时，会假定该操作同步到云端之前没有其它用户对该数据进行操作，并基于此提前更新本地的数据，如果假定不成立，则会修正本地数据。具体而言，本地执行数据更新操作时，会立即更新本地的数据，如果在当前操作被同步到云端之前收到了来自服务器的反馈的其它更新数据，则会撤销本地对数据的更改，并执行来自云端的更改，最后再执行本地对数据的更改。
     *
     * 默认值：对于云变量开启，对于云列表关闭。
     */
    public readonly localPreupdate: SingleConfig<LocalPreupdate>
    /**
     * 缓存时间（毫秒），填 `false` 表示绝对关闭。
     *
     * 默认值：`0`
     */
    public readonly cacheTime: SingleConfig<CacheTime>
    /**
     * 上传间隔时间（毫秒），填 `false` 表示绝对关闭。
     *
     * 默认值：对于私有云变量为 `1500`，对于其它为 `0`。
     *
     * @warning 私有云变量的上传间隔时间必须不少于 1500 毫秒。
     */
    public readonly uploadIntervalTime: SingleConfig<UploadIntervalTime>

    /**
     * 字符串长度限制，字符串量的长度不能超过此限制，超出部分会被丢弃。
     *
     * 默认值：`1024`。
     *
     * @warning 字符串长度限制必须不大于 1024.
     */
    public readonly stringLengthLimit: SingleConfig<number>
    /**
     * 列表长度限制，列表的长度不能超过此限制，超出部分会被丢弃。
     *
     * 默认值：1000。
     *
     * @warning 列表长度限制必须不大于 1000
     */
    public readonly listLengthLimit: SingleConfig<number>

    public constructor(upper: KittenCloudFunctionConfigLayer | None = None, {
        localPreupdate, cacheTime, updateIntervalTime, stringLengthLimit, listLengthLimit
    }: ConfigObject = {}) {
        this.localPreupdate = new SingleConfig<LocalPreupdate>(upper?.localPreupdate ?? localPreupdate ?? true, localPreupdate)
        this.cacheTime = new SingleConfig<CacheTime>(upper?.cacheTime ?? cacheTime ?? 0, cacheTime)
        this.uploadIntervalTime = new SingleConfig<UploadIntervalTime>(upper?.uploadIntervalTime ?? updateIntervalTime ?? 0, updateIntervalTime)

        this.stringLengthLimit = new SingleConfig<number>(upper?.stringLengthLimit ?? stringLengthLimit ?? 1024, stringLengthLimit)
        this.listLengthLimit = new SingleConfig<number>(upper?.listLengthLimit ?? listLengthLimit ?? 1000, listLengthLimit)
    }
}
