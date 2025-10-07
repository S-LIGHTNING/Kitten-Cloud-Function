import { emit, getSuperWidget, Logger } from "slightning-coco-widget"

import { KittenCloudFunction } from "../../kitten-cloud-function"
import { CodemaoWork } from "../../codemao/work/codemao-work"
import { None } from "../../utils/other"
import { KittenCloudVariable, KittenCloudVariableChangeMessageObject, KittenCloudVariableValue } from "../../module/cloud-data/kitten-cloud-variable"
import { KittenCloudData } from "../../module/cloud-data/kitten-cloud-data"
import { CodemaoUser } from "../../codemao/user/codemao-user"
import { KittenCloudPrivateVariable, KittenCloudPrivateVariableRankingListItemObject } from "../../module/cloud-data/kitten-cloud-private-variable"
import { KittenCloudList, KittenCloudListAddMessageObject, KittenCloudListEmptyMessageObject, KittenCloudListItemValue, KittenCloudListPopMessageObject, KittenCloudListPushMessageObject, KittenCloudListRemoveMessageObject, KittenCloudListReplaceLastMessageObject, KittenCloudListReplaceMessageObject, KittenCloudListUnshiftMessageObject } from "../../module/cloud-data/kitten-cloud-list"
import { KittenCloudPublicVariable } from "../../module/cloud-data/kitten-cloud-public-variable"
import { KittenCloudOnlineUserNumber, KittenCloudOnlineUserNumberChangObject } from "../../module/kitten-cloud-online-user-number"
import { KittenCloudPrivateVariableGroup } from "../../module/cloud-data/group/kitten-cloud-private-variable-group"
import { KittenCloudPublicVariableGroup } from "../../module/cloud-data/group/kitten-cloud-public-variable-group"
import { KittenCloudListGroup } from "../../module/cloud-data/group/kitten-cloud-list-group"
import { KittenCloudAutoReconnectIntervalTime, KittenCloudCacheTime, KittenCloudFunctionConfigLayer, KittenCloudLocalPreupdate, KittenCloudUploadIntervalTime } from "../kitten-cloud-function-package"
import { project } from "../../../project"
import { types } from "./types"

declare const KITTEN_CLOUD_FUNCTION_DEVELOP: boolean
declare const KITTEN_CLOUD_FUNCTION_ALLOW_USER: string | None
declare const KITTEN_CLOUD_FUNCTION_ALLOW_USING_WORK: string | None
declare const KITTEN_CLOUD_FUNCTION_ALLOW_CONNECTING_WORK: string | None

let hasOutputVersionInfo: boolean = false

const userRecord: Record<string, CodemaoUser> = {}
userRecord[0] = KittenCloudFunction.user

