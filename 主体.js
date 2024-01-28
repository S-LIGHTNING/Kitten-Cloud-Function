const PRIVATE_VAR = 0, PUBLIC_VAR = 1, LIST = 2, VAR = 3, ALL = 4
const KITTEN = 0, NEMO = 1
const READ = 0, WRITE = 1, READWRITE = 2
const LOCAL = 0, CLOUD = 1, UNDO = 2, REDO = 3
const MALE = 1, FEMALE = 0
const API = {
    [KITTEN]: {
        authorizationType: 0,
        stag: 1,
        getWorkInfoUrl: workID => `https://api-creation.codemao.cn/kitten/r2/work/player/load/${workID}`,
        getBcmcUrl: info => info.source_urls[0]
    },
    [NEMO]: {
        authorizationType: 5,
        stag: 2,
        getWorkInfoUrl: workID => `https://api.codemao.cn/creation-tools/v1/works/${workID}/source/public`,
        getBcmcUrl: info => info.work_urls[0]
    }
}

const axios = require("axios")

const types = {
    type: "SLIGHTNING_KITTEN_CLOUD_FUNCTION",
    title: "源码云功能",
    author: "SLIGHTNING",
    icon: "icon-widget-cloud-room",
	version: "1.0.1",
    isInvisibleWidget: true,
    isGlobalWidget: true,
    properties: [
        {
            key: "autoReconnect",
            label: "断开时自动重连", 
            valueType: "boolean",
            defaultValue: true
        }, {
            key: "maxRetryTimes",
            label: "最大出错重试次数", 
            valueType: "number",
            defaultValue: 2
        }, {
            key: "privateVarLocalPreUpdate",
            label: "私有云变量本地预更新", 
            valueType: "boolean",
            defaultValue: true
        }, {
            key: "publicVarLocalPreUpdate",
            label: "共有云变量本地预更新", 
            valueType: "boolean",
            defaultValue: true
        }, {
            key: "listLocalPreUpdate",
            label: "云列表本地预更新", 
            valueType: "boolean",
            defaultValue: false
        }
    ],
    methods: [
        {
            key: "connect",
            label: "连接",
            params: [
                {
                    key: "workType",
                    label: "到",
                    dropdown: [
                        { label: "KITTEN", value: KITTEN },
                        { label: "NEMO", value: NEMO },
                    ]
                }, {
                    key: "workID",
                    valueType: "number",
                    defaultValue: 0
                }
            ],
            blockOptions: {
                color: "#c571d8",
                callMethodLabel: false,
                line: "连接"
            }
        }, {
            key: "disconnect",
            label: "断开",
            params: [],
            blockOptions: {
                color: "#c571d8",
                callMethodLabel: false
            }
        }, {
            key: "connectedWorkID",
            label: "已连接作品编号",
            params: [],
            valueType: "number",
            blockOptions: {
                color: "#c571d8",
                callMethodLabel: false
            }
        }, {
            key: "able",
            params: [
                {
                    key: "dateType",
                    valueType: "number",
                    dropdown: [
                        { label: "云变量", value: VAR },
                        { label: "云列表", value: LIST },
                        { label: "所有", value: ALL }
                    ]
                }, {
                    key: "operation",
                    label: "可",
                    valueType: "number",
                    dropdown: [
                        { label: "读", value: READ },
                        { label: "写", value: WRITE },
                        { label: "读写", value: READWRITE }
                    ]
                }
            ],
            valueType: "boolean",
            blockOptions: {
                color: "#c571d8",
                callMethodLabel: false,
                space: 40
            }
        }, {
            key: "dataType",
            params: [
                {
                    key: "type",
                    valueType: "number",
                    dropdown: [
                        { label: "私有云变量", value: PRIVATE_VAR },
                        { label: "共有云变量", value: PUBLIC_VAR },
                        { label: "云列表", value: LIST }
                    ]
                }
            ],
            valueType: "number",
            blockOptions: {
                color: "#54b76f",
                callMethodLabel: false,
                line: "枚举"
            }
        }, {
            key: "sourceType",
            params: [
                {
                    key: "type",
                    valueType: "number",
                    dropdown: [
                        { label: "本地", value: LOCAL },
                        { label: "云端", value: CLOUD },
                        { label: "撤销", value: UNDO },
                        { label: "重做", value: REDO }
                    ]
                }
            ],
            valueType: "number",
            blockOptions: {
                color: "#54b76f",
                callMethodLabel: false
            }
        }, {
            key: "sexType",
            params: [
                {
                    key: "type",
                    valueType: "number",
                    dropdown: [
                        { label: "男♂️", value: MALE },
                        { label: "女♀️", value: FEMALE }
                    ]
                }
            ],
            valueType: "number",
            blockOptions: {
                color: "#54b76f",
                callMethodLabel: false,
                space: 40
            }
        }, {
            key: "get",
            params: [
                {
                    key: "name",
                    valueType: "string",
                    defaultValue: "云变量"
                }
            ],
            valueType: ["string", "number"],
            blockOptions: {
                color: "#d67b18",
                callMethodLabel: false,
                line: "云变量"
            }
        }, {
            key: "set",
            label: "设置",
            params: [
                {
                    key: "name",
                    labelAfter: "的值",
                    valueType: "string",
                    defaultValue: "云变量"
                }, {
                    key: "value",
                    label: "为",
                    valueType: "string",
                    defaultValue: "新的值"
                }
            ],
            blockOptions: {
                color: "#d67b18",
                callMethodLabel: false,
                space: 40
            }
        }, {
            key: "isUserLogined",
            label: "用户已登录",
            params: [],
            valueType: "boolean",
            blockOptions: {
                color: "#db6656",
                callMethodLabel: false,
                line: "用户信息"
            }
        }, {
            key: "userInfo",
            params: [
                {
                    key: "type",
                    label: "用户",
                    valueType: "string",
                    dropdown: [
                        { label: "昵称", value: "nickname" },
                        { label: "ID", value: "id" },
                        { label: "头像", value: "avatar_url" },
                        { label: "性别", value: "sex" },
                        { label: "个性签名", value: "description" },
                        { label: "QQ 号", value: "qq" },
                        { label: "生日", value: "birthday" }
                    ]
                }
            ],
            valueType: [ "string", "number" ],
            blockOptions: {
                color: "#db6656",
                callMethodLabel: false,
            }
        }, {
            key: "onlineUsersNumber",
            label: "在线用户数",
            params: [],
            valueType: "number",
            blockOptions: {
                color: "#db6656",
                callMethodLabel: false,
                space: 40
            }
        }, {
            key: "getList",
            params: [
                {
                    key: "name",
                    labelAfter: "副本",
                    valueType: "string",
                    defaultValue: "云列表"
                }
            ],
            valueType: "array",
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false,
                line: "云列表"
            }
        }, {
            key: "append",
            label: "添加",
            params: [
                {
                    key: "value",
                    valueType: "string",
                    defaultValue: "值"
                }, {
                    key: "name",
                    label: "到",
                    valueType: "string",
                    defaultValue: "云列表"
                }, {
                    key: "position",
                    valueType: "number",
                    dropdown: [
                        { label: "末尾", value: 0 },
                        { label: "头部", value: 1 }
                    ]
                }
            ],
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false
            }
        }, {
            key: "add",
            label: "添加",
            params: [
                {
                    key: "value",
                    valueType: "string",
                    defaultValue: "值"
                }, {
                    key: "name",
                    label: "到",
                    valueType: "string",
                    defaultValue: "云列表"
                }, {
                    key: "indexingMode",
                    valueType: "number",
                    dropdown: [
                        { label: "正数", value: 0 },
                        { label: "倒数", value: 1 }
                    ]
                }, {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: "number",
                    defaultValue: 1
                }
            ],
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false
            }
        }, {
            key: "delete",
            label: "删除",
            params: [
                {
                    key: "name",
                    valueType: "string",
                    defaultValue: "云列表"
                }, {
                    key: "indexingMode",
                    valueType: "number",
                    dropdown: [
                        { label: "正数", value: 0 },
                        { label: "倒数", value: 1 }
                    ]
                }, {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: "number",
                    defaultValue: 1
                }
            ],
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false
            }
        }, {
            key: "deleteAll",
            label: "删除",
            params: [
                {
                    key: "name",
                    labelAfter: "所有项",
                    valueType: "string",
                    defaultValue: "云列表"
                }
            ],
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false
            }
        }, {
            key: "replace",
            label: "替换",
            params: [
                {
                    key: "name",
                    valueType: "string",
                    defaultValue: "云列表"
                }, {
                    key: "indexingMode",
                    valueType: "number",
                    dropdown: [
                        { label: "正数", value: 0 },
                        { label: "倒数", value: 1 }
                    ]
                }, {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: "number",
                    defaultValue: 1
                }, {
                    key: "value",
                    label: "为",
                    valueType: "string",
                    defaultValue: "值"
                }
            ],
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false
            }
        }, {
            key: "replaceAll",
            label: "复制",
            params: [
                {
                    key: "list1",
                    valueType: ["string", "array"],
                    defaultValue: "列表（可放入本地列表）"
                }, {
                    key: "list2",
                    label: "到",
                    valueType: "string",
                    defaultValue: "云列表"
                }
            ],
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false,
                space: 40
            }
        }, {
            key: "listGet",
            params: [
                {
                    key: "name",
                    valueType: "string",
                    defaultValue: "云列表"
                }, {
                    key: "indexingMode",
                    valueType: "number",
                    dropdown: [
                        { label: "正数", value: 0 },
                        { label: "倒数", value: 1 }
                    ]
                }, {
                    key: "index",
                    label: "第",
                    labelAfter: "项",
                    valueType: "number",
                    defaultValue: 1
                }
            ],
            valueType: ["string", "number"],
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false
            }
        }, {
            key: "listLength",
            params: [
                {
                    key: "name",
                    labelAfter: "的项数",
                    valueType: "string",
                    defaultValue: "云列表"
                }
            ],
            valueType: "number",
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false
            }
        }, {
            key: "listFind",
            params: [
                {
                    key: "name",
                    labelAfter: "中",
                    valueType: "string",
                    defaultValue: "云列表"
                }, {
                    key: "countingMode",
                    valueType: "number",
                    dropdown: [
                        { label: "正数", value: 0 },
                        { label: "倒数", value: 1 }
                    ]
                }, {
                    key: "count",
                    label: "第",
                    labelAfter: "个",
                    valueType: "number",
                    defaultValue: 1
                }, {
                    key: "value",
                    labelAfter: "的位置",
                    valueType: "string",
                    defaultValue: "值"
                }

            ],
            valueType: "number",
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false
            }
        }, {
            key: "listContain",
            params: [
                {
                    key: "name",
                    labelAfter: "中",
                    valueType: "string",
                    defaultValue: "云列表"
                }, {
                    key: "value",
                    label: "包含",
                    valueType: "string",
                    defaultValue: "值"
                }

            ],
            valueType: "boolean",
            blockOptions: {
                color: "#c7c100",
                callMethodLabel: false
            }
        }
    ],
    events: [
        {
            key: "onConnectionError",
            label: "连接出现错误",
            params: [
                {
                    key: "message",
                    label: "信息",
                    valueType: "string"
                }
            ]
        }, {
            key: "onDataInit",
            label: "云数据初始化",
            params: [
                {
                    key: "name",
                    label: "名称",
                    valueType: "string"
                }, {
                    key: "value",
                    label: "值",
                    valueType: ["string", "number"]
                }, {
                    key: "type",
                    label: "类型",
                    valueType: "number"
                }, {
                    key: "cvid",
                    label: "CVID",
                    valueType: "string"
                }
            ]
        }, {
            key: "onPublicVarChange",
            label: "公有云变量改变",
            params: [
                {
                    key: "source",
                    label: "源",
                    valueType: "number"
                }, {
                    key: "name",
                    label: "名称",
                    valueType: "string"
                }, {
                    key: "originalValue",
                    label: "原值",
                    valueType: ["string", "number"]
                }, {
                    key: "newValue",
                    label: "新值",
                    valueType: ["string", "number"]
                }
            ]
        }, {
            key: "onOnlineUsersNumberChange",
            label: "在线用户数改变",
            params: []
        }, {
            key: "onListAdd",
            label: "云列表添加",
            params: [
                {
                    key: "source",
                    label: "源",
                    valueType: "number"
                }, {
                    key: "name",
                    label: "名称",
                    valueType: "string"
                }, {
                    key: "index",
                    label: "索引",
                    valueType: "number"
                }, {
                    key: "value",
                    label: "项",
                    valueType: ["string", "number"]
                }
            ]
        }, {
            key: "onListDelete",
            label: "云列表删除",
            params: [
                {
                    key: "source",
                    label: "源",
                    valueType: "number"
                }, {
                    key: "name",
                    label: "名称",
                    valueType: "string"
                }, {
                    key: "index",
                    label: "索引",
                    valueType: "number"
                }, {
                    key: "value",
                    label: "项",
                    valueType: ["string", "number"]
                }
            ]
        }, {
            key: "onListDeleteAll",
            label: "云列删除所有",
            params: [
                {
                    key: "source",
                    label: "源",
                    valueType: "number"
                }, {
                    key: "name",
                    label: "名称",
                    valueType: "string"
                }, {
                    key: "originalList",
                    label: "原列表",
                    valueType: "array"
                }
            ]
        }, {
            key: "onListReplace",
            label: "云列替换",
            params: [
                {
                    key: "source",
                    label: "源",
                    valueType: "number"
                }, {
                    key: "name",
                    label: "名称",
                    valueType: "string"
                }, {
                    key: "index",
                    label: "索引",
                    valueType: "number"
                }, {
                    key: "originalValue",
                    label: "原项",
                    valueType: ["string", "number"]
                }, {
                    key: "newValue",
                    label: "新项",
                    valueType: ["string", "number"]
                }
            ]
        }, {
            key: "onListReplaceAll",
            label: "云列替换所有",
            params: [
                {
                    key: "source",
                    label: "源",
                    valueType: "number"
                }, {
                    key: "name",
                    label: "名称",
                    valueType: "string"
                }, {
                    key: "originalValue",
                    label: "原列表",
                    valueType: "array"
                }, {
                    key: "newValue",
                    label: "新列表",
                    valueType: "array"
                }
            ]
        }
    ]
}

