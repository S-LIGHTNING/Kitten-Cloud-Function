import { None } from "../../utils/other"
import { getKittenWorkPublicResource, getNemoWorkPublicResource, getWorkDetail, getWorkInfo } from "../codemao-community-api"
import { CodemaoWorkType } from "./codemao-work-type"

/**
 * 作品信息对象。
 */
export type CodemaoWorkInfoObject = {
    id?: number,
    name?: string,
    type?: CodemaoWorkType,
    description?: string,
    operationInstruction?: string,
    publishTime?: Date,
    playerURL?: string,
    shareURL?: string,
    coverURL?: string,
    previewURL?: string,
    viewTimes?: number,
    likeTimes?: number,
    collectTimes?: number,
    shareTimes?: number,
    commentTimes?: number,
    openResource?: boolean
}

type WorkInfoObject = Required<CodemaoWorkInfoObject>

type WorkDetailObject = Pick<Required<CodemaoWorkInfoObject>,
    "id" |
    "name" |
    "description" |
    "publishTime" |
    "shareURL" |
    "previewURL" |
    "viewTimes" |
    "likeTimes" |
    "collectTimes" |
    "openResource"
>

type NemoPublicResourceObject = Pick<Required<CodemaoWorkInfoObject>,
    "id" |
    "name" |
    "type" |
    "coverURL" |
    "previewURL" |
    "viewTimes" |
    "likeTimes"
>

type KittenPublicResourceObject = Pick<Required<CodemaoWorkInfoObject>,
    "name" |
    "type" |
    "publishTime"
>

/**
 * ## 编程猫作品信息类
 *
 * - 用于获取编程猫作品信息。
 * - 所有属性均为`Promise`对象，当属性获取失败时访问该属性的值会被拒绝。
 *
 * 提供的作品信息详见类属性
 *
 * ### 具有以下特性：
 * - 集成多个API接口，以确保在部分API接口信息获取失败时仍能提供尽可能完整的作品信息。
 * - 内置懒加载和缓存机制，以减少不必要的请求。
 *
 * ### 集成API接口
 *
 * #### 已经集成的API接口
 * - {@link getWorkInfo}
 * - {@link getWorkDetail}
 * - {@link getNemoWorkPublicResource}
 * - {@link getKittenWorkPublicResource}
 *
 * #### 将来可能集成的API接口：
 * - {@link searchWorkByName}
 *
 * #### API优先级：
 * - 优先使用 {@link getWorkInfo} 接口获取作品信息，该接口包含了作品的全部信息，但是容易出错。
 * - 如果 {@link getWorkInfo} 接口获取失败，则使用 {@link getWorkDetail} 接口获取作品的大部分信息。
 * - 如果 {@link getWorkDetail} 接口获取失败，则使用 {@link getNemoWorkPublicResource} 和 {@link getKittenWorkPublicResource} 接口获取作品的少部分信息。
 * - 如果所有接口都获取失败，则抛出异常，对应属性的值会被拒绝。
 */
export class CodemaoWorkInfo {

    private _workInfo: Promise<WorkInfoObject> | None = None
    private _workDetail: Promise<WorkDetailObject> | None = None
    private _nemoPublicResource: Promise<NemoPublicResourceObject> | None = None
    private _kittenPublicResource: Promise<KittenPublicResourceObject> | None = None

    private get workInfo(): Promise<WorkInfoObject> {
        return (async (): Promise<WorkInfoObject> => {
            if (this._workInfo == null) {
                this._workInfo = (async (): Promise<WorkInfoObject> => {
                    const workInfo = await getWorkInfo(await this.id)
                    return {
                        id: workInfo.id,
                        name: workInfo.work_name,
                        type: CodemaoWorkType.parse(workInfo.type),
                        description: workInfo.description,
                        operationInstruction: workInfo.operation,
                        publishTime: new Date(workInfo.publish_time * 1000),
                        playerURL: workInfo.player_url,
                        shareURL: workInfo.share_url,
                        coverURL: workInfo.preview,
                        previewURL: workInfo.screenshot_cover_url,
                        viewTimes: workInfo.view_times,
                        likeTimes: workInfo.praise_times,
                        collectTimes: workInfo.collect_times,
                        shareTimes: workInfo.share_times,
                        commentTimes: workInfo.comment_times,
                        openResource: workInfo.fork_enable
                    }
                })()
                this.set(await this._workInfo)
            }
            return await this._workInfo
        })()
    }