async function checkModifiable(work: CodemaoWork): Promise<void> {
    function getString(index: number): string {
        return [
            "JUU1JUJEJTkzJUU1JTg5JThEJUU3JTg5JTg4JUU2JTlDJUFDJUU0JUI4JUJBJUU0JUJGJUFFJUU2JTk0JUI5JUU1JThGJTk3JUU5JTk5JTkwJUU3JTg5JTg4JUU3JTg5JTg4JUVGJUJDJThDJUU1JThGJUFBJUU4JTgzJUJEJUU0JUJGJUFFJUU2JTk0JUI5JUU4JTg3JUFBJUU1JUI3JUIxJUU0JUJEJTlDJUU1JTkzJTgxJUU3JTlBJTg0JUU0JUJBJTkxJUU2JTk1JUIwJUU2JThEJUFFJUVGJUJDJThDJUU0JUJEJTg2JUU2JTk4JUFGJUU2JUJBJTkwJUU3JUEwJTgxJUU0JUJBJTkxJUU1JThBJTlGJUU4JTgzJUJEJUU2JTk3JUEwJUU2JUIzJTk1JUU5JUFBJThDJUU4JUFGJTgxJUU0JUJEJUEwJUU3JTlBJTg0JUU4JUJBJUFCJUU0JUJCJUJE",
            "JUU1JUJEJTkzJUU1JTg5JThEJUU3JTg5JTg4JUU2JTlDJUFDJUU0JUI4JUJBJUU0JUJGJUFFJUU2JTk0JUI5JUU1JThGJTk3JUU5JTk5JTkwJUU3JTg5JTg4JUU3JTg5JTg4JUVGJUJDJThDJUU1JThGJUFBJUU4JTgzJUJEJUU0JUJGJUFFJUU2JTk0JUI5JUU4JTg3JUFBJUU1JUI3JUIxJUU0JUJEJTlDJUU1JTkzJTgxJUU3JTlBJTg0JUU0JUJBJTkxJUU2JTk1JUIwJUU2JThEJUFFJUVGJUJDJThDJUU4JTgwJThDJTIw",
            "JTIwJUU0JUI4JThEJUU2JTk4JUFGJUU0JUJEJUEwJUU3JTlBJTg0JUU0JUJEJTlDJUU1JTkzJTgx"
        ][index]!
    }
    if (KITTEN_CLOUD_FUNCTION_DEVELOP) {
        return
    } else if (
        KITTEN_CLOUD_FUNCTION_ALLOW_USER != None &&
        KITTEN_CLOUD_FUNCTION_ALLOW_USING_WORK != None &&
        KITTEN_CLOUD_FUNCTION_ALLOW_CONNECTING_WORK != None
    ) {
        let user: number, usingWork: number, connectingWork: number
        let message: string = ""
        if (location.protocol != "file:") {
            if (location.pathname == "/editor/editor-player.html" || location.pathname == "/player") {
                usingWork = parseInt(new URLSearchParams(location.hash).get("#id") ?? "")
                user = await KittenCloudFunction.user.info.id
            } else {
                usingWork = parseInt(location.pathname.split("/").pop() ?? "")
                user = await (await new CodemaoWork({ id: usingWork }).info.author).info.id
            }
            if (!KITTEN_CLOUD_FUNCTION_ALLOW_USER.split(",").includes(String(user))) {
                message += "，仅用户 " + KITTEN_CLOUD_FUNCTION_ALLOW_USER + " 可用"
            }
            if (location.hostname.endsWith(".codemao.cn")) {
                if (!(KITTEN_CLOUD_FUNCTION_ALLOW_USING_WORK.split(",")).includes(String(usingWork))) {
                    message += "，仅在 CoCo 作品 " + KITTEN_CLOUD_FUNCTION_ALLOW_USING_WORK + " 可用"
                }
            }
        }
        connectingWork = await work.info.id
        if (!KITTEN_CLOUD_FUNCTION_ALLOW_CONNECTING_WORK.split(",").includes(String(connectingWork))) {
            message += "，仅可连接作品 " + KITTEN_CLOUD_FUNCTION_ALLOW_CONNECTING_WORK + ""
        }
        if (message != "") {
            throw new Error(`当前版本为专用版${message}`)
        }
    } else {
        let expectedWorkAuthorID: number | None = None
        if (location.pathname == "/editor/editor-player.html" || location.pathname == "/player") {
            expectedWorkAuthorID = await KittenCloudFunction.user.info.id
        } else {
            const thisWorkID: number = parseInt((location.pathname.split("/")).pop() ?? "")
            if (!Number.isNaN(thisWorkID)) {
                expectedWorkAuthorID = await (await new CodemaoWork({ id: thisWorkID }).info.author).info.id
            }
        }
        if ((expectedWorkAuthorID == None)) {
            throw new Error(decodeURIComponent(atob(getString(0))))
        }
        if ((await (await work.info.author).info.id != expectedWorkAuthorID)) {
            throw new Error(`${decodeURIComponent(atob(getString(1)))}${await work.info.name}${decodeURIComponent(atob(getString(2)))}`)
        }
    }
}