const HTTP = {
    get: async (url, withCredentials=false) => {
        try {
            return (await axios({
                method: "get",
                url: url,
                withCredentials: withCredentials
            })).data
        } catch (error) {
            const { response } = error
            if (response) {
                const { data } = response
                throw new Error(data.error_message)
            } else if (error.request) {
                throw new Error("请已发送，但未收到响应")
            } else {
                throw new Error("请求发送失败")
            }
        }
    }
}

function Task(widget, name, func, maxRetryTimes=widget.maxRetryTimes, hint=false) {
    return async () => {
        var retryTimes = 0
        if (hint) widget.log(`正在 ${name} ……`)
        for (;;) {
            try {
                value = await func()
                retryTimes = 0
                return value
            } catch (error) {
                var message = `${name} 时出错：${error.message}`
                if (retryTimes >= maxRetryTimes) {
                    error.message = message
                    if (maxRetryTimes != 0) {
                        widget.error(error)
                        widget.error(new Error("重试次数已达上限，不再重试"))
                    }
                    throw error
                } else {
                    widget.warn(message)
                    widget.warn(`正在进行第 ${++retryTimes} 次重试……`)
                }
            }
        }
    }
}

function equal(a, b) {
    if (typeof a !== typeof b) {
        return false;
    }
    if (a === null || typeof a === "string" || typeof a === "number") {
        return a === b;
    }
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!equal(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (typeof a === "object" && a !== null) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        for (let key in a) {
            if (!b.hasOwnProperty(key) || !equal(a[key], b[key])) {
                return false;
            }
        }
        return true;
    } else {
        return a === b;
    }
}