    private get workDetail(): Promise<WorkDetailObject> {
        return (async(): Promise<WorkDetailObject> => {
            if (this._workDetail == null) {
                this._workDetail = (async (): Promise<WorkDetailObject> => {
                    const { workInfo, qrcodeUrl, allowFork } = await getWorkDetail(await this.id)
                    return {
                        id: workInfo.id,
                        name: workInfo.name,
                        description: workInfo.description,
                        publishTime: new Date(workInfo.publish_time * 1000),
                        shareURL: qrcodeUrl,
                        previewURL: workInfo.preview,
                        viewTimes: workInfo.view_times,
                        likeTimes: workInfo.praise_times,
                        collectTimes: workInfo.collection_times,
                        openResource: Boolean(allowFork)
                    }
                })()
                this.set(await this._workDetail)
            }
            return await this._workDetail
        })()
    }

    private get nemoWorkPublicResource(): Promise<NemoPublicResourceObject> {
        return (async(): Promise<NemoPublicResourceObject> => {
            if (this._nemoPublicResource == null) {
                this._nemoPublicResource = (async (): Promise<NemoPublicResourceObject> => {
                    const source = await getNemoWorkPublicResource(await this.id)
                    return {
                        id: source.work_id,
                        name: source.name,
                        type: CodemaoWorkType.NEMO,
                        coverURL: source.preview,
                        previewURL: source.preview,
                        viewTimes: source.view_times,
                        likeTimes: source.n_likes
                    }
                })()
                this.set(await this._nemoPublicResource)
            }
            return await this._nemoPublicResource
        })()
    }

    private get kittenWorkPublicResource(): Promise<KittenPublicResourceObject> {
        return (async(): Promise<KittenPublicResourceObject> => {
            if (this._kittenPublicResource == null) {
                this._kittenPublicResource = (async (): Promise<KittenPublicResourceObject> => {
                    const source = await getKittenWorkPublicResource(await this.id)
                    return {
                        name: source.name,
                        type: CodemaoWorkType.KITTEN,
                        publishTime: new Date(source.updated_time * 1000)
                    }
                })()
                this.set(await this._kittenPublicResource)
            }
            return await this._kittenPublicResource
        })()
    }

    private _id: Promise<number> | None = None
    private _name: Promise<string> | None = None
    private _type: Promise<CodemaoWorkType> | None = None
    private _description: Promise<string> | None = None
    private _operationInstruction: Promise<string> | None = None
    private _publishTime: Promise<Date> | None = None
    private _playerURL: Promise<string> | None = None
    private _shareURL: Promise<string> | None = None
    private _coverURL: Promise<string> | None = None
    private _previewURL: Promise<string> | None = None
    private _viewTimes: Promise<number> | None = None
    private _likeTimes: Promise<number> | None = None
    private _collectTimes: Promise<number> | None = None
    private _shareTimes: Promise<number> | None = None
    private _commentTimes: Promise<number> | None = None
    private _openResource: Promise<boolean> | None = None

    /**
     * 作品 ID。
     */
    public get id(): Promise<number> {
        if (this._id == null) {
            this._id = Promise.reject(new Error("没有提供ID"))
        }
        return this._id
    }