class KittenCloudFunctionWidget extends getSuperWidget(types) {

    private logger: Logger
    private emit: typeof emit
    private connection: KittenCloudFunction | None
    private isOpened: boolean = false

    public constructor(props: any) {
        super(props)
        this.logger = new Logger(types, this)
        this.emit = emit
    }

    private getConnection(this: this): KittenCloudFunction {
        if (this.connection == None) {
            throw new Error("当前未连接，请连接后再试")
        }
        return this.connection
    }

    public connect(this: this, workID: number): void {
        if (this.connection != None) {
            this.close()
            this.logger.warn("上一个连接未断开，已自动断开")
        }
        if (!hasOutputVersionInfo) {
            if (KITTEN_CLOUD_FUNCTION_DEVELOP) {
                this.logger.log(`${project.name} ${project.version}（开发调试版）`)
                if (!/^https?:\/\/(coco\.codemao\.cn\/editor\/editor-player\.html|cp\.cocotais\.cn\/((pptui)\/?)?)$/.test(location.origin + location.pathname)) {
                    const message = `不要将 ${project.name} ${project.version}（开发调试版）用于生产环境中！`
                    this.logger.error(new Error(message))
                    alert(message)
                }
            } else if (
                KITTEN_CLOUD_FUNCTION_ALLOW_USER == None ||
                KITTEN_CLOUD_FUNCTION_ALLOW_USING_WORK == None ||
                KITTEN_CLOUD_FUNCTION_ALLOW_CONNECTING_WORK == None
            ) {
                this.logger.log(`${project.name} v${project.version}（修改受限版版）`)
            } else {
                this.logger.log(`${project.name} v${project.version}（用户 ${KITTEN_CLOUD_FUNCTION_ALLOW_USER} 在 ${KITTEN_CLOUD_FUNCTION_ALLOW_USING_WORK} 中连接 ${KITTEN_CLOUD_FUNCTION_ALLOW_CONNECTING_WORK} 的专用版）`)
            }
            hasOutputVersionInfo = true
        }
        this.isOpened = false
        this.connection = new KittenCloudFunction(workID)
        this.connection.publicVariable.getAll().then(
            (variableArray: KittenCloudPublicVariable[]): void => {
                for (const variable of variableArray) {
                    variable.changed.connect(
                        ({ source, originalValue, newValue }: KittenCloudVariableChangeMessageObject): void => {
                            this.emit("onPublicVariableValueChanged", variable.name, source.name, originalValue, newValue)
                        }
                    )
                }
            }
        )
        this.connection.onlineUserNumber.then(
            (onlineUserNumber: KittenCloudOnlineUserNumber): void => {
                onlineUserNumber.changed.connect(
                    ({ originalNumber, newNumber }: KittenCloudOnlineUserNumberChangObject): void => {
                        this.emit("onOnlineUsersNumberChanged", originalNumber, newNumber)
                    }
                )
            }
        )
        this.connection.list.getAll().then(
            (listArray: KittenCloudList[]): void => {
                for (const list of listArray) {
                    list.pushed.connect(
                        ({ source, item }: KittenCloudListPushMessageObject): void => {
                            this.emit("onListPushed", list.name, source.name, item)
                        }
                    )
                    list.unshifted.connect(
                        ({ source, item }: KittenCloudListUnshiftMessageObject): void => {
                            this.emit("onListUnshifted", list.name, source.name, item)
                        }
                    )
                    list.added.connect(
                        ({ source, index, item }: KittenCloudListAddMessageObject): void => {
                            this.emit("onListAdd", list.name, source.name, index, item)
                        }
                    )
                    list.popped.connect(
                        ({ source, item }: KittenCloudListPopMessageObject): void => {
                            this.emit("onListPopped", list.name, source.name, item)
                        }
                    )
                    list.removed.connect(
                        ({ source, index, item }: KittenCloudListRemoveMessageObject): void => {
                            this.emit("onListRemove", list.name, source.name, index, item)
                        }
                    )
                    list.emptied.connect(
                        ({ source, list: listValue }: KittenCloudListEmptyMessageObject): void => {
                            this.emit("onListEmptied", list.name, source.name, listValue)
                        }
                    )
                    list.replacedLast.connect(
                        ({ source, originalItem, newItem }: KittenCloudListReplaceLastMessageObject): void => {
                            this.emit("onListReplacedLast", list.name, source.name, originalItem, newItem)
                        }
                    )
                    list.replaced.connect(
                        ({ source, index, originalItem, newItem }: KittenCloudListReplaceMessageObject): void => {
                            this.emit("onListReplaced", list.name, source.name, index, originalItem, newItem)
                        }
                    )
                }
            }
        )
        this.connection.opened.connect((): void => {
            this.isOpened = true
            this.emit("onOpen")
        })
        this.connection.errored.connect((error): void => {
            if (!this.isOpened) {
                this.connection = None
            }
            this.logger.error(error)
        })
        this.connection.closed.connect(this.handleClose)
    }