function KittenCloud(widget, workType, workID) {

    var getMessageResolve, getMessageReject
    var api = API[workType]

    this.widget = widget
    this.workID = workID
    this.maxRetryTimes = widget.maxRetryTimes
    this.pingBack = []

    this.privateVar = new PrivateVarManager(widget, this)
    this.publicVar = new PublicVarManager(widget, this)
    this.list = new ListManager(widget, this)

    this.hasList = null
    this.listsInfo = null

    this.init = async () => {
        await this.connect()
        ;(async () => {
            for (;;) {
                try {
                    await this.handleMessage()
                } catch (error) {
                    this.close()
                    const { message } = error
                    if (this.widget.autoReconnect) {
                        console.error(error)
                        this.widget.warn(`连接异常：${message}`)
                        this.widget.warn("即将自动重连")
                        try {
                            await this.connect()
                        } catch (error) {
                            this.widget.error(error)
                            this.widget.emit("onConnectionError", error.message)
                        }
                    } else {
                        this.widget.connection = null
                        error.message = `连接出现错误：${message}`
                        this.widget.error(error)
                        this.widget.emit("onConnectionError", message)
                        break
                    }
                }
            }
        })()
    }

    this.connect = Task(widget, `连接到 ${this.workID}`, () => {
        this.establishWSConnection()
        this.connection.onmessage = (message) => {
            getMessageResolve(message)
        }
        this.connection.onerror = (message) => {
            getMessageReject(new Error(message))
        }
        this.connection.onclose = () => {
            getMessageReject(new Error("连接异常关闭"))
        }
        return new Promise((resolve, reject) => {
            var timeout = setTimeout(() => {
                getMessageReject(new Error("时间超出"))
            }, 60000)
            function listInit() {
                this.listsInfo.forEach(info => {
                    this.list.datas[info.cvid].id = info.id
                })
            }
            function loadListFailed() {
                var error = this.listsInfo
                error.message = `云列表加载失败：${error.message}`
                widget.error(error)
            }
            ;(async () => {
                try {
                    var loading = true
                    while (loading) {
                        await this.handleMessage(() => {
                            clearTimeout(timeout)
                            if (this.hasList) {
                                if (this.listsInfo != null) {
                                    if (this.listsInfo instanceof Error) {
                                        loadListFailed()
                                    } else {
                                        listInit()
                                    }
                                    resolve()
                                }
                            } else {
                                resolve()
                            }
                            loading = false
                        })
                    }
                } catch (error) {
                    clearTimeout(timeout)
                    this.close()
                    reject(error)
                }
            })()
            if (this.hasList != false && this.listsInfo == null) {
                (async () => {
                    try {
                        await Task(widget, "加载云列表", async () => {
                            var info = (await Task(widget, "获取作品数据", async () => {
                                return HTTP.get(api.getWorkInfoUrl(workID))
                            })())

                            var work = (await Task(widget, "获取作品编译文件", async () => {
                                return HTTP.get(api.getBcmcUrl(info))
                            })())
                            this.listsInfo = []
                            Object.values(work.cloud_variables).forEach(info => {
                                if (info.type == "public_list") {
                                    this.listsInfo.push(info)
                                }
                            })
                            if (this.hasList) {
                                listInit()
                                resolve()
                            }
                        }, 0)()
                    } catch (error) {
                        this.listsInfo = error
                        if (this.hasList == true) {
                            loadListFailed()
                        }
                        if (this.hasList != null) {
                            resolve()
                        }
                    }
                })()
            }
        })
    }, widget.maxRetryTimes, true)

    this.establishWSConnection = Task(widget, `建立 ${"Web"}${"Socket"} 连接`, () => {
        var WS = new Function(`return ${"Web"}${"Socket"}`)()
        var a = "socketcv"
        var b = "codemao"
        var c = "cn"
        var port = "9096"
        this.connection = new WS(`wss://${a}.${b}.${c}:${port}/cloudstorage/?session_id=${workID}&authorization_type=${api.authorizationType}&stag=${api.stag}&EIO=3&transport=websocket`)
    })

    this.getMessage = () => {
        return new Promise((resolve, reject) => {
            getMessageResolve = resolve
            getMessageReject = reject
        })
    }

    this.handleMessage = async (resolve) => {
        var message = await this.getMessage()
        var { data } = message
        if (data.startsWith("0")) {
            data = JSON.parse(data.substring(1))
            this.handleFirst(data)
        } else if (data == "1") {
            throw new Error("连接异常断开：远程保活超时")
        } else if (data == "3") {
            this.pingBack.push(Date.now())
        } else if (data == "41") {
            throw new Error("连接异常断开")
        } else if (data == "40") {
            this.join()
        } else if (data.startsWith("42")) {
            data = JSON.parse(data.substring(2))
            message = data[0]
            data = data[1]
            switch (message) {
                case "connect_done":
                    this.handleJoinDone(JSON.parse(data))
                    break
                case "list_variables_done":
                    this.handleListDatasDone(JSON.parse(data), resolve)
                    break
                case "online_users_change":
                    this.onlineUsersNumber = JSON.parse(data).total
                    widget.emit("onOnlineUsersNumberChange")
                    break
                case "update_private_vars_done":
                    if (this.hasList != null) {
                        this.privateVar.onCloudUpdates(JSON.parse(data))
                    }
                    break
                case "update_vars_done":
                    if (this.hasList != null) {
                        this.publicVar.onCloudUpdates(data)
                    }
                    break
                case "update_lists_done":
                    if (this.hasList != null) {
                        this.list.onCloudUpdates(data)
                    }
                    break
            }
        }
    }

    this.handleFirst = (data) => {
        this.pingTimeout = data.pingTimeout
        this.ping = setInterval(() => {
            this.connection.send("2")
            setTimeout(() => {
                if (this.pingBack.length > 0) {
                    this.pingBack.shift()
                } else {
                    getMessageReject(new Error("本地保活超时"))
                }
            }, data.pingTimeout)
        }, data.pingInterval)
    }

    this.join = () => {
        this.connection.send(`42["join","${this.workID}"]`)
    }

    this.handleJoinDone = (data) => {
        switch (data.connect_state) {
            case 1:
                this.listDatas()
                break
            case 2:
                throw new Error("可能因为在线用户数已达上限")
            default:
                throw new Error(data)
        }
    }

    this.listDatas = () => {
        this.connection.send(`42["list_variables",{}]`)
    }

    this.handleListDatasDone = (data, resolve) => {
        if (this.hasList == null) {
            this.hasList = false
            data.forEach(info => {
                switch (info.type) {
                    case PRIVATE_VAR:
                        this.privateVar.add(info)
                        break
                    case PUBLIC_VAR:
                        this.publicVar.add(info)
                        break
                    case LIST:
                        this.hasList = true
                        this.list.add(info)
                        break
                }
                widget.emit("onDataInit", info.name, info.value, info.type, info.cvid)
            })
        } else {
            var publicUpdates = {},
            listUpdates = {}
            data.forEach(info => {
                switch (info.type) {
                    case PUBLIC_VAR:
                        publicUpdates[info.cvid] = [{
                            value: info.value
                        }]
                        break
                    case LIST:
                        listUpdates[info.cvid] = [{
                            action: "replace",
                            nth: "all",
                            value: info.value
                        }]
                        break
                }
            })
            this.privateVar.allCloudDatasUpdatesFailed()
            this.publicVar.allCloudDatasUpdatesFailed()
            this.list.allCloudDatasUpdatesFailed()
            this.publicVar.cloudUpdates(publicUpdates)
            this.list.cloudUpdates(listUpdates)
        }
        if (resolve) resolve()
    }

    this.close = () => {
        clearInterval(this.ping)
        if (this.connection) {
            this.connection.onclose = null
            try {
                this.connection.send("41")
                this.connection.close()
            } catch (error) {}
        }
    }

    return this
}