    /**
     * 作品名称。
     */
    public get name(): Promise<string> {
        if (this._name == null) {
            this._name = Promise.any([
                Promise.reject(new Error("没有提供名称")),
                this.workInfo
                    .catch((getWorkInfoError) =>
                        this.workDetail.catch((getWorkDetailError) =>
                            Promise.reject([getWorkInfoError, getWorkDetailError])
                        )
                    ).catch((error0) =>
                        Promise.any([
                            this.nemoWorkPublicResource,
                            this.kittenWorkPublicResource
                        ]).catch((error1) =>
                            Promise.reject([...error0, ...error1.errors])
                        )
                    ).then((info) => info.name)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._name
    }

    /**
     * 作品类型，详见 {@link CodemaoWorkType}。
     */
    public get type(): Promise<CodemaoWorkType> {
        if (this._type == null) {
            this._type = Promise.any([
                Promise.reject(new Error("没有提供类型")),
                this.workInfo
                    .catch((error0) =>
                        Promise.any([
                            this.nemoWorkPublicResource,
                            this.kittenWorkPublicResource
                        ]).catch((error1) =>
                            Promise.reject([error0, ...error1.errors])
                        )
                    ).then((info) => info.type)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._type
    }

    /**
     * 作品描述。
     */
    public get description(): Promise<string> {
        if (this._description == null) {
            this._description = Promise.any([
                Promise.reject(new Error("没有提供描述")),
                this.workInfo
                    .catch((error0) =>
                        this.workDetail.catch((error1) =>
                            Promise.reject([error0, error1])
                        )
                    ).then((info) => info.description)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._description
    }

    /**
     * 作品操作说明。
     */
    public get operationInstruction(): Promise<string> {
        if (this._operationInstruction == null) {
            this._operationInstruction = Promise.any([
                Promise.reject(new Error("没有提供操作说明")),
                this.workInfo.then((info) => info.operationInstruction)
            ]).catch(({ errors }) => Promise.reject(errors))
        }
        return this._operationInstruction
    }

    /**
     * 作品发布时间。
     */
    public get publishTime(): Promise<Date> {
        if (this._publishTime == null) {
            this._publishTime = Promise.any([
                Promise.reject(new Error("没有提供发布时间")),
                this.workInfo
                    .catch((error0) =>
                        this.kittenWorkPublicResource
                            .catch((error1) =>
                                Promise.reject([error0, error1])
                            )
                    ).then((info) => info.publishTime)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._publishTime
    }

    /**
     * 作品运行器（即 Player）地址。
     */
    public get playerURL(): Promise<string> {
        if (this._playerURL == null) {
            this._playerURL = Promise.any([
                Promise.reject(new Error("没有提供运行器地址")),
                this.workInfo.then((info) => info.playerURL)
            ]).catch(({ errors }) => Promise.reject(errors))
        }
        return this._playerURL
    }

    /**
     * 作品分享地址。
     */
    public get shareURL(): Promise<string> {
        if (this._shareURL == null) {
            this._shareURL = Promise.any([
                Promise.reject(new Error("没有提供分享地址")),
                this.workInfo
                    .catch((error0) =>
                        this.workDetail.catch((error1) =>
                            Promise.reject([error0, error1])
                        )
                    ).then((info) => info.shareURL)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._shareURL
    }

    /**
     * 作品封面地址。
     */
    public get coverURL(): Promise<string> {
        if (this._coverURL == null) {
            this._coverURL = Promise.any([
                Promise.reject(new Error("没有提供封面地址")),
                this.workInfo
                    .catch((error0) =>
                        this.nemoWorkPublicResource
                            .catch((error1) =>
                                Promise.reject([error0, error1])
                            )
                    ).then((info) => info.coverURL)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._coverURL
    }

    /**
     * 作品预览地址。
     */
    public get previewURL(): Promise<string> {
        if (this._previewURL == null) {
            this._previewURL = Promise.any([
                Promise.reject(new Error("没有提供预览地址")),
                this.workInfo
                    .catch((error0) =>
                        this.workDetail.catch((error1) =>
                            Promise.reject([error0, error1])
                        )
                    ).catch((error0) =>
                        this.nemoWorkPublicResource
                            .catch((error1) =>
                                Promise.reject([...error0, error1])
                            )
                    ).then((info) => info.previewURL)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._previewURL
    }

    /**
     * 作品被浏览的次数。
     */
    public get viewTimes(): Promise<number> {
        if (this._viewTimes == null) {
            this._viewTimes = Promise.any([
                Promise.reject(new Error("没有提供浏览次数")),
                this.workInfo
                    .catch((error0) =>
                        this.workDetail.catch((error1) =>
                            Promise.reject([error0, error1])
                        )
                    ).catch((error0) =>
                        this.nemoWorkPublicResource
                            .catch((error1) =>
                                Promise.reject([...error0, error1])
                            )
                    ).then((info) => info.viewTimes)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._viewTimes
    }

    /**
     * 点赞该作品的人数。
     */
    public get likeTimes(): Promise<number> {
        if (this._likeTimes == null) {
            this._likeTimes = Promise.any([
                Promise.reject(new Error("没有提供点赞次数")),
                this.workInfo
                    .catch((error0) =>
                        this.workDetail.catch((error1) =>
                            Promise.reject([error0, error1])
                        )
                    ).catch((error0) =>
                        this.nemoWorkPublicResource
                            .catch((error1) =>
                                Promise.reject([...error0, error1])
                            )
                    ).then((info) => info.likeTimes)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._likeTimes
    }

    /**
     * 收藏该作品的人数。
     */
    public get collectTimes(): Promise<number> {
        if (this._collectTimes == null) {
            this._collectTimes = Promise.any([
                Promise.reject(new Error("没有提供收藏次数")),
                this.workInfo
                    .catch((error0) =>
                        this.workDetail.catch((error1) =>
                            Promise.reject([error0, error1])
                        )
                    ).then((info) => info.collectTimes)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._collectTimes
    }

    /**
     * 作品被分享的次数。
     */
    public get shareTimes(): Promise<number> {
        if (this._shareTimes == null) {
            this._shareTimes = Promise.any([
                Promise.reject(new Error("没有提供分享次数")),
                this.workInfo.then((info) => info.shareTimes)
            ]).catch(({ errors }) => Promise.reject(errors))
        }
        return this._shareTimes
    }

    /**
     * 作品的评论区中评论的数量，包括二级评论。
     */
    public get commentTimes(): Promise<number> {
        if (this._commentTimes == null) {
            this._commentTimes = Promise.any([
                Promise.reject(new Error("没有提供评论次数")),
                this.workInfo.then((info) => info.commentTimes)
            ]).catch(({ errors }) => Promise.reject(errors))
        }
        return this._commentTimes
    }

    /**
     * 作品是否是否开源。
     */
    public get openResource(): Promise<boolean> {
        if (this._openResource == null) {
            this._openResource = Promise.any([
                Promise.reject(new Error("没有提供开源状态")),
                this.workInfo
                    .catch((error0) =>
                        this.workDetail.catch((error1) =>
                            Promise.reject([error0, error1])
                        )
                    ).then((info) => info.openResource)
            ]).catch(({ errors }) => Promise.reject([errors[0], ...errors[1]]))
        }
        return this._openResource
    }

    /**
     * @param info 已知的作品信息。
     */
    public constructor(info: CodemaoWorkInfoObject) {
        this.set(info)
    }

    public set(info: CodemaoWorkInfoObject): void {
        if (info.id != None) this._id = Promise.resolve(info.id)
        if (info.name != None) this._name = Promise.resolve(info.name)
        if (info.type != None) this._type = Promise.resolve(info.type)
        if (info.description != None) this._description = Promise.resolve(info.description)
        if (info.operationInstruction != None) this._operationInstruction = Promise.resolve(info.operationInstruction)
        if (info.publishTime != None) this._publishTime = Promise.resolve(info.publishTime)
        if (info.playerURL != None) this._playerURL = Promise.resolve(info.playerURL)
        if (info.shareURL != None) this._shareURL = Promise.resolve(info.shareURL)
        if (info.coverURL != None) this._coverURL = Promise.resolve(info.coverURL)
        if (info.previewURL != None) this._previewURL = Promise.resolve(info.previewURL)
        if (info.viewTimes != None) this._viewTimes = Promise.resolve(info.viewTimes)
        if (info.likeTimes != None) this._likeTimes = Promise.resolve(info.likeTimes)
        if (info.collectTimes != None) this._collectTimes = Promise.resolve(info.collectTimes)
        if (info.shareTimes != None) this._shareTimes = Promise.resolve(info.shareTimes)
        if (info.commentTimes != None) this._commentTimes = Promise.resolve(info.commentTimes)
        if (info.openResource != None) this._openResource = Promise.resolve(info.openResource)
    }
}