    private handleClose: () => void = (): void => {
        this.connection = None
        this.emit("onClose")
    }

    public close(this: this): void {
        const connection: KittenCloudFunction = this.getConnection()
        connection.close()
        connection.closed.disconnect(this.handleClose)
        this.connection = None
    }

    public async isConnected(this: this): Promise<boolean> {
        return this.connection != None
    }

    public async connectedWorkID(this: this): Promise<number> {
        return await this.getConnection().work.info.id
    }

    private async getVariable(this: this, index: string): Promise<KittenCloudVariable> {
        const data: KittenCloudData = await this.getConnection().get(index)
        if (!(data instanceof KittenCloudVariable)) {
            throw new Error(`${index} 不是云变量`)
        }
        return data
    }

    public async getPrivateVariableList(this: this): Promise<object[]> {
        return this.getConnection().privateVariable.getAll().then(
            (variableArray: KittenCloudPrivateVariable[]): object[] => {
                return variableArray.map(
                    (variable: KittenCloudPrivateVariable): object => {
                        return {
                            "名称": variable.name,
                            "值": variable.value
                        }
                    }
                )
            }
        )
    }

    public async getPublicVariableList(this: this): Promise<object[]> {
        return this.getConnection().publicVariable.getAll().then(
            (variableArray: KittenCloudPublicVariable[]): object[] => {
                return variableArray.map(
                    (variable: KittenCloudPublicVariable): object => {
                        return {
                            "名称": variable.name,
                            "值": variable.value
                        }
                    }
                )
            }
        )
    }

    public async variableGet(this: this, name: string): Promise<KittenCloudVariableValue> {
        return (await this.getVariable(name)).get()
    }

    public async variableSet(this: this, name: string, value: KittenCloudVariableValue): Promise<void> {
        await checkModifiable(this.getConnection().work)
        ;(await this.getVariable(name)).set(value)
    }

    public async getRankingList(
        this: this, name: string, limit: number, order: string
    ): Promise<{ "值": number, "用户": number }[]> {
        const variable = await this.getVariable(name)
        if (!(variable instanceof KittenCloudPrivateVariable)) {
            throw new Error(`${name} 不是私有云变量`)
        }
        return Promise.all((await variable.getRankingList(limit, parseInt(order))).map(
            async (item: KittenCloudPrivateVariableRankingListItemObject): Promise<{ "值": number; "用户": number} > => {
                const user: CodemaoUser = userRecord[await item.user.info.id] ?? new CodemaoUser()
                user.info.setCache({
                    id: await item.user.info.id,
                    nickname: await item.user.info.nickname,
                    avatarURL: await item.user.info.avatarURL
                })
                return { "值": item.value, "用户": await item.user.info.id }
            }
        ))
    }