class DataManager {

    datas = {}
    dataList = []
    lastUploadTime = 0

    isUpdating = false
    localUpdates = []

    toBeUploadeds = null
    uploading = []

    constructor(widget, cloud, intervalTime) {
        this.widget = widget
        this.cloud = cloud
        this.intervalTime = intervalTime
    }

    add = (data) => {
        this.datas[data.cvid] = data
        this.datas[data.name] = data
        this.dataList.push(data)
    }

    getData = (data) => {
        return this.datas[data.name || data.cvid]
    }

    get = (name) => {
        return this.datas[name].value
    }

    updates = (source, updatesData) => {
        Object.keys(updatesData).forEach(key => {
            this.dataUpdates(source, this.datas[key], updatesData[key])
        })
    }

    dataUpdates = (source, data, updatesData) => {
        updatesData.forEach(updateData => {
            this.update(source, data, updateData)
        })
    }

    localUpdate = (updateData, data=this.getData(updateData)) => {
        if (this.isUpdating) {
            this.localUpdates.push(updateData)
        } else if (this.effective(updateData, data)) {
            if (!this.toBeUploadeds) {
                this.toBeUploadeds = {}
                setTimeout(() => {
                    this.lastUploadTime = Date.now()
                    this.cloud.connection.send(`42${JSON.stringify([
                        this.updateMessage,
                        this.getUploadsData()
                    ])}`)
                    this.toBeUploadeds = null
                }, Math.max(0, this.lastUploadTime + this.intervalTime - Date.now()));
            }
            if (!this.toBeUploadeds[data.cvid]) {
                this.toBeUploadeds[data.cvid] = []
            }
            this.toBeUploadeds[data.cvid].push({
                update: this.getSimplifyUpdateData(updateData),
                backup: this.getBackupData(updateData, data)
            })
            if (this.localPreUpdate) {
                this.update(LOCAL, data, updateData)
            }
        }
    }