    public async isUserLoggedIn(this: this): Promise<boolean> {
        try {
            await KittenCloudFunction.user.info.id
            return true
        } catch (__ignore) {
            return false
        }
    }

    public async userLogIn(this: this): Promise<boolean> {
        return CodemaoUser.userLogInInBrowser()
    }

    public async getUserInfo(this: this, userID: number, type: string): Promise<number | string> {
        let user: CodemaoUser | None = userRecord[userID]
        if (user == None) {
            user = new CodemaoUser({ id: userID })
            userRecord[userID] = user
        }
        switch (type) {
            case "id": return await user.info.id
            case "username": return await user.info.username
            case "nickname": return await user.info.nickname
            case "realname": return await user.info.realname
            case "avatarURL": return await user.info.avatarURL
            case "coverURL": return await user.info.coverURL
            case "description": return await user.info.description
            case "doing": return await user.info.doing
            case "email": return await user.info.email
            case "badge": return (await user.info.badge).name
            case "grade": return await user.info.grade
            case "birthday": return (await user.info.birthday).toLocaleString()
            case "sex": return (await user.info.sex).name
            case "viewTimes": return await user.info.viewTimes
            case "praiseTimes": return await user.info.praiseTimes
            case "collectTimes": return await user.info.collectTimes
            case "forkTimes": return await user.info.forkTimes
            default: throw new Error(`无法识别的用户信息类型：${type}`)
        }
    }

    public async getOnlineUsersNumber(this: this): Promise<number> {
        return (await this.getConnection().onlineUserNumber).value
    }

    public async getList(this: this, index: string): Promise<KittenCloudList> {
        const data: KittenCloudData = await this.getConnection().get(index)
        if (!(data instanceof KittenCloudList)) {
            throw new Error(`${index} 不是云列表`)
        }
        return data
    }

    public async listIndex(
        this: this,
        list: KittenCloudList,
        indexingMode: string,
        index: number
    ): Promise<number> {
        switch (indexingMode) {
            case "forward": return index - 1
            case "backward": return list.length - index
            default: throw new Error(`无法识别的索引模式：${indexingMode}`)
        }
    }

    public async getListList(this: this): Promise<object[]> {
        return this.getConnection().list.getAll().then(
            (listArray: KittenCloudList[]): object[] => {
                return listArray.map(
                    (list: KittenCloudList): object => {
                        return {
                            "名称": list.name,
                            "值": list.copy()
                        }
                    }
                )
            }
        )
    }

    public async getListCopy(this: this, name: string): Promise<KittenCloudListItemValue[]> {
        return (await this.getList(name)).copy()
    }

    public async listAppend(
        this: this,
        value: KittenCloudListItemValue,
        name: string,
        position: string
    ): Promise<void> {
        await checkModifiable(this.getConnection().work)
        switch (position) {
            case "head":
                (await this.getList(name)).push(value)
                break
            case "tail":
                (await this.getList(name)).unshift(value)
                break
            default: throw new Error(`无法识别的位置：${position}`)
        }
    }

    public async listAdd(
        this: this,
        value: KittenCloudListItemValue,
        name: string,
        indexingMode: string,
        index: number
    ): Promise<void> {
        await checkModifiable(this.getConnection().work)
        const list: KittenCloudList = await this.getList(name)
        list.add(await this.listIndex(list, indexingMode, index), value)
    }

    public async listRemove(
        this: this, name: string, indexingMode: string, index: number
    ): Promise<void> {
        await checkModifiable(this.getConnection().work)
        const list: KittenCloudList = await this.getList(name)
        if (indexingMode == "backward" && index == 1) {
            list.pop()
        } else {
            list.remove(await this.listIndex(list, indexingMode, index))
        }
    }

    public async listEmpty(this: this, name: string): Promise<void> {
        await checkModifiable(this.getConnection().work)
        ;(await this.getList(name)).empty()
    }