    withPauseLocalUpdate = (func) => {
        this.isUpdating = true
        func()
        this.isUpdating = false
        var localUpdateData
        while (localUpdateData = this.localUpdates.shift()) {
            this.localUpdate(localUpdateData)
        }
    }

    cloudUpdates = (updatesData) => {
        this.withPauseLocalUpdate(() => {
            var firstUploadingUpdatesData = this.getFirstUploadingUpdatesData()
            if (equal(updatesData, firstUploadingUpdatesData)) {
                this.uploading.shift()
                if (!this.localPreUpdate) {
                    this.updates(LOCAL, updatesData)
                }
            } else {
                if (this.localPreUpdate) {
                    this.undoAll()
                    this.updates(CLOUD, updatesData)
                    this.redoAll()
                } else {
                    this.updates(CLOUD, updatesData)
                }
            }
        })
    }

    cloudDatasUpdatesFailed = () => {
        if (this.localPreUpdate) {
            this.withPauseLocalUpdate(() => {
                this.undo(data, this.uploading.unshift())
            })
        }
    }

    allCloudDatasUpdatesFailed = () => {
        if (this.localPreUpdate) {
            this.withPauseLocalUpdate(() => {
                while (this.uploading.length) {
                    this.undo(data, this.uploading.unshift())
                }
            })
        }
    }

    undoAll = () => {
        for (let i = this.uploading.length - 1; i >= 0; i--) {
            var uploading =  this.uploading[i]
            Object.keys(uploading).forEach(key => {
                this.undo(this.datas[key], uploading[key])
            })
        }
    }

    undo = (data, uploading) => {
        for (let i = uploading.length - 1; i >= 0; i--) {
            this.update(UNDO, data, uploading[i].backup)
        }
    }

    redoAll = () => {
        this.uploading.forEach(uploading => {
            Object.keys(uploading).forEach(key => {
                this.redo(this.datas[key], uploading[key])
            })
        })
    }

    redo = (data, uploading) => {
        uploading.forEach(uploading => {
            uploading.backup = this.getBackupData(uploading.update, data)
            this.update(REDO, data, uploading.update)
        })
    }
}

class VarManager extends DataManager {

    constructor(widget, cloud, intervalTime) {
        super(widget, cloud, intervalTime)
    }

    effective = (updateData, data=this.getData(updateData)) => {
        return data.value != updateData.value
    }

    getSimplifyUpdateData = (updateData) => {
        return {
            value: updateData.value
        }
    }

    getBackupData = (updateData, data=this.getData(updateData)) => {
        return {
            value: data.value
        }
    }

    getFirstUploadingUpdatesData = () => {
        var uploadingUpdatesData = {}
        var uploading = this.uploading[0]
        if (uploading) {
            Object.keys(uploading).forEach(key => {
                var updatesData = []
                uploading[key].forEach(uploadingData => {
                    updatesData.push(uploadingData.update)
                })
                uploadingUpdatesData[key] = updatesData
            })
        }
        return uploadingUpdatesData
    }

    getUploadsData = () => {
        var uploadsData = []
        Object.keys(this.toBeUploadeds).forEach(key => {
            var dataUploadsData = this.toBeUploadeds[key]
            var dataUploadData = this.mergeDataUploadsData(dataUploadsData)
            this.toBeUploadeds[key] = [dataUploadData]
            uploadsData.push(this.getDataUploadData(this.datas[key], dataUploadData))
        })
        this.uploading.push(this.toBeUploadeds)
        return uploadsData
    }

    mergeDataUploadsData = (dataUploadsData) => {
        return {
            update: dataUploadsData.slice(-1)[0].update,
            backup: dataUploadsData[0].backup
        }
    }
}

class PrivateVarManager extends VarManager {

    constructor(widget, cloud) {
        super(widget, cloud, 1500)
        this.localPreUpdate = widget.privateVarLocalPreUpdate
        this.updateMessage = "update_private_vars"
    }

    update = (source, data, updateData) => {
        if (this.effective(updateData, data)) {
            data.value = updateData.value
        }
    }

    getDataUploadData = (data, uploadData) => {
        var value = uploadData.update.value
        return {
            cvid: data.cvid,
            value: value,
            param_type: typeof value
        }
    }

    onCloudUpdates = (data) => {
        if (data.code == 1 && data.msg == "ok") {
            var firstUploading = this.uploading[0]
            if (!this.localPreUpdate) {
                Object.keys(firstUploading).forEach(key => {
                    this.update(LOCAL, this.datas[key], firstUploading[key].update)
                })
            }
            this.uploading.shift()
        } else {
            this.cloudDatasUpdatesFailed()
            this.widget.error(new Error(`私有云变量更新失败：${JSON.stringify(data)}`))
        }
    }
}

class PublicVarManager extends VarManager  {

    constructor(widget, cloud) {
        super(widget, cloud, 0)
        this.localPreUpdate = widget.publicVarLocalPreUpdate
        this.updateMessage = "update_vars"
    }

    update = (source, data, updateData) => {
        if (this.effective(updateData, data)) {
            var originalValue = data.value
            data.value = updateData.value
            widget.emit("onPublicVarChange", source, data.name, originalValue, data.value)
        }
    }

    getDataUploadData = (data, uploadData) => {
        var value = uploadData.update.value
        return {
            cvid: data.cvid,
            value: value,
            param_type: typeof value,
            action: "set"
        }
    }

    onCloudUpdates = (updatesData) => {
        if (updatesData == "fail") {
            this.cloudDatasUpdatesFailed()
            this.widget.error(new Error(`公有云变量更新失败：${JSON.stringify(data)}`))
        } else {
            var cloudUpdatesData = {}
            updatesData.forEach(updateData => {
                if (!cloudUpdatesData[updateData.cvid]) {
                    cloudUpdatesData[updateData.cvid] = []
                }
                cloudUpdatesData[updateData.cvid].push(this.getSimplifyUpdateData(updateData))
            })
            this.cloudUpdates(cloudUpdatesData)
        }
    }
}

class ListManager extends DataManager {

    constructor(widget, cloud) {
        super(widget, cloud, 0)
        this.localPreUpdate = widget.listLocalPreUpdate
        this.updateMessage = "update_lists"
    }

    effective = (updateData, data=this.getData(updateData)) => {
        return !("nth" in updateData && typeof updateData.nth == "number" && updateData.nth <= 0)
    }

    update = (source, data, updateData) => {
        if (this.effective(updateData, data)) {
            switch (updateData.action) {
                case "append":
                    data.value.push(updateData.value)
                    widget.emit("onListAdd", source, data.name, 1, updateData.value)
                    break
                case "unshift":
                    data.value.unshift(updateData.value)
                    widget.emit("onListAdd", source, data.name, data.value.length, updateData.value)
                    break
                case "insert":
                    data.value.splice(updateData.nth - 1, 0, updateData.value)
                    widget.emit("onListAdd", source, data.name, updateData.nth, updateData.value)
                    break
                case "delete":
                    switch (updateData.nth) {
                        case "last":
                            var originalValue = data.value.slice(-1)[0]
                            data.value.splice(-1, 1)
                            widget.emit("onListDelete", source, data.name, data.value.length, originalValue)
                            break
                        case "all":
                            var originalList = data.value
                            data.value = []
                            widget.emit("onListDeleteAll", source, data.name, originalList.slice())
                            break
                        default:
                            var originalValue = data.value[updateData.nth - 1]
                            data.value.splice(updateData.nth - 1, 1)
                            widget.emit("onListDelete", source, data.name, updateData.nth, originalValue)
                            break
                    }
                    break
                case "replace":
                    switch (updateData.nth) {
                        case "last":
                            var originalValue = data.value.slice(-1)[0]
                            data.value.splice(-1, 1, updateData.value)
                            widget.emit("onListReplace", source, data.name, data.value.length, originalValue, updateData.value)
                            break
                        case "all":
                            var originalList = data.value
                            data.value = updateData.value
                            widget.emit("onListReplaceAll", source, data.name, originalList.slice(), data.value.slice())
                            break
                        default:
                            var originalValue = data.value.slice(updateData.nth - 1)[0]
                            data.value.splice(updateData.nth - 1, 1, updateData.value)
                            widget.emit("onListReplace", source, data.name, updateData.nth, originalValue, updateData.value)
                            break
                    }
                    break
            }
        }
    }