    public async listReplace(
        this: this,
        name: string,
        indexingMode: string,
        index: number,
        value: KittenCloudListItemValue
    ): Promise<void> {
        await checkModifiable(this.getConnection().work)
        const list: KittenCloudList = await this.getList(name)
        if (indexingMode == "backward" && index == 1) {
            list.replaceLast(value)
        } else {
            list.replace(await this.listIndex(list, indexingMode, index), value)
        }
    }

    public async listCopy(
        this: this, list1: string | KittenCloudListItemValue[], list2name: string
    ): Promise<void> {
        await checkModifiable(this.getConnection().work)
        if (typeof list1 == "string") {
            list1 = (await this.getList(list1)).value
        }
        (await this.getList(list2name)).copyFrom(list1)
    }

    public async listGet(
        this: this, name: string, indexingMode: string, index: number
    ): Promise<KittenCloudListItemValue> {
        const list: KittenCloudList = await this.getList(name)
        return list.get(await this.listIndex(list, indexingMode, index)) ?? 0
    }

    public async listLength(this: this, name: string): Promise<number> {
        return (await this.getList(name)).length
    }

    public async listFind(
        this: this,
        name: string,
        countingMode: string,
        count: number,
        value: KittenCloudListItemValue
    ): Promise<number> {
        const list: KittenCloudList = await this.getList(name)
        switch (countingMode) {
            case "forward":
                let nowCount0: number = 0
                for (let i: number = 0; i < list.length; i++) {
                    if (list.get(i) == value) {
                        nowCount0++
                        if (nowCount0 == count) {
                            return i + 1
                        }
                    }
                }
                return 0
            case "backward":
                let nowCount1: number = 0
                for (let i: number = list.length - 1; i >= 0; i--) {
                    if (list.get(i) == value) {
                        nowCount1++
                        if (nowCount1 == count) {
                            return i + 1
                        }
                    }
                }
                return 0
            default: throw new Error(`无法识别的计数模式：${countingMode}`)
        }
    }

    public async listContain(this: this, name: string, value: KittenCloudListItemValue): Promise<boolean> {
        return (await this.getList(name)).includes(value)
    }

    private async getConfigLayer(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string
    ): Promise<KittenCloudFunctionConfigLayer> {
        switch (configLayerName) {
            case "connection":
                return this.getConnection()
            case "privateVariableGroup":
                return this.getConnection().privateVariable
            case "publicVariableGroup":
                return this.getConnection().publicVariable
            case "listGroup":
                return this.getConnection().list
            case "variable":
                return await this.getVariable(dataName)
            case "list":
                return await this.getList(dataName)
            default:
                throw new Error(`未知的配置层：${configLayerName}`)
        }
    }