    getSimplifyUpdateData = (updateData) => {
        var simplifyUpdateData = {}
        simplifyUpdateData.action = updateData.action
        if ("value" in updateData && updateData.value != null) {
            simplifyUpdateData.value = updateData.value
        }
        if ("nth" in updateData && updateData.nth != null) {
            simplifyUpdateData.nth = updateData.nth
        }
        return simplifyUpdateData
    }

    getBackupData = (updateData, data=this.getData(updateData)) => {
        switch (updateData.action) {
            case "append":
                return {
                    action: "delete",
                    nth: "last"
                }
            case "unshift":
                return {
                    action: "delete",
                    nth: 1
                }
            case "insert":
                return {
                    action: "delete",
                    nth: updateData.nth
                }
            case "delete":
                switch (updateData.nth) {
                    case "last":
                        return {
                            action: "append",
                            value: data.value.slice(-1)[0]
                        }
                    case "all":
                        return {
                            action: "replace",
                            nth: "all",
                            value: data.value.slice()
                        }
                    default:
                        return {
                            action: "insert",
                            nth: updateData.nth,
                            value: data.value[updateData.nth - 1]
                        }
                }
            case "replace":
                switch (updateData.nth) {
                    case "last":
                        return {
                            action: "replace",
                            nth: "last",
                            value: data.value.slice(-1)[0]
                        }
                    case "all":
                        return {
                            action: "replace",
                            nth: "all",
                            value: data.value.slice()
                        }
                    default:
                        return {
                            action: "replace",
                            nth: updateData.nth,
                            value: data.value[updateData.nth - 1]
                        }
                }
        }
    }

    getFirstUploadingUpdatesData = () => {
        var uploadingUpdatesData = {}
        var uploading = this.uploading[0]
        if (uploading) {
            Object.keys(uploading).forEach(key => {
                uploadingUpdatesData[key] = []
                uploading[key].forEach(uploadData => {
                    uploadingUpdatesData[key].push(uploadData.update)
                })
            })
        }
        return uploadingUpdatesData
    }

    getUploadsData = () => {
        var uploadsData = {}
        Object.keys(this.toBeUploadeds).forEach(key => {
            uploadsData[key] = []
            this.toBeUploadeds[key].forEach(uploadData => {
                uploadsData[key].push(uploadData.update)
                var upload = {}
                upload[key] = [uploadData]
                this.uploading.push(upload)
            })
        })
        return uploadsData
    }

    onCloudUpdates = (updatesData) => {
        Object.values(updatesData).forEach(dataUpdatesData => {
            for (var i = 0; i < dataUpdatesData.length; i++) {
                dataUpdatesData[i] = this.getSimplifyUpdateData(dataUpdatesData[i])
            }
        })
        this.cloudUpdates(updatesData)
    }
}

async function User(widget) {
    try {
        return await Task(widget, "加载用户信息", async () => {
            return await HTTP.get("https://api.codemao.cn/tiger/v3/web/accounts/profile", true)
        }, 0)()
    } catch (error) {
        widget.error(error)
        return {
            "id": 0,
            "nickname": "未登录用户",
            "avatar_url": "https://static.codemao.cn/coco/player/unstable/B1F3qc2Hj.image/svg+xml?hash=FlHXde3J3HLj1PtOWGgeN9fhcba3",
            "sex": MALE,
            "qq": "0",
            "description": error.message,
            "birthday": 0
        }
    }
}

class Widget extends InvisibleWidget {

    constructor(props) {
        super(props)
        this.autoReconnect = props.autoReconnect
        this.maxRetryTimes = props.maxRetryTimes
        this.privateVarLocalPreUpdate = props.privateVarLocalPreUpdate
        this.publicVarLocalPreUpdate = props.publicVarLocalPreUpdate
        this.listLocalPreUpdate = props.listLocalPreUpdate
    }

    log = (message) => {
        this.widgetLog(message)
    }
    warn = (message) => {
        this.widgetWarn(message)
    }
    error = (error) => {
        console.error(error)
        this.widgetError(error.message)
    }

    connect = async (workType, workID) => {
        if (this.connection) {
            this.widgetWarn("上一个连接未断开")
            this.disconnect()
        }
        this.connection = KittenCloud(this, Number(workType), workID)
        await this.connection.init()
        this.log(`成功 连接到 ${workID}`)
    }

    connectedWorkID = () => {
        if (this.connection) {
            return this.connection.workID
        } else {
            return 0
        }
    }

    disconnect = () => {
        if (this.connection) {
            this.connection.close()
            this.log(`已断开与 ${this.connection.workID} 的连接`)
            this.connection = null
        } else {
            this.error(new Error("当前未连接作品"))
        }
    }

    able = (dateType, operation) => {
        if (this.connection == null) {
            return false
        }
        if (dateType == VAR || operation == READ) {
            return this.connection.hasList != null
        }
        return listsInfo != null && !(listsInfo instanceof Error)
    }

    dataType = (type) => {
        return Number(type)
    }
    sourceType = (type) => {
        return Number(type)
    }
    sexType = (type) => {
        return Number(type)
    }

    getVarManager = (name) => {
        if (!this.connection) {
            throw new Error("未连接到云")
        }
        if (name in this.connection.privateVar.datas) {
            return this.connection.privateVar
        } else if (name in this.connection.publicVar.datas) {
            return this.connection.publicVar
        } else if (name in this.connection.list.datas) {
            throw new Error(`不存在云变量“${name}”，存在“${name}”是云列表而非云变量，不能对其进行云变量操作`)
        } else {
            throw new Error(`不存在云变量“${name}”`)
        }
    }

    get = (name) => {
        try {
            return this.getVarManager(name).get(name)
        } catch (error) {
            error.message = `无法获取云变量“${name}”的值：${error.message}`
            this.error(error)
            return error.message
        }
    }