    public async getAutoReconnectIntervalTime(
        this: this,
        configLayerName: "connection",
        dataName: string,
        type: "config" | "value"
    ): Promise<KittenCloudAutoReconnectIntervalTime | None> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        return configLayer.autoReconnectIntervalTime[type]
    }

    public async getLocalPreupdate(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string,
        type: "config" | "value"
    ): Promise<KittenCloudLocalPreupdate | None> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        return configLayer.localPreupdate[type]
    }

    public async getCacheTime(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string,
        type: "config" | "value"
    ): Promise<KittenCloudCacheTime | None> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        return configLayer.cacheTime[type]
    }

    public async getUploadIntervalTime(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string,
        type: "config" | "value"
    ): Promise<KittenCloudUploadIntervalTime | None> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        return configLayer.uploadIntervalTime[type]
    }

    public async getUploadTimeout(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string,
        type: "config" | "value"
    ): Promise<number | None> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        return configLayer.uploadTimeout[type]
    }

    public async getStringLengthLimit(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string,
        type: "config" | "value"
    ): Promise<number | None> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        return configLayer.stringLengthLimit[type]
    }

    public async getListLengthLimit(
        this: this,
        configLayerName: "connection" | "listGroup" | "list",
        dataName: string,
        type: "config" | "value"
    ): Promise<number | None> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        return configLayer.listLengthLimit[type]
    }

    public async setAutoReconnectIntervalTime(
        this: this,
        configLayerName: "connection",
        dataName: string,
        value: KittenCloudAutoReconnectIntervalTime
    ): Promise<void> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        configLayer.autoReconnectIntervalTime.config = value
    }

    public async setLocalPreupdate(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string,
        value: KittenCloudLocalPreupdate
    ): Promise<void> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        configLayer.localPreupdate.config = value
    }

    public async setCacheTime(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string,
        value: KittenCloudCacheTime
    ): Promise<void> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        configLayer.cacheTime.config = value
    }

    public async setUploadIntervalTime(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string,
        value: KittenCloudUploadIntervalTime
    ): Promise<void> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        configLayer.uploadIntervalTime.config = value
    }

    public async setUploadTimeout(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string,
        value: number
    ): Promise<void> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        configLayer.uploadTimeout.config = value
    }

    public async setStringLengthLimit(
        this: this,
        configLayerName:
            "connection" |
            "privateVariableGroup" |
            "publicVariableGroup" |
            "listGroup" |
            "variable" |
            "list",
        dataName: string,
        value: number
    ): Promise<void> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        configLayer.stringLengthLimit.config = value
    }

    public async setListLengthLimit(
        this: this,
        configLayerName: "connection" | "listGroup" | "list",
        dataName: string,
        value: number
    ): Promise<void> {
        const configLayer: KittenCloudFunctionConfigLayer = await this.getConfigLayer(configLayerName, dataName)
        configLayer.listLengthLimit.config = value
    }

    public getConnectionConfigValue(this: this, type: string): number | boolean {
        const connection: KittenCloudFunction = this.getConnection()
        switch (type) {
            case "autoReconnectIntervalTime": return connection.autoReconnectIntervalTime.value
            case "localPreupdate": return connection.localPreupdate.value
            case "cacheTime": return connection.cacheTime.value
            case "uploadIntervalTime": return connection.uploadIntervalTime.value
            case "stringLengthLimit": return connection.stringLengthLimit.value
            case "listLengthLimit": return connection.listLengthLimit.value
            default: throw new Error(`无法识别的连接配置类型：${type}`)
        }
    }

    /**
     * @deprecated
     */
    public async isUserLogged(this: this): Promise<boolean> {
        try {
            await KittenCloudFunction.user.info.id
            return true
        } catch (error) {
            return false
        }
    }


    /**
     * @deprecated
     */
    public setConnectionConfig(this: this, type: string, value: number | boolean): void {
        const connection: KittenCloudFunction = this.getConnection()
        switch (type) {
            case "autoReconnectIntervalTime":
                connection.autoReconnectIntervalTime.value = value
                break
            case "localPreupdate":
                if (typeof value != "boolean") {
                    throw new Error("本地预更新值必须为布尔值")
                }
                connection.localPreupdate.config = value
                break
            case "cacheTime":
                connection.cacheTime.config = value
                break
            case "uploadIntervalTime":
                connection.uploadIntervalTime.config = value
                break
            case "stringLengthLimit":
                if (typeof value != "number") {
                    throw new Error("字符串长度限制值必须为数字")
                }
                connection.stringLengthLimit.config = value
                break
            case "listLengthLimit":
                if (typeof value != "number") {
                    throw new Error("列表长度限制值必须为数字")
                }
                connection.listLengthLimit.config = value
                break
            default: throw new Error(`无法识别的连接配置类型：${type}`)
        }
    }


    /**
     * @deprecated
     */
    public getPrivateVariableConfigValue(this: this, type: string): number | boolean {
        const group: KittenCloudPrivateVariableGroup = this.getConnection().privateVariable
        switch (type) {
            case "localPreupdate": return group.localPreupdate.value
            case "cacheTime": return group.cacheTime.value
            case "uploadIntervalTime": return group.uploadIntervalTime.value
            case "stringLengthLimit": return group.stringLengthLimit.value
            default: throw new Error(`无法识别的私有云变量配置类型：${type}`)
        }
    }


    /**
     * @deprecated
     */
    public setPrivateVariableConfig(this: this, type: string, value: number | boolean): void {
        const group: KittenCloudPrivateVariableGroup = this.getConnection().privateVariable
        switch (type) {
            case "localPreupdate":
                if (typeof value != "boolean") {
                    throw new Error("本地预更新值必须为布尔值")
                }
                group.localPreupdate.config = value
                break
            case "cacheTime":
                group.cacheTime.config = value
                break
            case "uploadIntervalTime":
                group.uploadIntervalTime.config = value
                break
            case "stringLengthLimit":
                if (typeof value != "number") {
                    throw new Error("字符串长度限制值必须为数字")
                }
                group.stringLengthLimit.config = value
                break
            default: throw new Error(`无法识别的私有云变量配置类型：${type}`)
        }
    }


    /**
     * @deprecated
     */
    public getPublicVariableConfigValue(this: this, type: string): number | boolean {
        const group: KittenCloudPublicVariableGroup = this.getConnection().publicVariable
        switch (type) {
            case "localPreupdate": return group.localPreupdate.value
            case "cacheTime": return group.cacheTime.value
            case "uploadIntervalTime": return group.uploadIntervalTime.value
            case "stringLengthLimit": return group.stringLengthLimit.value
            default: throw new Error(`无法识别的公有云变量配置类型：${type}`)
        }
    }


    /**
     * @deprecated
     */
    public setPublicVariableConfig(this: this, type: string, value: number | boolean): void {
        const group: KittenCloudPublicVariableGroup = this.getConnection().publicVariable
        switch (type) {
            case "localPreupdate":
                if (typeof value != "boolean") {
                    throw new Error("本地预更新值必须为布尔值")
                }
                group.localPreupdate.config = value
                break
            case "cacheTime":
                group.cacheTime.config = value
                break
            case "uploadIntervalTime":
                group.uploadIntervalTime.config = value
                break
            case "stringLengthLimit":
                if (typeof value != "number") {
                    throw new Error("字符串长度限制值必须为数字")
                }
                group.stringLengthLimit.config = value
                break
            default: throw new Error(`无法识别的公有云变量配置类型：${type}`)
        }
    }


    /**
     * @deprecated
     */
    public getListConfigValue(this: this, type: string): number | boolean {
        const group: KittenCloudListGroup = this.getConnection().list
        switch (type) {
            case "localPreupdate": return group.localPreupdate.value
            case "cacheTime": return group.cacheTime.value
            case "uploadIntervalTime": return group.uploadIntervalTime.value
            case "stringLengthLimit": return group.stringLengthLimit.value
            case "listLengthLimit": return group.listLengthLimit.value
            default: throw new Error(`无法识别的列表配置类型：${type}`)
        }
    }


    /**
     * @deprecated
     */
    public setListConfig(this: this, type: string, value: number | boolean): void {
        const group: KittenCloudListGroup = this.getConnection().list
        switch (type) {
            case "localPreupdate":
                if (typeof value != "boolean") {
                    throw new Error("本地预更新值必须为布尔值")
                }
                group.localPreupdate.config = value
                break
            case "cacheTime":
                group.cacheTime.config = value
                break
            case "uploadIntervalTime":
                group.uploadIntervalTime.config = value
                break
            case "stringLengthLimit":
                if (typeof value != "number") {
                    throw new Error("字符串长度限制值必须为数字")
                }
                group.stringLengthLimit.config = value
                break
            case "listLengthLimit":
                if (typeof value != "number") {
                    throw new Error("列表长度限制值必须为数字")
                }
                group.listLengthLimit.config = value
                break
            default: throw new Error(`无法识别的列表配置类型：${type}`)
        }
    }
}

export { KittenCloudFunctionWidget }