    set = (name, value) => {
        try {
            var data = {
                name: name,
                value: this.value(value)
            }
            this.getVarManager(name).localUpdate(data)
        } catch (error) {
            error.message = `无法设置云变量“${name}”的值：${error.message}`
            this.error(error)
        }
    }

    getListManager = (name) => {
        if (!this.connection) {
            throw new Error("未连接到云")
        }
        if (name in this.connection.list.datas) {
            return this.connection.list
        } else if (name in this.connection.privateVar.datas || name in this.connection.publicVar.datas) {
            throw new Error(`不存在云列表“${name}”，存在“${name}”是变量而非云列表，不能对其进行云列表操作`)
        } else {
            throw new Error(`不存在云列表“${name}”`)
        }
    }

    getList = (name) => {
        try {
            var manager = this.getListManager(name)
            return manager.get(name).slice()
        } catch (error) {
            error.message = `无法读取“${name}”：${error.message}`
            this.error(error)
            return []
        }
    }

    append = (value, name, position) => {
        try {
            var manager = this.getListManager(name)
            var data = {
                name: name,
                action: ["append", "unshift"][position],
                value: this.value(value)
            }
            manager.localUpdate(data)
        } catch (error) {
            error.message = `无法更新云列表“${name}”：${error.message}`
            this.error(error)
        }
    }

    add = (value, name, indexingMode, index) => {
        try {
            var manager = this.getListManager(name)
            index = this.index(manager.get(name), index, indexingMode)
            var data = {
                name: name,
                action: "insert",
                nth: index,
                value: value
            }
            manager.localUpdate(data)
        } catch (error) {
            error.message = `无法更新云列表“${name}”：${error.message}`
            this.error(error)
        }
    }

    delete = (name, indexingMode, index) => {
        try {
            var manager = this.getListManager(name)
            if (indexingMode == 1 && index == -1) {
                index = "last"
            } else {
                index = this.index(manager.get(name), index, indexingMode)
            }
            var data = {
                name: name,
                action: "delete",
                nth: index
            }
            manager.localUpdate(data)
        } catch (error) {
            error.message = `无法更新云列表“${name}”：${error.message}`
            this.error(error)
        }
    }

    deleteAll = (name) => {
        try {
            var manager = this.getListManager(name)
            var data = {
                name: name,
                action: "delete",
                nth: "all"
            }
            manager.localUpdate(data)
        } catch (error) {
            error.message = `无法更新云列表“${name}”：${error.message}`
            this.error(error)
        }
    }

    replace = (name, indexingMode, index, value) => {
        try {
            var manager = this.getListManager(name)
            if (indexingMode == 1 && index == -1) {
                index = "last"
            } else {
                index = this.index(manager.get(name), index, indexingMode)
            }
            var data = {
                name: name,
                action: "replace",
                nth: index,
                value: value
            }
            manager.localUpdate(data)
        } catch (error) {
            error.message = `无法更新云列表“${name}”：${error.message}`
            this.error(error)
        }
    }

    replaceAll = (list1, list2) => {
        try {
            var manager
            if (!Array.isArray(list1)) {
                manager = this.getListManager(list1)
                list1 = manager.get(list1)
            }
            manager = this.getListManager(list2)
            manager.localUpdate({
                name: list2,
                action: "delete",
                nth: "all"
            })
            list1.forEach(item => {
                manager.localUpdate({
                    name: list2,
                    action: "append",
                    value: this.value(item)
                })
            })
        } catch (error) {
            error.message = `无法更新云列表“${list2}”：${error.message}`
            this.error(error)
        }
    }

    listGet = (name, indexingMode, index) => {
        try {
            var manager = this.getListManager(name)
            index = this.index(manager.get(name), index, indexingMode)
            return manager.get(name)[index] || 0
        } catch (error) {
            error.message = `无法读取“${name}”：${error.message}`
            this.error(error)
            return 0
        }
    }

    listLength = (name) => {
        try {
            var manager = this.getListManager(name)
            return manager.get(name).length
        } catch (error) {
            error.message = `无法读取“${name}”：${error.message}`
            this.error(error)
            return 0
        }
    }

    listFind = (name, countingMode, count, value) => {
        try {
            var manager = this.getListManager(name)
            var list = manager.get(name)
            var counting = 0
            if (countingMode == 0) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i] == value) {
                        if (++counting == count) {
                            return i + 1
                        }
                    }
                }
            } else {
                for (var i = list.length - 1; i >= 0; i--) {
                    if (list[i] == value) {
                        if (++counting == count) {
                            return i + 1
                        }
                    }
                }
            }
            return 0
        } catch (error) {
            error.message = `无法读取“${name}”：${error.message}`
            this.error(error)
            return 0
        }
    }

    listContain = (name, value) => {
        try {
            var manager = this.getListManager(name)
            return manager.get(name).includes(value)
        } catch (error) {
            error.message = `无法读取“${name}”：${error.message}`
            this.error(error)
            return 0
        }
    }

    isUserLogined = async () => {
        return await this.userInfo("id") != 0
    }

    userInfo = async (type) => {
        if (!this.user) this.user = await User(this)
        return this.user[type]
    }

    onlineUsersNumber = () => {
        if (!this.connection) {
            this.widgetError("未连接到云")
            return 0
        }
        return this.connection.onlineUsersNumber
    }

    value = (value) => {
        var numberValue = Number(value)
        if (!isNaN(numberValue)) return numberValue
        if (value.length > 1024) {
            value = value.substring(0, 1024)
            this.widgetWarn("字符串长度超出限制（1024 字符），已舍弃超出部分")
        }
        return value
    }

    index = (list, index, indexingMode) => {
        if (indexingMode == 0) {
            return index
        } else {
            return list.length - index + 1
        }
    }
}

exports.types = types;
exports.widget = Widget;
